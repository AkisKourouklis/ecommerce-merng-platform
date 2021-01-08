import { gql } from "graphql-request";

export const CATEGORIES_FIND_ALL = gql`
  query($search: String) {
    categoryFindAll(search: $search) {
      categories {
        _id
        name
      }
    }
  }
`;

export const FETCH_SINGLE_CATEGORY = gql`
  query($_id: ID!) {
    categoryFindById(_id: $_id) {
      name
      description
      images {
        path
        alt
      }
      products {
        _id
        name
        description
        images {
          _id
          path
          alt
        }
      }
      seo {
        name
        description
      }
      tags
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation(
    $name: String
    $description: String
    $images: [ImageInput]
    $products: [ProductInput]
    $tags: [CategotyTagInput]
    $seo: CategorySeoInput
  ) {
    categoryCreate(
      categoryInput: {
        name: $name
        description: $description
        images: $images
        products: $products
        tags: $tags
        seo: $seo
      }
    ) {
      _id
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation($_id: String!) {
    categoryDelete(_id: $_id) {
      _id
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation(
    $_id: ID
    $name: String
    $description: String
    $images: [ImageInput]
    $products: [ProductInput]
    $tags: [CategotyTagInput]
    $seo: CategorySeoInput
  ) {
    categoryEdit(
      categoryInput: {
        _id: $_id
        name: $name
        description: $description
        images: $images
        products: $products
        tags: $tags
        seo: $seo
      }
    ) {
      _id
    }
  }
`;
