import React, { useContext, useEffect, useState } from "react";
import { ADD_TAG_TO_MULTIPLE_PRODUCTS, CREATE_TAG } from "../TagQueries/TagQueries";
import { AuthContext } from "../../../Authentication/AuthContext";
import { Backdrop, Button, CircularProgress, Fade, Grid, Modal, Paper, TextField, Typography } from "@material-ui/core";
import { CreateError } from "../../../Error/ErrorActions";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { FIND_ALL_PRODUCTS } from "../../ProductQueries";
import { IProduct } from "../../ProductTypes";
import { ISingleTag } from "../TagTypes";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useStyles } from "../TagStyles/TagStyles";
import GraphqlRequest from "../../../../graphql/graphql-request";
import TransferList from "./TranferList";

const CreateTag: React.FC<{ fetchTags: () => Promise<void> }> = ({ fetchTags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [transferListProducts, setTransferListProducts] = useState<IProduct[] | []>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async ({ name }: ISingleTag): Promise<void> => {
    try {
      setLoading(true);
      const createdTag = await GraphqlRequest(auth.token).request(CREATE_TAG, {
        name
      });
      await addTagToProduct(createdTag.createTag);
      fetchTags();
      dispatch(CreateNotification({ notification: "New tag created successfully!", notificationType: "success" }));
      setLoading(false);
      handleClose();
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const addTagToProduct = async (createdTag: ISingleTag): Promise<void> => {
    try {
      await GraphqlRequest(auth.token).request(ADD_TAG_TO_MULTIPLE_PRODUCTS, {
        tagId: createdTag._id,
        products: transferListProducts
      });
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await GraphqlRequest(auth.token).request(FIND_ALL_PRODUCTS);
      setProducts(response.findAllProducts.products);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
        Create Tag
      </Button>
      <Modal
        aria-labelledby="transition-modal-createTag"
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
                <Typography variant="h5">Create new tag</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Information</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    className={classes.input}
                    inputRef={register}
                    type="text"
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <Button
                    startIcon={loading ? <CircularProgress color="inherit" size={20} /> : null}
                    type="submit"
                    onClick={() => onSubmit}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Save Tag
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">Products</Typography>

                {products && <TransferList products={products} setTransferListProducts={setTransferListProducts} />}
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default CreateTag;
