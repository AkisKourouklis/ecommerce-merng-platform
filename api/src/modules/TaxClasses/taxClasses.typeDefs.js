import { gql } from 'apollo-server-express';

export default gql`
  type TaxClass {
    _id: ID
    name: String
    tax: Int
  }

  input TaxClassInput {
    _id: ID
    name: String
    tax: Int
  }

  extend type Query {
    findAllTaxClasses(search: String, page: Int, limit: Int): TaxClass
  }

  extend type Mutation {
    createTaxClass(taxClassInput: TaxClassInput): TaxClass!
    editTaxClass(taxClassInput: TaxClassInput): TaxClass!
    deleteTaxClass(taxClassId: ID): TaxClass!
    removeTaxClassFromProduct(taxClassInput: TaxClassInput, productId: ID): Product!
    addTaxClassToProduct(taxClassInput: TaxClassInput, productId: ID): Product!
  }
`;
