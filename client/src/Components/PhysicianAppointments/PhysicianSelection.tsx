import { Grid, Card, CardContent, Typography, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { PhysicianInterface } from '../../Interfaces/PhysicianInterface';

interface PhysicianSelectionProps {
  selectPhysician: (physician: PhysicianInterface) => any;
  selectedPhysicianId?: string;
  physicians: Array<PhysicianInterface>;
}

const PhysicianSelection: React.FC<PhysicianSelectionProps> = ({ selectPhysician = (physician: PhysicianInterface) => { }, selectedPhysicianId = "", physicians = [] }) => {

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

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
          <Divider component="li" />
          {
            physicians.map((physician: PhysicianInterface) => {
              return (
                <>
                  <ListItemButton
                    selected={selectedPhysicianId === physician._id}
                    onClick={(event) => selectPhysician(physician)}
                  >
                    <ListItemText primary={`${physician.lastName}, ${physician.firstName}`} />
                  </ListItemButton>
                  <Divider component="li" />
                </>
              );
            })
          }
        </List>
      </Box>
    </Grid >
  )
}

export default PhysicianSelection;