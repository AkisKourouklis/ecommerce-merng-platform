import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Tab, Tabs, Box, AppBar } from "@material-ui/core";
import DashboardHOC from "../DashboardHOC/DashboardHOC";
import useStyles from "./Products.styles";
import Variants from "./Tabs/Variants/Variants";

const TabPanel: React.FC<{ classes: Record<"tabs" | "paper", string>; value: number; index: number }> = ({
  classes,
  children,
  value,
  index
}) => {
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
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <DashboardHOC>
        <AppBar position="static" className={classes.tabs} color="default">
          <Tabs
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="Products Tabs"
            className={classes.tabs}
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label="Products" {...a11yProps(0)} />
            <Tab label="Variants" {...a11yProps(1)} />
            <Tab label="Tags" {...a11yProps(2)} />
            <Tab label="TaxClasses" {...a11yProps(3)} />
            <Tab label="Images" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} classes={classes} index={0}>
          Products
        </TabPanel>
        <TabPanel value={value} classes={classes} index={1}>
          <Variants />
        </TabPanel>
        <TabPanel value={value} classes={classes} index={2}>
          Products
        </TabPanel>
        <TabPanel value={value} classes={classes} index={3}>
          Item Three
        </TabPanel>
      </DashboardHOC>
    </>
  );
};

export default Products;
