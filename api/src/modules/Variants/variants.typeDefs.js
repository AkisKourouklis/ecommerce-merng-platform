import { gql } from 'apollo-server-express';

export default gql`
  type VariantsResult {
    variants: [Variant]
    totalPages: Int
    currentPage: Int
  }

  type Variant {
    _id: String
    size: String
    color: String
    material: String
    price: GeneralPrice
    quantity: Int
    sku: String
    barcode: String
    images: [Image]
  }

  input VariantInfo {
    size: String
    color: String
    material: String
    price: GeneralPriceInput
    quantity: Int
    sku: String
    barcode: String
    images: [ImageInput]
  }

  extend type Query {
    findAllVariants(search: Int, page: String, limit: Int): VariantsResult
  }

  extend type Mutation {
    createVariant(variantInfo: VariantInfo): Variant!
    removeVariantFromProduct(variantInfo: VariantInfo, ProductInput: ProductInput): Product!
  }
`;
