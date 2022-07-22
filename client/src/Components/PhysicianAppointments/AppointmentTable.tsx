import React, { useState } from 'react'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';
import UsernamePasswordForm from '../UsernamePasswordForm';
import { DataGrid } from '@mui/x-data-grid';
import { AppointmentInterface } from '../../Interfaces/AppointmentInterface';

const AppointmentTable = (props: { appointments?: Array<AppointmentInterface> }) => {

  //TODO: iterate through this and make the date format human-readable
  let tableColumns = [
    { field: 'firstName', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: '', width: 130 },
    { field: 'time', headerName: 'Date', width: 260 },
    { field: 'kind', headerName: 'Kind', width: 130 },

  ]

  return (
    <>
      {
        props.appointments ? <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            sx={{ m: 5 }}
            rows={props.appointments}
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