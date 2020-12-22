import React from "react";
import { TextField, FormGroup, InputAdornment, CircularProgress, Grid, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useStyles } from "../VariantStyles/VariantStyles";
import { IFormVariant, IVariant, IEditVariant } from "../../../../types/variants";

const EditVariantInputFields: React.FC<{
  onSubmit: ({
    color,
    size,
    sku,
    barcode,
    price,
    comparePrice,
    costPrice,
    quantity,
    material
  }: IFormVariant) => Promise<void>;
  loadingFileUpload: boolean;
  variant: IVariant | null;
}> = ({ onSubmit, loadingFileUpload, variant }) => {
  const { register, handleSubmit } = useForm<IEditVariant>();
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
      <form onSubmit={handleSubmit(submitValues)}>
        <FormGroup>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                inputRef={register}
                defaultValue={variant?.color}
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
                defaultValue={variant?.size}
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
                defaultValue={variant?.material}
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
                defaultValue={variant?.sku}
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
                defaultValue={variant?.barcode}
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
                defaultValue={variant?.quantity}
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
                defaultValue={variant?.price?.price}
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
                defaultValue={variant?.price?.comparePrice}
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
                defaultValue={variant?.price?.costPrice}
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

export default EditVariantInputFields;
