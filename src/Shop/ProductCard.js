import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import photo from './image.jpg'


export function ProductCard({ name , description , price}) {
  return (
    <Grid item xs={4}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={photo}
          alt="panda"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center" marginTop="20px">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{margin:"10px 20px",justifyContent:"center"}}>
        <Button variant="contained" color="success">
          Add
        </Button>
      </CardActions>
    </Card>
    </Grid>
  );
}