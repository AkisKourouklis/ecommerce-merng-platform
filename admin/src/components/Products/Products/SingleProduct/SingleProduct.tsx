import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMore from "@material-ui/icons/ExpandMore";
import useStyles from "../ProductStyles/Products.styles";
import { IProduct } from "../../../../types/products";

const SingleProduct: React.FC<{ data: IProduct }> = ({ data }) => {
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const classes = useStyles();

  const toggleCanDelete = () => {
    setCanDelete((c) => !c);
  };

  const deleteProduct = () => {
    console.log("delete");
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
              <Grid item>edit product{/* <EditVariant variant={variant} fetchVariant={fetchVariant} /> */}</Grid>
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
            {/* {showImages ? (
       <Grid item xs={12}>
         <Paper className={classes.innerPaper} variant="outlined">
           <Grid container direction="row" spacing={1}>
             {data?.images?.map((image) => {
               return (
                 <Grid key={image._id} item xs={6} md={4}>
                   <img alt={image.alt} src={`${apiUrl.staticUri}${image.path}`} width="100%" />
                 </Grid>
               );
             })}
           </Grid>
         </Paper>
       </Grid>
     ) : null} */}
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
