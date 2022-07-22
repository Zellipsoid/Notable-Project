import { Card, Grid, CardContent, Typography, ListItemText, ListSubheader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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

  let tableColumns = [
    { field: 'firstName', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: '', width: 130 },
    { field: 'time', headerName: 'Date', width: 260 },
    { field: 'kind', headerName: 'Kind', width: 130 },

  ]


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
          sx={{ m: 5 }}
        >
          <Grid item>
            <Typography variant="h4" gutterBottom component="div">
              Physicians
            </Typography>
          </Grid>

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
        {selectedPhysician ? <Card sx={{ m: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {`Dr. ${selectedPhysician.firstName}, ${selectedPhysician.lastName}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {selectedPhysician.email}
            </Typography>

          </CardContent>
        </Card> : <></>}

        {/* TODO: also put this into its own file if time allows */}
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            sx={{ m: 5 }}
            rows={appointments}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Grid >
  )
}

export default Home