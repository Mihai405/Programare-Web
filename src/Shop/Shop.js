import { ProductCard } from "./ProductCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
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
        <Grid container item spacing={3}>
          {items.map((item) => (
            <ProductCard key={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
