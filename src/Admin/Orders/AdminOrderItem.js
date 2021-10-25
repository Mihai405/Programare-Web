import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useAuthContext } from "../../Auth/AuthContext";
import { AdminOrderCartItem } from "./AdminOrderCartItem";

export function AdminOrderItem({ index, id , cartItems, price ,placedDate,user,orders,updateOrdersFromChild}) {

  const { token } = useAuthContext();

  async function deleteProduct(){
    const res = await fetch(`http://127.0.0.1:8000/api/shop/orders/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(cartItems.map(cartItem => {
      fetch(`http://127.0.0.1:8000/api/shop/items/${cartItem.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    }));
    orders.splice(index, 1);
    const newOrders = [...orders];
    updateOrdersFromChild(newOrders);
  }

  return (
    <>
      <Paper elevation={3} sx={{ mb: 10 }}>
        <Grid container alignItems="center" sx={{ ml: 3, mb: 2, pb: 3 }}>
          <Grid item xs={6} container justifyContent="flex-start">
            <Typography variant="h6" component="div">
              Placed Date : {placedDate}
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="center">
            <Typography variant="h6" component="div">
              User email : {user.email}
            </Typography>
          </Grid>
        </Grid>
        {cartItems.map((cartItem) => (
          <AdminOrderCartItem key={cartItem.id} {...cartItem} />
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
        <Grid container sx={{ ml: 3, mb: 2, pb: 3 }}>
          <Button variant="contained" size="large" color="error" onClick={deleteProduct}>
            Delete Order
          </Button>
        </Grid>
      </Paper>
    </>
  );
}

