import { Typography } from "@material-ui/core";

export default ({ variant }) => {
  return (
    <>
      <Typography>{variant.color}</Typography>
    </>
  );
};
