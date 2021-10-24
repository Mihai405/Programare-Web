import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";
import photo from "./shopPoster.png";
import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";

export function Shop() {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [sortValue, setSortValue] = useState(null);
  useEffect(() => {
    async function getProducts() {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const data = await res.json();
      setProducts(data);
    }

    getProducts();
  }, []);

  function onSearchChange(event) {
    setSearchProduct(event.target.value);
  }

  function onSortChange(event, newValue) {
    setSortValue(newValue);
  }

  let filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchProduct.toLowerCase());
  });

  switch (sortValue) {
    case "A-Z":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z-A":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price Low-High":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price High-Low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    default:
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            position: "relative",
            mt: 4,
            mb: 4,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${photo})`,
            height: "270px",
          }}
        />
        <Grid container sx={{ mb: 10 }}>
          <Grid item xs={5}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["A-Z", "Z-A", "price Low-High", "price High-Low"]}
              sx={{ width: 300 }}
              onChange={onSortChange}
              value={sortValue}
              renderInput={(params) => (
                <TextField {...params} label="Sort by" />
              )}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="searchProducts"
              label="Search"
              variant="outlined"
              onChange={onSearchChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <ProductList products={filteredProducts} />
        </Grid>
      </Container>
    </>
  );
}
