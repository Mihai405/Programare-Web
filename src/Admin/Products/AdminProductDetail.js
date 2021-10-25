import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../../Auth/AuthContext";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

export function AdminProductDetail({ index ,id, name, description, price, productImage , products, updateProductsFromChild}){

  const { token } = useAuthContext();
  async function deleteProduct(){
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
        <Paper elevation={2} sx={{ p: 2, mb: 2 , pl:10}}>
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
            <Grid item xs={4} container justifyContent="center">
              <Button variant="contained" size="small" color="error" onClick={deleteProduct}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      );
}