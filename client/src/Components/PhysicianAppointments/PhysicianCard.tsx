import { Card, CardContent, Typography } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';

interface PhysicianCardProps {
  selectedPhysician?: PhysicianInterface
}

const PhysicianCard: React.FC<PhysicianCardProps> = ({ selectedPhysician }) => {
  return (
    <>
      {selectedPhysician ? <Card sx={{ m: 5 }} >
        <CardContent>
          <Typography variant="h5" component="div">
            {`Dr. ${selectedPhysician?.firstName} ${selectedPhysician?.lastName}`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {selectedPhysician?.email}
          </Typography>
        </CardContent>
      </Card > : <></>}
    </>
  )
}

export default PhysicianCard;