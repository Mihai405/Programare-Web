import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuthContext } from "../Auth/AuthContext";
import { useHistory } from "react-router-dom";

export function ProductCard({ id, name, description, price, productImage }) {
  let history = useHistory();

  const values = {
    product: id,
    quantity: 1,
  };

  const { user, token } = useAuthContext();

  async function handleCart() {
    if (!user) {
      return history.push("/login");
    } else {
      const req = await fetch("http://127.0.0.1:8000/api/shop/items/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      const found = data.find((element) => element.product.id === id);
      if (!found) {
        const res = await fetch("http://127.0.0.1:8000/api/shop/items/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const response = await res.json();
        console.log(response);
      } else {
        const res = await fetch(
          `http://127.0.0.1:8000/api/shop/items/${found.id}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: found.quantity + 1 }),
          }
        );
      }
    }
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
              marginTop="20px"
            >
              {price}lei
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ margin: "10px 20px", justifyContent: "center" }}>
          <Button variant="contained" color="success" onClick={handleCart}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
