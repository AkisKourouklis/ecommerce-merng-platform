import React from "react";
import { TextField, FormGroup, InputAdornment, CircularProgress, Grid, Button, Typography } from "@material-ui/core";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { IProduct } from "../../../../types/products";
import { useForm } from "react-hook-form";
import { useStyles } from "../VariantStyles/VariantStyles";
import { IFormVariant } from "../../../../types/variants";

const CreateVariantInputFields: React.FC<{
  onSubmit: (value: IFormVariant) => Promise<void>;
  loading: boolean;
  products: IProduct[];
  loadingFileUpload: boolean;
  canAddProduct: boolean;
}> = ({ loading, onSubmit, products, loadingFileUpload, canAddProduct }) => {
  const { register, handleSubmit } = useForm<IFormVariant>();
  const classes = useStyles();

  const submitValues = (values: IFormVariant) => {
    const { barcode, color, comparePrice, costPrice, material, price, quantity, size, sku, images, productId } = values;
    onSubmit({
      barcode,
      color,
      comparePrice: Number(comparePrice),
      costPrice: Number(costPrice),
      price: Number(price),
      material,
      productId,
      images,
      sku,
      size,
      quantity: Number(quantity)
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitValues)} id="create-variant-form">
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
                type="Number"
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
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  inputProps: { min: 0, max: 10000, step: "0.1" }
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
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  inputProps: { min: 0, max: 10000, step: "0.1" }
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
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  inputProps: { min: 0, max: 10000, step: "0.1" }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {canAddProduct ? (
                loading ? (
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
                )
              ) : null}
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
          form="create-variant-form"
        >
          Save Variant
        </Button>
      </form>
    </>
  );
};

export default CreateVariantInputFields;
