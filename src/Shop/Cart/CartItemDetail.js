import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/AuthContext";
import { useCartContext } from "./CartContext";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export function CartItemDetail({ id, index, product, quantity }) {
  const [quantityValue, setQuantityValue] = useState(quantity);
  const { token } = useAuthContext();
  const { cartItems, setCartItems } = useCartContext();
  
  useEffect(() => {
    async function setItemQuantity() {
      const res = await fetch(`http://127.0.0.1:8000/api/marketplace/items/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quantity:quantityValue}),
      });
      const data=await res.json();
      console.log(data);
    }

    setItemQuantity();
  }, [quantityValue]);

  async function handleRemoveItem() {
     const res=await fetch(`http://127.0.0.1:8000/api/marketplace/items/${id}/`,{
       method:"DELETE",
       headers:{
         Authorization:`Bearer ${token}`
       },
     });
    cartItems.splice(index, 1);
    const newCartItems = [...cartItems];
    setCartItems(newCartItems);
  }

  const addQuantity = () => {
    setQuantityValue(quantityValue + 1);
  };

  const removeQuantity = () => {
    if (quantityValue > 1) setQuantityValue(quantityValue - 1);
  };

  return (
    <Paper elevation={3}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={1}>
          <Img src={product.productImage} alt={product.name} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
        </Grid>
        <Grid item xs={4} container alignItems="center" justifyContent="center">
          <Grid item xs={4}>
            <Button variant="contained" size="small" onClick={addQuantity}>
              +
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" component="div">
              {quantityValue}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" size="small" onClick={removeQuantity}>
              -
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" component="div">
            {product.price} lei
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" size="small" onClick={handleRemoveItem}>
            x
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
