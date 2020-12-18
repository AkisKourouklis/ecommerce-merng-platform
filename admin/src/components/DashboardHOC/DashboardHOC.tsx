import React, { useContext, useState } from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Collapse,
  Paper
} from "@material-ui/core";
import { ExpandLess, ExpandMore, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ErrorAlert from "../Error/Error";
import HomeIcon from "@material-ui/icons/Home";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MenuIcon from "@material-ui/icons/Menu";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import NotificationAlert from "../Notification/Notification";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import useStyles from "./DashboardHOC.styles";
import { AuthContext } from "../Authentication/AuthContext";

const DashboardHOC: React.FC = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [productsOpen, setProductsOpen] = useState<boolean>(false);
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const { setAuth } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setProductsOpen(false);
    setCategoriesOpen(false);
  };

  const toggleProductList = () => {
    setProductsOpen(!productsOpen);
    setOpen(true);
  };

  const toggleCategoriesList = () => {
    setCategoriesOpen(!categoriesOpen);
    setOpen(true);
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        classes={{ colorDefault: classes.appbarBg }}
        color="inherit"
        variant="elevation"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <img alt="sovrakofanela.gr-logo" src="/logo.svg" width="150px" />
          </Typography>
          <IconButton style={{ marginLeft: "auto" }} color="inherit" onClick={logout} edge="start">
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerBg]: true
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Home" component={Link} to="/home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Orders">
            <ListItemIcon>
              <MoveToInboxIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          {/* products */}
          <ListItem button onClick={toggleProductList}>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={Link} to="/products/products">
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/products/variants">
                <ListItemText primary="Variants" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/products/tags">
                <ListItemText primary="Tags" />
              </ListItem>
            </List>
          </Collapse>
          {/* categories */}
          <ListItem button onClick={toggleCategoriesList}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} component={Link} to="/categories">
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button className={classes.nested} component={Link} to="/categories/filters">
                <ListItemText primary="Filters" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key="Customers">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <ErrorAlert>
        <NotificationAlert>
          <main className={classes.content}>
            <Container>
              <Paper className={classes.paper}>
                <>{children}</>
              </Paper>
            </Container>
          </main>
        </NotificationAlert>
      </ErrorAlert>
    </div>
  );
};

export default DashboardHOC;
