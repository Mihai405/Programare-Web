import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { OrderItem } from "./OrderItem";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "../../Auth/AuthContext";

export function Orders() {
  const [orders, setOrders] = useState([]);

  const { token } = useAuthContext();

  useEffect(() => {
    async function getOrders() {
      const res = await fetch("http://127.0.0.1:8000/api/shop/orders/",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    }

    getOrders();
  }, []);
  
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
                My Orders
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" component="div">
                {orders.length} Orders
              </Typography>
            </Grid>
          </Grid>
        </Box>
      {orders.map((order) => (
        <OrderItem key={order.id} {...order}/>
      ))}
      </Container>
    </>
  );
}
