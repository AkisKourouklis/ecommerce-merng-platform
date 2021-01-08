import { Grid, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { AuthContext } from "../../Authentication/AuthContext";
import Checkbox from "@material-ui/core/Checkbox";
import { CreateError } from "../../Error/ErrorActions";
import { FIND_ALL_PRODUCTS } from "../../Products/Products/ProductsQueries/ProductQueries";
import FilterListIcon from "@material-ui/icons/FilterList";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GraphqlRequest from "../../../graphql/graphql-request";
import { IProduct } from "../../../types/products";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import useStyles from "./CreateCategoryStyles";

interface Data {
  _id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  costPrice: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "sku", numeric: false, disablePadding: false, label: "SKU" },
  { id: "barcode", numeric: false, disablePadding: false, label: "Barcode" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "costPrice", numeric: true, disablePadding: false, label: "CostPrice" }
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useStyles();
  const { numSelected } = props;
  const [filters, setFilters] = useState<boolean>(false);

  const toggleFilters = () => {
    setFilters((e) => !e);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <Grid container direction="row">
        <Grid justify="space-between" container item xs={12}>
          <Grid item xs={10}>
            {numSelected > 0 ? (
              <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Προιόντα
              </Typography>
            )}
          </Grid>
          <Grid item container xs={2}>
            {numSelected > 0 ? (
              <Tooltip title="Προσθήκη">
                <IconButton aria-label="add">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : null}

            <Tooltip title="Filter list">
              <IconButton aria-label="filter list" onClick={toggleFilters}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {filters ? (
          <Grid item xs={12}>
            <TextField
              inputRef={props.register}
              defaultValue=""
              type="search"
              name="search"
              fullWidth
              label="Αναζήτηση"
              variant="outlined"
            />
          </Grid>
        ) : null}
      </Grid>
    </Toolbar>
  );
};
const HandleProducts: React.FC<{
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}> = ({ setSelected, selected, setLoading, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { auth } = useContext(AuthContext);
  const { watch, register } = useForm();

  const search = watch("search", "");

  const createData = (
    name: string,
    sku: string,
    barcode: string,
    price: number,
    costPrice: number,
    _id: string
  ): Data => {
    return { name, sku, barcode, price, costPrice, _id };
  };

  const rows = products.map((e) =>
    createData(e.name || "", e.sku || "", e.barcode || "", e.price?.price || 0, e.price?.costPrice || 0, e._id)
  );

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FIND_ALL_PRODUCTS, { search });
      setProducts(response.findAllProducts.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className={classes.root}>
      {loading ? null : (
        <>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar register={register} numSelected={selected.length} />
            {loading ? null : (
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row._id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.sku}</TableCell>
                            <TableCell align="right">{row.barcode}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.costPrice}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        </>
      )}
    </div>
  );
};

export default HandleProducts;
