import { Card, Grid, CardContent, Typography, ListItemText, ListSubheader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AppointmentInterface } from '../Interfaces/AppointmentInterface';
import { PhysicianInterface } from '../Interfaces/PhysicianInterface';


const Home = () => {

  const [physicians, setPhysicians] = useState<Array<PhysicianInterface>>([]);
  const [appointments, setAppointments] = useState<Array<AppointmentInterface>>([]);

  const [selectedPhysician, setSelectedPhysician] = useState<PhysicianInterface>();

  let selectPhysician = (physician: PhysicianInterface) => {
    setSelectedPhysician(physician);
    axios.get(`http://localhost:4000/appointments/${physician.id}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data);
      setAppointments(res.data);
    })
  }

  useEffect(() => {
    // TODO: Move the server URL into an env file
    axios.get("http://localhost:4000/physicians", {
      withCredentials: true
    }).then(res => {
      setPhysicians(res.data);
    })
  }, [])




  return (

    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item xs={4}>
        {/* // TODO: put this in its own file if time allows */}
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ m: 2 }}
        >
          {

            physicians.map((physician: PhysicianInterface) => {
              return (
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ minWidth: 275, m: 1 }} onClick={() => selectPhysician(physician)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {`${physician.lastName}, ${physician.firstName}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid >
      </Grid>
      <Grid item xs={8}>
        {/* TODO: also put this into its own file if time allows */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Kind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row: AppointmentInterface) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${row.firstName} ${row.lastName}`}
                  </TableCell>
                  {/* TODO: use better date format */}
                  <TableCell align="right">{row.Time.toString()}</TableCell>
                  <TableCell align="right">{row.Kind}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Home