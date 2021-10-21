import { ProductCard } from "./ProductCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";
import photo from "./shopPoster.png";
import { useEffect, useState } from "react";

export function Shop() {
  const [ products, setProducts ] = useState([])

  useEffect(()=>{
    async function getProducts(){
      const res=await fetch("http://127.0.0.1:8000/api/marketplace/products/");
      const data= await res.json();
      setProducts(data);
      console.log(data);
    }
    
    getProducts();

  },[])

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
        <Grid container sx={{mb:10}}>
          <Grid item xs={5}>
              <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["A-Z","Z-A","price Low-High","price High-Low"]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Sort by" />}
        />
          </Grid>
          <Grid item xs={5}>
          <TextField  fullWidth id="outlined-basic" label="Search" variant="outlined" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {products.map((product) => (
            <ProductCard key={product} {...product}/>
          ))}
        </Grid>
      </Container>
    </>
  );
}
