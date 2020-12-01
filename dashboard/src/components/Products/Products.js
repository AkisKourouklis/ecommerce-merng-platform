import { Button, Grid, Typography } from "@material-ui/core";
import DashboardHOC from "../DashboardHOC/DashboardHOC";

export default () => {
  return (
    <DashboardHOC>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Typography variant="h5">Products</Typography>
        </Grid>
        <Grid item xs={6} container justify="flex-end">
          <Button variant="contained" color="primary">
            Add Product
          </Button>
        </Grid>
      </Grid>
    </DashboardHOC>
  );
};
