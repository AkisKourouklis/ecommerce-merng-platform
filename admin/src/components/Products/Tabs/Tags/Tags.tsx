import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, LinearProgress, TextField, Typography } from "@material-ui/core";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { AuthContext } from "../../../Authentication/AuthContext";
import { FETCH_TAGS } from "./TagQueries/TagQueries";
import { useForm } from "react-hook-form";
import { ITags } from "./TagTypes";
import { useDispatch } from "react-redux";
import { CreateError } from "../../../Error/ErrorActions";
import CreateTag from "./CreateTag/CreateTag";
import SingleTag from "./SingleTag/SingleTag";

const Tags: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<ITags | null>(null);
  const { watch, register } = useForm();
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const search = watch("search");

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FETCH_TAGS, { limit: 12, search });
      setTags(response.findAllTags);
      setLoading(false);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchTags();
  }, [search]);

  return (
    <Grid container direction="row" spacing={2}>
      {loading ? (
        <div style={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </div>
      ) : null}
      <Grid item xs={6}>
        <Typography variant="h5">Tags</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="end">
          <CreateTag fetchTags={fetchTags} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField
          inputRef={register}
          defaultValue=""
          type="search"
          name="search"
          fullWidth
          label="Search"
          variant="outlined"
        />
      </Grid>
      {loading ? null : (
        <>
          {tags?.tags?.map((data) => {
            return (
              <Grid key={data._id} item xs={12} md={4}>
                <SingleTag data={data} fetchTags={fetchTags} />
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default Tags;
