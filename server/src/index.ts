
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './schema/User';
import dotenv from 'dotenv';
import { DatabaseUserInterface, UserInterface } from './Interfaces/UserInterface';
import { AppointmentInterface } from './Interfaces/AppointmentInterface';
import e from 'express';


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

// TODO: is this safe? Right now, Passport uses cookie/session-based auth. Would JWT be better?
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { user }: any = req;
    if (user) {
        User.findOne({ username: user.name }, (err: Error, doc: DatabaseUserInterface) => {
            if (err) throw err;
            if (doc?.isAdmin) {
                next()
            } else {
                res.status(403).send("Sorry, you are not an admin");
            }
        })
    } else {
        res.status(401).send("Sorry, you are not logged in");
    }
}

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
})

app.post('/register', async (req: Request, res: Response) => {

    const { username, password } = req?.body;

    if (!username || !password || typeof username !== "string" || typeof password != "string") {
        res.status(401).send("Invalid username or password")
        return;
    }

    User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
        if (err) throw err;
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

app.get("/physicians", (req: Request, res: Response) => {
    // TODO: make a physician interface
    res.json([
        {
            id: 1,
            firstName: "Donald",
            lastName: "Duck",
            email: "dd@email.com"
        },
        {
            id: 2,
            firstName: "Silly",
            lastName: "Goose",
            email: "sg@email.com"
        },
        {
            id: 3,
            firstName: "Salty",
            lastName: "Seagull",
            email: "ss@email.com"
        }
    ])
})

app.get("/appointments/:physicianId", (req: Request, res: Response) => {

    const appointments: Array<AppointmentInterface> = [
        {
            id: 1,
            firstName: "Larry",
            lastName: "Lobster",
            datetime: new Date("2022-12-16"),
            kind: "New Patient",
            physicianId: 1
        },
        {
            id: 2,
            firstName: "Turtle",
            lastName: "Todd",
            datetime: new Date("2022-12-17"),
            kind: "Follow-up",
            physicianId: 1
        },
        {
            id: 3,
            firstName: "Cat",
            lastName: "Nip",
            datetime: new Date("2022-12-18"),
            kind: "New Patient",
            physicianId: 2
        },
        {
            id: 4,
            firstName: "Roxy",
            lastName: "Raccoon",
            datetime: new Date("2022-12-19"),
            kind: "Follow-up",
            physicianId: 2
        }, {
            id: 5,
            firstName: "Samson",
            lastName: "Squirrel",
            datetime: new Date("2022-12-20"),
            kind: "New Patient",
            physicianId: 3
        },
        {
            id: 6,
            firstName: "Jen",
            lastName: "Jellyfish",
            datetime: new Date("2023-12-21"),
            kind: "Follow-up",
            physicianId: 3
        },
        {
            id: 7,
            firstName: "Samantha",
            lastName: "Sandshrew",
            datetime: new Date("2022-12-24"),
            kind: "New Patient",
            physicianId: 3
        }
    ];

    let filteredAppointments = appointments.filter((appointment) => {
        return appointment.physicianId === parseInt(req.params.physicianId)
    });

    res.json(filteredAppointments);
})


app.listen(4000, () => {
    console.log("Server started");
});