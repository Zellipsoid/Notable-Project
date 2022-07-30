import React, { useState } from 'react'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';
import UsernamePasswordForm from '../UsernamePasswordForm';
import { DataGrid } from '@mui/x-data-grid';
import { AppointmentInterface, ReadableAppointmentInterface } from '../../Interfaces/AppointmentInterface';

interface AppointmentTableProps {
  appointments: Array<AppointmentInterface>
};

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments = [] }) => {

  let tableColumns = [
    { field: 'firstName', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: '', width: 130 },
    { field: 'time', headerName: 'Date', width: 260 },
    { field: 'kind', headerName: 'Kind', width: 130 },

  ]

  let formattedAppointments: Array<ReadableAppointmentInterface> = appointments.map(appointment => {
    const date = new Date(appointment.time);
    return { ...appointment, time: `${new Date(date).toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` }
  });


  // TODO: fix sorting by date
  return (
    <>
      {
        appointments ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            sx={{ m: 5 }}
            rows={formattedAppointments}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div> : <></>
      }
    </>
  )
}

export default AppointmentTable;