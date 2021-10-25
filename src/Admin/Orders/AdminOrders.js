import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdminOrderItem } from "./AdminOrderItem";

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://127.0.0.1:8000/api/shop/admin/orders/");
      const data = await res.json();
      setOrders(data);
    }

    getProducts();
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
                Orders
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" component="div">
                {orders.length} Orders
              </Typography>
            </Grid>
          </Grid>
        </Box>
      {orders.map((order,index) => (
        <AdminOrderItem key={order.id} index={index} {...order} orders={orders} updateOrdersFromChild={setOrders}/>
      ))}
      </Container>
    </>
  );
}