import React, { useState } from 'react'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';
import UsernamePasswordForm from '../UsernamePasswordForm';
import { DataGrid, GridComparatorFn, gridDateTimeFormatter } from '@mui/x-data-grid';
import { AppointmentInterface, ReadableAppointmentInterface } from '../../Interfaces/AppointmentInterface';

interface AppointmentTableProps {
  appointments: Array<AppointmentInterface>
};

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments = [] }) => {

  const dateComparator: GridComparatorFn<Date> = (date1, date2) =>
    new Date(date1).getTime() - new Date(date2).getTime();

  let tableColumns = [
    { field: 'name', headerName: 'Name', width: 260 },
    { field: 'readableDatetime', headerName: 'Date', width: 260, sortComparator: dateComparator },
    { field: 'kind', headerName: 'Kind', width: 130 },

  ]

  let formattedAppointments: Array<ReadableAppointmentInterface> = appointments.map(appointment => {
    const date = new Date(appointment.datetime);
    return {
      ...appointment,
      readableDatetime: `${new Date(date).toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`,
      name: `${appointment.lastName}, ${appointment.firstName}`
    }
  });

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