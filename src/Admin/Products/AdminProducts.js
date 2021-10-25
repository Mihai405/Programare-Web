import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdminProductDetail } from "./AdminProductDetail";

export function AdminProducts() {
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
          <Button variant="contained" size="large" color="success">
            Add Product
          </Button>
        </Grid>
        <div>
          {products.map((product,index) => (
            <AdminProductDetail key={product.id} index={index} {...product} products={products} updateProductsFromChild={setProducts}/>
          ))}
        </div>
      </Container>
    </>
  );
}
