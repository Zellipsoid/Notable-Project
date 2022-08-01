
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './schema/User';
import Physician from './schema/Physician';
import dotenv from 'dotenv';
import { DatabaseUserInterface } from './Interfaces/UserInterface';
import { DatabasePhysicianInterface } from './Interfaces/PhysicianInterface';
import { DatabaseAppointmentInterface } from './Interfaces/AppointmentInterface';
import Appointment from './schema/Appointment';


// TODO: I would like to split this file up

const localStrategy = passportLocal.Strategy;
dotenv.config();

mongoose.connect(`${process.env.DBSTRING}`, {}, (err: Error) => {
    if (err) throw err;
    console.log("Connected to MongoDB")
});

const app = express();
const path = require("path");
const buildPath = path.normalize(path.join(__dirname, '../../client/build'));
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
    session({
        secret: process.env.SESSIONSECRET!,
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport
passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id }, (err: Error, user: DatabaseUserInterface) => {
        const userInformation = {
            username: user.username,
            isAdmin: user.isAdmin,
            id: user._id
        };
        cb(err, userInformation)
    });
});

// Passport uses cookie/session-based auth. It adds req.user server-side once the cookie is verified, so req.user is not actually coming from the client
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { user }: any = req;
    if (user) {
        User.findOne({ username: user.name }, (err: Error, doc: DatabaseUserInterface) => {
            if (err) res.status(500).send("Error");
            if (doc?.isAdmin) {
                next()
            } else {
                res.status(403).send("User is not an admin");
            }
        })
    } else {
        res.status(401).send("No user logged in");
    }
}

// Passport uses cookie/session-based auth. It adds req.user server-side once the cookie is verified, so req.user is not actually coming from the client
const userIsLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send("No user logged in");
    }
}

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
})

app.post('/register', async (req: Request, res: Response) => {

    const { username, password } = req?.body;

    // TODO: add some more validation
    if (!username || !password || typeof username !== "string" || typeof password != "string") {
        res.status(401).send("Invalid username or password")
        return;
    }

    User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
        if (err) res.status(500).send("Error");
        if (doc) res.status(409).send("User already exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(200).send("success");
        }
    });
});

app.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
    res.status(200).send("success");
});

// The user in req comes from the cookie sent after login by Passport. According to the internet, this should be secure enough.
app.get("/user", (req: Request, res: Response) => {
    if (req?.user) {
        res.status(200).send(req.user);
    } else {
        res.status(200).send("User is not logged in, but that is okay");
    }
})

app.get("/logout", (req: Request, res: Response) => {
    req.logout((err: Error) => {
        if (err) res.status(500).send("Failed to logout");
        else res.status(200).send("success");
    });
})

app.get("/physicians", userIsLoggedInMiddleware, (req: Request, res: Response) => {
    // TODO: paginatation
    Physician.find({}, (err: Error, physicians: DatabasePhysicianInterface[]) => {
        if (err) res.status(500).send("Error");
        else {
            res.send(physicians);
        }
    })
})

app.get("/appointments/:physicianId", userIsLoggedInMiddleware, (req: Request, res: Response) => {
    // TODO: pagination
    Appointment.find({ physicianId: req.params.physicianId }, (err: Error, appointments: DatabaseAppointmentInterface[]) => {
        if (err) res.status(500).send("Error");
        else {
            res.json(appointments);
        }
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server started");
});