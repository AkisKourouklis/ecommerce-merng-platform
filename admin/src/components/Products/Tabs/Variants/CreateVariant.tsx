import React, { useContext, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
  FormGroup,
  InputAdornment,
  CircularProgress
} from "@material-ui/core";
import { useStyles } from "./VariantStyles";
import FileUpload from "../../../FileUpload/FileUpload";
import { VariantContext } from "./VariantContext";
import { VariantFormData, ISingleImage } from "./VariantTypes";
import { useForm } from "react-hook-form";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { UPLOAD_IMAGE } from "../../../FileUpload/FileUploadQueries";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CREATE_VARIANT } from "./VariantsQuery";

const CreateVariant: React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[] | []>([]);
  const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async ({
    color,
    size,
    sku,
    barcode,
    price,
    comparePrice,
    costPrice,
    quantity,
    material
  }: VariantFormData): Promise<void> => {
    const uploadedImages = await uploadFiles();
    console.log(uploadedImages);
    const createdVariant = await createNewVariant({
      color,
      size,
      sku,
      barcode,
      price,
      comparePrice,
      costPrice,
      quantity,
      material,
      images: uploadedImages
    });
    console.log(createdVariant);
    setLoadingFileUpload(false);
  };

  const createNewVariant = async (variant: VariantFormData): Promise<VariantFormData | undefined> => {
    try {
      const price = {
        price: parseInt(variant.price),
        comparePrice: parseInt(variant.comparePrice),
        costPrice: parseInt(variant.costPrice)
      };
      return await GraphqlRequest(auth.token).request(CREATE_VARIANT, {
        size: variant.size,
        color: variant.color,
        material: variant.material,
        price,
        quantity: parseInt(variant.quantity),
        sku: variant.sku,
        barcode: variant.barcode,
        images: variant.images
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = async (): Promise<ISingleImage[] | undefined> => {
    try {
      setLoadingFileUpload(true);
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  return (
    <div>
      <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
        Create Variant
      </Button>
      <Modal
        aria-labelledby="transition-modal-createVariant"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={12} className={classes.title}>
                <Typography variant="h5">Create new variant</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Images</Typography>
                <VariantContext.Provider value={{ images, setImages }}>
                  <FileUpload handleFileChange={handleImageChange} />
                </VariantContext.Provider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Images</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
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
                    <TextField
                      className={classes.input}
                      inputRef={register}
                      id="outlined-sku"
                      type="text"
                      name="sku"
                      label="SKU"
                      variant="outlined"
                      fullWidth
                    />
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
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateVariant;
