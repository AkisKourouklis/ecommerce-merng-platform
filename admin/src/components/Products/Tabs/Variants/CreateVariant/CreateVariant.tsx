import React, { useContext, useEffect, useState } from "react";
import { Modal, Backdrop, Fade, Button, Paper, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../VariantStyles/VariantStyles";
import FileUpload from "../../../../FileUpload/FileUpload";
import { VariantFormData, ISingleImage } from "../VariantTypes";
import GraphqlRequest from "../../../../../graphql/graphql-request";
import { UPLOAD_IMAGE } from "../../../../FileUpload/FileUploadQueries";
import { AuthContext } from "../../../../Authentication/AuthContext";
import { CREATE_VARIANT } from "../VariantQueries/VariantsQuery";
import { useDispatch } from "react-redux";
import { CreateError } from "../../../../Error/ErrorActions";
import { FIND_ALL_PRODUCTS } from "../../../ProductQueries";
import { IProduct } from "../../../ProductTypes";
import CreateVariantInputFields from "./CreateVariantInputFields";
import { CreateNotification } from "../../../../Notification/NotificationActions";

const CreateVariant: React.FC<{ fetchVariants: () => Promise<void> }> = ({ fetchVariants }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[] | []>([]);
  const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    material,
    productId
  }: VariantFormData): Promise<void> => {
    try {
      const uploadedImages = await uploadFiles();
      await createNewVariant({
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
      fetchVariants();
      setOpen(false);
      dispatch(CreateNotification({ notification: "New variant created successfully!", notificationType: "success" }));
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
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
        images: variant.images,
        productId: variant.productId
      });
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const uploadFiles = async (): Promise<ISingleImage[] | undefined> => {
    try {
      setLoadingFileUpload(true);
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FIND_ALL_PRODUCTS);
      setProducts(response.findAllProducts.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
                <FileUpload handleFileChange={handleImageChange} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Images</Typography>
                <CreateVariantInputFields
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
    </div>
  );
};

export default CreateVariant;
