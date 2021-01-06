import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CreateError } from "../../../Error/ErrorActions";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { DELETE_PRODUCT } from "../ProductsQueries/ProductQueries";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { IProduct } from "../../../../types/products";
import { apiUrl } from "../../../../config/vars";
import { useDispatch } from "react-redux";
import useStyles from "../ProductStyles/Products.styles";

const SingleProduct: React.FC<{ data: IProduct; fetchProducts: () => Promise<void>; showImages: boolean }> = ({
  data,
  fetchProducts,
  showImages
}) => {
  const { auth } = useContext(AuthContext);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleCanDelete = () => {
    setCanDelete((c) => !c);
  };

  const deleteProduct = async (): Promise<void> => {
    try {
      await GraphqlRequest(auth.token).request(DELETE_PRODUCT, { _id: data._id });
      dispatch(CreateNotification({ notification: "Variant deleted successfully!", notificationType: "success" }));
      fetchProducts();
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography>Όνομα: {data?.name}</Typography>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Button href={`/products/products/edit/${data._id}`} variant="outlined" color="primary">
                  Επεξεργασία
                </Button>
              </Grid>
              {canDelete ? (
                <>
                  <Grid item>
                    <Button
                      className={classes.tagDeleteButtonContained}
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      size="small"
                      onClick={deleteProduct}
                    >
                      Διαγραφή προιόντος
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.tagDeleteButtonOutlined}
                      variant="outlined"
                      size="small"
                      onClick={toggleCanDelete}
                    >
                      Ακύρωση
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button
                    className={classes.tagDeleteButtonOutlined}
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={toggleCanDelete}
                  >
                    Διαγραφή
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row" spacing={1}>
            {showImages ? (
              <Grid item xs={12}>
                <Paper className={classes.innerPaper} variant="outlined">
                  <Grid container direction="row" spacing={1}>
                    {data?.images?.map((image, i) => {
                      return (
                        <Grid key={i} item xs={6} md={4}>
                          <img alt={image.alt} src={`${apiUrl.staticUri}${image.path}`} width="100%" />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Grid>
            ) : null}
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Κωδικός: {data.sku}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Τίτλος: {data.barcode}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Διαθέσιμό: {data.isActive ? "Ναι" : "Όχι"}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Τιμή: {data?.price?.price}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SingleProduct;
