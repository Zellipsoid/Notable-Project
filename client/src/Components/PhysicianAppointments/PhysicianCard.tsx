import { Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';

const PhysicianCard = (props: { selectedPhysician?: PhysicianInterface }) => {
  return (
    <>
    {props.selectedPhysician ? <Card sx={{ m: 5 }} >
      <CardContent>
        <Typography variant="h5" component="div">
          {`Dr. ${props.selectedPhysician.firstName} ${props.selectedPhysician.lastName}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.selectedPhysician.email}
        </Typography>
      </CardContent>
    </Card > : <></>}
    </>
  )
}

export default PhysicianCard;