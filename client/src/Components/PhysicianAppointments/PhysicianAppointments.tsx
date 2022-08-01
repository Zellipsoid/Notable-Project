import { Grid } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AppointmentInterface } from '../../Interfaces/AppointmentInterface';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';
import AppointmentTable from './AppointmentTable';
import PhysicianCard from './PhysicianCard';
import PhysicianSelection from './PhysicianSelection';

const PhysicianAppointments = () => {

  const [physicians, setPhysicians] = useState<Array<PhysicianInterface>>([]);
  const [appointments, setAppointments] = useState<Array<AppointmentInterface>>([]);

  const [selectedPhysician, setSelectedPhysician] = useState<PhysicianInterface>();

  let selectPhysician = (physician: PhysicianInterface) => {
    setSelectedPhysician(physician);
    axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/appointments/${physician._id}`, {
      withCredentials: true
    }).then(res => {
      setAppointments(res.data);
    })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/physicians`, {
      withCredentials: true
    }).then(res => {
      setPhysicians(res.data);
    })
  }, []);


  return (

    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
        <PhysicianSelection physicians={physicians} selectPhysician={selectPhysician} selectedPhysicianId={selectedPhysician?._id} />
      </Grid>
      <Grid item xs={8}>
        {
          selectedPhysician ?
            (
              <>
                <PhysicianCard selectedPhysician={selectedPhysician} />
                <AppointmentTable appointments={appointments} />
              </>
            ) : <></>
        }
      </Grid>
    </Grid >
  )
}

export default PhysicianAppointments