export const apiUrl = {
  uri: process.env.NODE_ENV === "development" ? "http://localhost:5001/graphql" : "https://www.api.goonline.com/graphql"
};
export const clientUrl = {
  uri: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.goonline.com"
};
