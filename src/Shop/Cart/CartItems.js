import { useCartContext } from "./CartContext";
import { CartItemDetail } from "./CartItemDetail";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../Auth/AuthContext";
import { useHistory } from "react-router-dom";

export function CartItems() {
  const { token } = useAuthContext();
  const { cartItems, getItemsQuantity, addItemToOrder } = useCartContext();
  let history = useHistory();

  function getPrice() {
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue.quantity * currentValue.product.price;
    return cartItems.reduce(reducer, 0);
  }

  async function handleOrder() {
    const orderItems = cartItems.map((cartItem) => cartItem.id);
    const values = {
      cartItems: orderItems,
      price: getPrice(),
    };
    const res = await fetch("http://127.0.0.1:8000/api/shop/orders/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const response = await res
      .json()
      .then(orderItems.map((orderItem) => addItemToOrder(orderItem)));
    console.log(response);
    history.push("/orders");
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            paddingBottom: 3,
            marginTop: 5,
            marginBottom: 5,
            borderBottom: 1,
          }}
        >
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item xs={11} container justifyContent="flex-start">
              <Typography variant="h3" component="div">
                Shopping Cart
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" component="div">
                {getItemsQuantity()} Items
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <div>
          {cartItems.map((cartItem, index) => (
            <CartItemDetail key={cartItem.id} index={index} {...cartItem} />
          ))}
        </div>
        <Box
          sx={{
            paddingTop: 3,
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 5,
            marginBottom: 5,
            borderTop: 1,
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={8} container justifyContent="flex-start">
              <Typography variant="h5" component="div">
                Total Price
              </Typography>
            </Grid>
            <Grid item xs={2} container justifyContent="center">
              <Typography variant="h6" component="div">
                {getPrice()} lei
              </Typography>
            </Grid>
            <Grid item xs={2} container justifyContent="center">
              <Button
                variant="contained"
                size="medium"
                color="success"
                onClick={handleOrder}
              >
                Buy
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
