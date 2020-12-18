import React from "react";
import { TextField, FormGroup, InputAdornment, CircularProgress, Grid, Button, Typography } from "@material-ui/core";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { VariantFormData } from "../VariantTypes";
import { IProduct } from "../../Products/ProductTypes";
import { useForm } from "react-hook-form";
import { useStyles } from "../VariantStyles/VariantStyles";

const CreateVariantInputFields: React.FC<{
  onSubmit: ({
    color,
    size,
    sku,
    barcode,
    price,
    comparePrice,
    costPrice,
    quantity,
    material,
    productId
  }: VariantFormData) => Promise<void>;
  loading: boolean;
  products: IProduct[];
  loadingFileUpload: boolean;
}> = ({ loading, onSubmit, products, loadingFileUpload }) => {
  const { register, handleSubmit } = useForm<VariantFormData>();
  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-color"
                type="text"
                name="color"
                label="Color"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-size"
                type="text"
                name="size"
                label="Size"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-material"
                type="text"
                name="material"
                label="Material"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-sku"
                type="text"
                name="sku"
                label="SKU"
                required
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-bardcode"
                type="text"
                name="barcode"
                label="Barcode"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-quantity"
                type="number"
                name="quantity"
                label="quantity"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={4}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-price"
                type="number"
                name="price"
                label="Price"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-comparePrice"
                type="number"
                name="comparePrice"
                label="Compare Price"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.input}
                inputRef={register}
                id="outlined-costPrice"
                type="number"
                name="costPrice"
                label="Cost Price"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <Skeleton className={classes.input} height={56} variant="rect" />
              ) : (
                <Autocomplete
                  options={products}
                  renderInput={(params) => (
                    <TextField
                      className={classes.input}
                      inputRef={register}
                      required
                      label="Select Product"
                      variant="outlined"
                      name="productId"
                      {...params}
                    />
                  )}
                  getOptionLabel={(option) => option._id}
                  renderOption={(product) => {
                    return (
                      <Typography noWrap>
                        sku: {product.sku} | {product.name}
                      </Typography>
                    );
                  }}
                />
              )}
            </Grid>
          </Grid>
        </FormGroup>
        <Button
          startIcon={loadingFileUpload ? <CircularProgress color="inherit" size={20} /> : null}
          type="submit"
          onClick={() => onSubmit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Save Variant
        </Button>
      </form>
    </>
  );
};

export default CreateVariantInputFields;
