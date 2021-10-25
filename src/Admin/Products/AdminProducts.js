import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdminProductDetail } from "./AdminProductDetail";
import { useAuthContext } from "../../Auth/AuthContext";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const { token } = useAuthContext();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    productImage: "",
  });

  function handleInputChange(e) {
    setProduct({ ...product, [e.target.id]: e.target.value });
  }

  function handleFileChange(e) {
    setProduct({ ...product, productImage: e.target.files[0] });
  }

  async function updateProduct() {
    let data = new FormData();
    data.append("name", product.name);
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("category", product.category);
    data.append("productImage", product.productImage);
    const res = await fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    data = await res.json();
    if(data.id){
      let newProducts=props.products
      newProducts.push(data)
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
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
        </DialogContent>
      </Grid>
      <Grid container alignItems="center">
        <Grid item container justifyContent="center">
          <DialogActions>
            <Button variant="contained" color="success" onClick={updateProduct}>
              Add
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export function AdminProducts() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const data = await res.json();
      setProducts(data);
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
                Products
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6" component="div">
                {products.length} Products
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ mb: 5 }}>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
          <SimpleDialog
            open={open}
            onClose={handleClose}
            products={products}
            updateProductsFromChild={setProducts}
          />
        </Grid>
        <div>
          {products.map((product, index) => (
            <AdminProductDetail
              key={product.id}
              index={index}
              {...product}
              products={products}
              updateProductsFromChild={setProducts}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
