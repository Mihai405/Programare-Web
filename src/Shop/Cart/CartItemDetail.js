import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
  const { cartItems, setCartItems , increaseItemQuantity , decreaseItemQuantity} = useCartContext();
  
  /*useEffect(() => {
    async function setItemQuantity() {
      const res = await fetch(`http://127.0.0.1:8000/api/shop/items/${id}/`, {
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
  }, [quantity]);*/

  async function handleRemoveItem() {
     const res=await fetch(`http://127.0.0.1:8000/api/shop/items/${id}/`,{
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
    increaseItemQuantity(id,quantityValue+1);
    setQuantityValue(quantityValue + 1);
  };

  const removeQuantity = () => {
    if (quantityValue > 1){
      decreaseItemQuantity(id,quantityValue-1);
      setQuantityValue(quantityValue - 1);
    }
  };

  return (
    <Paper elevation={2} sx={{p:2,mb:2}}>
      <Grid container alignItems="center">
        <Grid item xs={1} container justifyContent="flex-start">
          <Img src={product.productImage} alt={product.name} />
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="center">
          <Grid item xs={3} container justifyContent="center">
            <Button variant="contained" size="small" color="success" onClick={addQuantity}>
              +
            </Button>
          </Grid>
          <Grid item xs={1} justifyContent="center">
            <Typography variant="h6" component="div">
              {quantityValue}
            </Typography>
          </Grid>
          <Grid item xs={3} justifyContent="center">
            <Button variant="contained" size="small" color="error" onClick={removeQuantity}>
              -
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Typography variant="h6" component="div">
            {product.price} lei
          </Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button variant="contained" size="small" onClick={handleRemoveItem}>
            x
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
