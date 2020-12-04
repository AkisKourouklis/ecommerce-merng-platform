import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Tab, Tabs, Box, AppBar } from "@material-ui/core";
import DashboardHOC from "../DashboardHOC/DashboardHOC";
import useStyles from "./Products.styles";
import Variants from "./Tabs/Variants/Variants";

const TabPanel: React.FC<{ classes: any; value: number; index: number }> = ({ classes, children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`products-tabpanel-${index}`}
      aria-labelledby={`products-tab-${index}`}
    >
      {value === index && (
        <Box pt={3} pb={3}>
          <Paper className={classes.paper}>{children}</Paper>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = (index: number) => {
  return {
    id: `products-tab-${index}`,
    "aria-controls": `products-tabpanel-${index}`
  };
};

const Products: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <DashboardHOC>
        <AppBar position="static" className={classes.tabs} color="default">
          <Tabs value={value} onChange={handleChange} aria-label="Products Tabs" className={classes.tabs}>
            <Tab label="Variants" {...a11yProps(0)} />
            <Tab label="Products" {...a11yProps(1)} />
            <Tab label="Tags" {...a11yProps(2)} />
            <Tab label="TaxClasses" {...a11yProps(3)} />
            <Tab label="Images" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} classes={classes} index={0}>
          <Variants classes={classes} />
        </TabPanel>
        <TabPanel value={value} classes={classes} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} classes={classes} index={2}>
          Item Three
        </TabPanel>
      </DashboardHOC>
    </>
  );
};

export default Products;
