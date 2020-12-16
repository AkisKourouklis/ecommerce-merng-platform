import React from "react";
import { IEditVariant, VariantFormData, VariantMapedData } from "../VariantTypes";
import { TextField, FormGroup, InputAdornment, CircularProgress, Grid, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useStyles } from "../VariantStyles/VariantStyles";

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
  }: VariantFormData) => Promise<void>;
  loadingFileUpload: boolean;
  variant: VariantMapedData | null;
}> = ({ onSubmit, loadingFileUpload, variant }) => {
  const { register, handleSubmit } = useForm<IEditVariant>();
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
