import React, { useState } from 'react'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';
import UsernamePasswordForm from '../UsernamePasswordForm';

const PhysicianSelection = (props: { physicians: Array<PhysicianInterface>, selectPhysician: (physician: PhysicianInterface) => any }) => {


  return (
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
        props.physicians.map((physician: PhysicianInterface) => {
          return (
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ minWidth: 275, m: 1 }} onClick={() => props.selectPhysician(physician)}>
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
  )
}

export default PhysicianSelection;