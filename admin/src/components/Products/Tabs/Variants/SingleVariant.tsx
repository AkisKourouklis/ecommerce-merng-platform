import React from "react";
import { Typography } from "@material-ui/core";
import { VariantMapedData } from "./VariantTypes";

const SingleVariant: React.FC<{ variant: VariantMapedData }> = ({ variant }) => {
  return (
    <>
      <Typography>{variant?.color}</Typography>
    </>
  );
};

export default SingleVariant;
