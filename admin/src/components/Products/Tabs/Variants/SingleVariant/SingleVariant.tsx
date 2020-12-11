import React, { memo, useContext, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useStyles } from "../VariantStyles";
import { VariantMapedData } from "../VariantTypes";
import { apiUrl } from "../../../../../config/vars";
import DeleteIcon from "@material-ui/icons/Delete";
import GraphqlRequest from "../../../../../graphql/graphql-request";
import { AuthContext } from "../../../../Authentication/AuthContext";
import { FIND_VARIANT_BY_ID } from "../VariantsQuery";

import EditVariant from "../EditVariant/EditVariant";

const SingleVariant: React.FC<{ data: VariantMapedData; showImages: boolean }> = ({ data, showImages }) => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const [variant, setVariant] = useState<VariantMapedData | null>(null);

  const fetchVariant = async (): Promise<void> => {
    try {
      const response = await GraphqlRequest(auth.token).request(FIND_VARIANT_BY_ID, { variantId: data._id });
      setVariant(response.findVariantById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVariant();
  }, []);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography>SKU: {data?.sku}</Typography>
            </Grid>
            <Grid item>
              <EditVariant variant={variant} fetchVariant={fetchVariant} />
              <Button
                className={classes.variantDeleteButton}
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row" spacing={1}>
            {showImages ? (
              <Grid item xs={12}>
                <Paper className={classes.innerPaper} variant="outlined">
                  <Grid container direction="row" spacing={1}>
                    {data?.images.map((image) => {
                      return (
                        <Grid key={image._id} item xs={6} md={4}>
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
                <Typography>Color: {data?.color}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Size: {data?.size}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Material: {data?.material}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Price: {data?.price.price}€</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Compare Price: {data?.price.comparePrice}€</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Cost Price: {data?.price.costPrice}€</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Barcode: {data?.barcode}€</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerPaper} variant="outlined">
                <Typography>Quantity: {data?.quantity}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(SingleVariant, (prevProps, nextProps) => {
  if (prevProps.data !== nextProps.data) {
    return false;
  }

  return true;
});
