import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useStyles } from "./VariantStyles";
import { VariantMapedData } from "./VariantTypes";
import { apiUrl } from "../../../../config/vars";

const SingleVariant: React.FC<{ data: VariantMapedData; showImages: boolean }> = ({ data, showImages }) => {
  const classes = useStyles();

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>SKU: {data?.sku}</Typography>
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
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SingleVariant;
