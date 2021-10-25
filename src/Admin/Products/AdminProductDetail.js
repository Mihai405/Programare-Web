import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import { useAuthContext } from "../../Auth/AuthContext";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  let history = useHistory();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const { token } = useAuthContext();

  const [product, setProduct] = useState({
    name: props.name,
    description: props.description,
    price: props.price,
    category: props.category,
    productImage: "",
  });

  function handleInputChange(e) {
    setProduct({ ...product, [e.target.id]: e.target.value });
  }

  function handleFileChange(e){
    setProduct({ ...product, 'productImage': e.target.files[0]});
  }

  async function updateProduct() {
    let data = new FormData()
    data.append('name',product.name);
    data.append('description',product.description);
    data.append('price',product.price);
    data.append('category',product.category)
    data.append('productImage',product.productImage);
    const res = await fetch(`http://127.0.0.1:8000/api/products/${props.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:data,
    });
    data = await res.json();
    if(data.id===props.id){
      let newProducts=[...props.products]
      newProducts[props.index]=data
      handleClose()
      props.updateProductsFromChild(newProducts);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Grid container alignItems="center">
        <Grid item container justifyContent="center">
          <DialogTitle id="title">{"Update Product"}</DialogTitle>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <DialogContent sx={{ width: 1500 }}>
          <Grid item container justifyContent="center">
            <TextField
              id="name"
              label="Name"
              value={product.name}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ m: 3 }}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <TextField
              id="description"
              label="Description"
              value={product.description}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ m: 3 }}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <TextField
              id="price"
              label="Price"
              value={product.price}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ m: 3 }}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <TextField
              id="category"
              label="Category"
              value={product.category}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ m: 3 }}
            />
          </Grid>
          <Grid item container justifyContent="center">
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={handleFileChange}/>
            </Button>
          </Grid>
        </DialogContent>
      </Grid>
      <Grid container alignItems="center">
        <Grid item container justifyContent="center">
          <DialogActions>
            <Button variant="contained" color="success" onClick={updateProduct}>
              Update
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export function AdminProductDetail({
  index,
  id,
  name,
  description,
  price,
  category,
  productImage,
  products,
  updateProductsFromChild,
}) {
  const { token } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteProduct() {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    products.splice(index, 1);
    const newProducts = [...products];
    updateProductsFromChild(newProducts);
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, pl: 10 }}>
      <Grid container alignItems="center">
        <Grid item xs={1} container justifyContent="flex-start">
          <Img src={productImage} alt={name} />
        </Grid>
        <Grid item xs={4} container justifyContent="center">
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={3} container justifyContent="center">
          <Typography variant="h6" component="div">
            {price} lei
          </Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button variant="contained" onClick={handleClickOpen}>
            <CreateIcon />
          </Button>
          <SimpleDialog
            open={open}
            onClose={handleClose}
            index={index}
            id={id}
            name={name}
            description={description}
            price={price}
            category={category}
            products={products}
            updateProductsFromChild={updateProductsFromChild}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
