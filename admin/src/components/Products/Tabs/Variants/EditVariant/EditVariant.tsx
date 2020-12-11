import React, { memo, useContext, useEffect, useState } from "react";
import { Modal, Backdrop, Fade, Button, Paper, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../VariantStyles";
import FileUpload from "../../../../FileUpload/FileUpload";
import { VariantFormData, ISingleImage, VariantMapedData } from "../VariantTypes";
import GraphqlRequest from "../../../../../graphql/graphql-request";
import { UPLOAD_IMAGE } from "../../../../FileUpload/FileUploadQueries";
import { AuthContext } from "../../../../Authentication/AuthContext";
import { CREATE_VARIANT, FIND_VARIANT_BY_ID } from "../VariantsQuery";
import { useDispatch } from "react-redux";
import { CreateError } from "../../../../Error/ErrorActions";
import { FIND_ALL_PRODUCTS } from "../../../ProductQueries";
import { REMOVE_IMAGE_FROM_VARIANT } from "../VariantsQuery";
import { IProduct } from "../../../ProductTypes";
import EditVariantInputFields from "./EditVariantInputFields";
import { CreateNotification } from "../../../../Notification/NotificationActions";
import { apiUrl } from "../../../../../config/vars";
import DeleteIcon from "@material-ui/icons/Delete";

const EditVariant: React.FC<{ variantId: string | undefined }> = ({ variantId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[] | []>([]);
  const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);
  const [variant, setVariant] = useState<VariantMapedData | null>(null);
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
    material,
    productId
  }: VariantFormData): Promise<void> => {
    try {
      const uploadedImages = await uploadFiles();
      await updateVariant({
        color,
        size,
        sku,
        barcode,
        price,
        comparePrice,
        costPrice,
        quantity,
        material,
        images: uploadedImages,
        productId
      });
      setLoadingFileUpload(false);
      setOpen(false);
      dispatch(CreateNotification({ notification: "New variant created successfully!", notificationType: "success" }));
    } catch (error) {
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  const updateVariant = async (variant: VariantFormData): Promise<VariantFormData | undefined> => {
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
        images: variant.images,
        productId: variant.productId
      });
    } catch (error) {
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  const uploadFiles = async (): Promise<ISingleImage[] | undefined> => {
    try {
      setLoadingFileUpload(true);
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (error) {
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FIND_ALL_PRODUCTS);
      setProducts(response.findAllProducts.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  const fetchVariant = async (): Promise<void> => {
    console.log("here", variantId);
    try {
      const response = await GraphqlRequest(auth.token).request(FIND_VARIANT_BY_ID, { variantId });
      setVariant(response.findVariantById);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await GraphqlRequest(auth.token).request(REMOVE_IMAGE_FROM_VARIANT, {
        imageId: id,
        variantId
      });
      fetchVariant();
      dispatch(CreateNotification({ notification: "Image deleted successfully", notificationType: "success" }));
    } catch (error) {
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchVariant();
  }, []);

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
                <Typography variant="overline">Images</Typography>
                <EditVariantInputFields
                  loading={loading}
                  onSubmit={onSubmit}
                  products={products}
                  loadingFileUpload={loadingFileUpload}
                />
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default memo(EditVariant, (prevProps, nextProps) => {
  if (prevProps.variantId !== nextProps.variantId) {
    return false;
  }
  return true;
});
