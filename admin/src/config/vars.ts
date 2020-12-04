export const apiUrl = {
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/graphql/v1"
      : "https://www.api.goonline.com/graphql/v1"
};
export const clientUrl = {
  uri: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.goonline.com"
};
