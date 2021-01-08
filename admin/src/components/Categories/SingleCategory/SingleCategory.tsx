import { Accordion, Button, Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { CreateError } from "../../Error/ErrorActions";
import { CreateNotification } from "../../Notification/NotificationActions";
import { DELETE_CATEGORY } from "../CategoriesQueries";
import DeleteIcon from "@material-ui/icons/Delete";
import GraphqlRequest from "../../../graphql/graphql-request";
import { ICategory } from "../../../types/categories";
import { useDispatch } from "react-redux";
import useStyles from "../Categories.styles";

const SingleProduct: React.FC<{ data: ICategory; fetchCategories: () => Promise<void> }> = ({
  data,
  fetchCategories
}) => {
  const { auth } = useContext(AuthContext);
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const toggleCanDelete = () => {
    setCanDelete((c) => !c);
  };

  const deleteCategory = async (): Promise<void> => {
    try {
      await GraphqlRequest(auth.token).request(DELETE_CATEGORY, { _id: data._id });
      dispatch(CreateNotification({ notification: "Category deleted successfully!", notificationType: "success" }));
      fetchCategories();
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography>Όνομα: {data?.name}</Typography>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item>
              <Button href={`/categories/edit/${data._id}`} variant="outlined" color="primary">
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
                    onClick={deleteCategory}
                  >
                    Διαγραφή κατηγορίας
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
      </Paper>
    </>
  );
};

export default SingleProduct;
