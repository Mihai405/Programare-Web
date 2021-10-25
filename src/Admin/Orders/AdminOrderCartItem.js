import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

export function AdminOrderCartItem({product , quantity}){
    return(
        <Grid container alignItems="center" sx={{ml:3,mb:2}}>
        <Grid item xs={1} container justifyContent="flex-start">
          <Img src={product.productImage} alt={product.name} />
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Typography variant="h6" component="div">
            {quantity}
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="center">
          <Typography variant="h6" component="div">
            {product.price*quantity} lei
          </Typography>
        </Grid>
      </Grid>
    );
}
