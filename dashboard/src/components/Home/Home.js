import { Grid, Paper } from "@material-ui/core";
import DashboardHOC from "../DashboardHOC/DashboardHOC";

export default () => {
  return (
    <DashboardHOC>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>Orders</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>Products</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>Customers</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>Settings</Paper>
        </Grid>
      </Grid>
    </DashboardHOC>
  );
};
