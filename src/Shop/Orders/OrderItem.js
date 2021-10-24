import { Grid, Paper, Typography } from "@mui/material";
import { OrderCartItem } from "./OrderCartItem";

export function OrderItem({ cartItems, price }) {
  return (
    <>
      <Paper elevation={3} sx={{ mb: 10 }}>
        <Grid container alignItems="center" sx={{ ml: 3, mb: 2, pb: 3 }}>
          <Grid item xs={1} container justifyContent="flex-start">
            <Typography variant="h6" component="div">
              Image
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Typography variant="h6" component="div">
              Name
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Typography variant="h6" component="div">
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="center">
            <Typography variant="h6" component="div">
              Price
            </Typography>
          </Grid>
        </Grid>
        {cartItems.map((cartItem) => (
          <OrderCartItem key={cartItem.id} {...cartItem} />
        ))}
        <Grid container alignItems="center" sx={{ mt: 3, ml: 3, pt: 3, pb: 3 }}>
          <Grid item xs={9} container justifyContent="flex-start">
            <Typography variant="h5" component="div">
              Total Price:
            </Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="center">
            <Typography variant="h6" component="div">
              {price} lei
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
