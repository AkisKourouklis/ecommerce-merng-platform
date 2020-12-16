import React, { useState } from "react";
import { IProduct } from "../../ProductTypes";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const generatedItems = (products: IProduct[]) => {
  const items = [];
  for (let i = 0; i < products.length; i++) {
    items.push({ sku: products[i].sku, box: 0, selected: false, _id: products[i]._id, name: products[i].name });
  }
  return items;
};

const TransferList: React.FC<{
  products: IProduct[];
  setTransferListProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>;
}> = ({ products, setTransferListProducts }) => {
  const [items, setItems] = useState(generatedItems(products));

  const [leftside, rightside] = items.reduce<IProduct[][]>(
    (prevValue, nextValue) => {
      nextValue.box === 0 ? prevValue[0].push(nextValue) : prevValue[1].push(nextValue);
      return prevValue;
    },
    [[], []]
  );

  const handleCheckboxChange = (item: IProduct) => {
    const newItems = [...items];
    const index = items.findIndex((i) => i === item);
    newItems[index].selected = !newItems[index].selected;
    setItems(newItems);
  };

  const generateMarkup = (data: IProduct[]) => (
    <Paper>
      <List>
        {data?.map((e) => {
          return (
            <ListItem key={e._id}>
              <Checkbox onChange={() => handleCheckboxChange(e)} checked={e.selected} />{" "}
              <Typography>SKU: {e.sku}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  const moveRight = () => {
    const newItems = items.map((item) => ({ ...item, box: item.selected ? 1 : item.box }));
    setItems(newItems);
    setTransferListProducts(newItems);
  };

  const moveLeft = () => {
    const newItems = items.map((item) => ({ ...item, box: item.selected ? 0 : item.box }));
    setItems(newItems);
    setTransferListProducts([]);
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>
        <Typography>Not added</Typography>
        {generateMarkup(leftside)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button onClick={moveRight} variant="outlined" size="small" aria-label="move selected right">
            &gt;
          </Button>
          <Button onClick={moveLeft} variant="outlined" size="small" aria-label="move selected left">
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>Added</Typography>
        {generateMarkup(rightside)}
      </Grid>
    </Grid>
  );
};

export default TransferList;
