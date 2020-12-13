import React, { memo, useContext, useState } from "react";
import { ADD_IMAGE_TO_VARIANT, UPDATE_VARIANT } from "../VariantQueries/VariantsQuery";
import { apiUrl } from "../../../../../config/vars";
import { AuthContext } from "../../../../Authentication/AuthContext";
import { CreateError } from "../../../../Error/ErrorActions";
import { CreateNotification } from "../../../../Notification/NotificationActions";
import { Modal, Backdrop, Fade, Button, Paper, Grid, Typography } from "@material-ui/core";
import { REMOVE_IMAGE_FROM_VARIANT } from "../VariantQueries/VariantsQuery";
import { useDispatch } from "react-redux";
import { useStyles } from "../VariantStyles/VariantStyles";
import { VariantFormData, ISingleImage, VariantMapedData, IEditVariant } from "../VariantTypes";
import DeleteIcon from "@material-ui/icons/Delete";
import EditVariantInputFields from "./EditVariantInputFields";
import FileUpload from "../../../../FileUpload/FileUpload";
import GraphqlRequest from "../../../../../graphql/graphql-request";

const EditVariant: React.FC<{ variant: VariantMapedData | null; fetchVariant: () => Promise<void> }> = ({
  variant,
  fetchVariant
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[] | []>([]);
  const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();

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
    try {
      if (images.length > 0) {
        await addImageToVariant();
      }
      await updateVariant({
        color,
        size,
        material,
        sku,
        barcode,
        price,
        comparePrice,
        costPrice,
        quantity
      });
      setLoadingFileUpload(false);
      fetchVariant();
      setOpen(false);
      dispatch(CreateNotification({ notification: "New variant created successfully!", notificationType: "success" }));
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const updateVariant = async (inputVariant: VariantFormData): Promise<IEditVariant | undefined> => {
    try {
      const price = {
        price: parseInt(inputVariant.price),
        comparePrice: parseInt(inputVariant.comparePrice),
        costPrice: parseInt(inputVariant.costPrice)
      };
      return await GraphqlRequest(auth.token).request(UPDATE_VARIANT, {
        size: inputVariant.size,
        color: inputVariant.color,
        material: inputVariant.material,
        price,
        quantity: parseInt(inputVariant.quantity),
        sku: inputVariant.sku,
        barcode: inputVariant.barcode,
        variantId: variant?._id
      });
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const addImageToVariant = async (): Promise<ISingleImage[] | undefined> => {
    try {
      setLoadingFileUpload(true);
      const response = await GraphqlRequest(auth.token).request(ADD_IMAGE_TO_VARIANT, {
        files: images,
        variantId: variant?._id
      });
      return response.uploadImage;
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const deleteImage = async (id: string) => {
    try {
      await GraphqlRequest(auth.token).request(REMOVE_IMAGE_FROM_VARIANT, {
        imageId: id,
        variantId: variant?._id
      });
      fetchVariant();
      dispatch(CreateNotification({ notification: "Image deleted successfully", notificationType: "success" }));
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  return (
    <>
      <Button size="small" variant="contained" color="primary" type="button" onClick={handleOpen}>
        Edit Variant
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
                <Typography variant="h5">Edit variant</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Images</Typography>
                <FileUpload handleFileChange={handleImageChange} />
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.innerPaper} variant="outlined">
                  <Grid container direction="row" spacing={1}>
                    {variant?.images.map((image) => {
                      return (
                        <Grid key={image._id} item xs={6} md={3}>
                          <img alt={image.alt} src={`${apiUrl.staticUri}${image.path}`} width="100%" />
                          <Button
                            className={classes.imageDeleteButton}
                            onClick={() => deleteImage(image._id)}
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            fullWidth
                          >
                            Delete
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Information</Typography>
                <EditVariantInputFields variant={variant} onSubmit={onSubmit} loadingFileUpload={loadingFileUpload} />
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default memo(EditVariant, (prevProps, nextProps) => {
  if (prevProps.variant !== nextProps.variant) {
    return false;
  }
  return true;
});
