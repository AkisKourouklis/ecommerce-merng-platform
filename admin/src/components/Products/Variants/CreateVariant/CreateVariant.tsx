import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CREATE_VARIANT } from "../VariantQueries/VariantsQuery";
import { CreateError } from "../../../Error/ErrorActions";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { FIND_ALL_PRODUCTS } from "../../Products/ProductsQueries/ProductQueries";
import { IProduct } from "../../../../types/products";
import { Modal, Backdrop, Fade, Button, Paper, Grid, Typography } from "@material-ui/core";
import { UPLOAD_IMAGE } from "../../../FileUpload/FileUploadQueries";
import { useDispatch } from "react-redux";
import { useStyles } from "../VariantStyles/VariantStyles";
import CreateVariantInputFields from "./CreateVariantInputFields";
import FileUpload from "../../../FileUpload/FileUpload";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { IVariant, IFormVariant } from "../../../../types/variants";
import { IImage } from "../../../../types/images";

const CreateVariant: React.FC<{
  fetchVariants?: () => Promise<void>;
  canAddProduct: boolean;
  pushToVariantArray?: (values: IVariant) => void;
}> = ({ fetchVariants, canAddProduct, pushToVariantArray }) => {
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
  }: IFormVariant): Promise<void> => {
    try {
      if (canAddProduct) {
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
        if (fetchVariants) {
          fetchVariants();
        }
        setOpen(false);
        dispatch(CreateNotification({ notification: "Η νέα παραλαγή δημιουργήθηκε! ", notificationType: "success" }));
      } else {
        if (pushToVariantArray) {
          const uploadedImages = await uploadFiles();
          const priceObj = {
            price: price,
            costPrice: costPrice,
            comparePrice: comparePrice
          };
          pushToVariantArray({
            color,
            size,
            sku,
            barcode,
            price: priceObj,
            quantity: quantity,
            material,
            images: uploadedImages
          });
        }

        setLoadingFileUpload(false);
        setOpen(false);
        dispatch(
          CreateNotification({ notification: "New variant created successfully!", notificationType: "success" })
        );
      }
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const createNewVariant = async (variant: IFormVariant): Promise<IFormVariant | undefined> => {
    try {
      const price = {
        price: variant.price,
        comparePrice: variant.comparePrice,
        costPrice: variant.costPrice
      };
      return await GraphqlRequest(auth.token).request(CREATE_VARIANT, {
        size: variant.size,
        color: variant.color,
        material: variant.material,
        price,
        quantity: variant.quantity,
        sku: variant.sku,
        barcode: variant.barcode,
        images: variant.images,
        productId: variant.productId
      });
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const uploadFiles = async (): Promise<IImage[] | undefined> => {
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
    if (canAddProduct) {
      fetchProducts();
    }
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
        Δημιουργία παραλαγής
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
                  canAddProduct={canAddProduct}
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
