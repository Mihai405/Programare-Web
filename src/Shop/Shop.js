import { ProductCard } from "./ProductCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";
import photo from "./shopPoster.png";

export function Shop() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
          {items.map((item) => (
            <ProductCard key={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
