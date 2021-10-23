import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../Auth/AuthContext';


export function ProductCard({ id , name , description , price , productImage}) {

const values={
  product:id,
  quantity:1,
}

const { token } = useAuthContext();

 async function handleCart(){
    const res = await fetch("http://127.0.0.1:8000/api/marketplace/items/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    const response=await res.json();
    console.log(response);
  }

  return (
    <Grid item xs={4}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={productImage}
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
            {price}lei
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{margin:"10px 20px",justifyContent:"center"}}>
        <Button variant="contained" color="success" onClick={handleCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
    </Grid>
  );
}