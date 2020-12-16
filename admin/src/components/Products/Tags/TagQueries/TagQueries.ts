import { gql } from "graphql-request";

export const FETCH_TAGS = gql`
  query($search: String, $page: Int, $limit: Int) {
    findAllTags(search: $search, page: $page, limit: $limit) {
      tags {
        _id
        name
      }
      totalPages
      currentPage
    }
  }
`;

export const CREATE_TAG = gql`
  mutation($name: String) {
    createTag(name: $name) {
      _id
      name
    }
  }
`;

export const EDIT_TAG = gql`
  mutation($_id: ID, $name: String) {
    editTag(_id: $_id, name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation($tagId: ID) {
    deleteTag(tagId: $tagId) {
      updatedProduct {
        _id
      }
      removedTag {
        _id
      }
    }
  }
`;

export const ADD_TAG_TO_MULTIPLE_PRODUCTS = gql`
  mutation($products: [TaggedProduct], $tagId: ID) {
    addTagToMultipleProducts(tagId: $tagId, products: $products) {
      _id
    }
  }
`;
