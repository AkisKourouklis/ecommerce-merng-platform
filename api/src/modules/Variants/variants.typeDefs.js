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

  input VariantInput {
    size: String
    color: String
    material: String
    price: GeneralPriceInput
    quantity: Int
    sku: String
    barcode: String
    images: [ImageInput]
    variantId: ID
  }

  extend type Query {
    findAllVariants(search: String, page: Int, limit: Int): VariantsResult
    findVariantById(variantId: String): Variant!
  }

  extend type Mutation {
    createVariant(variantInput: VariantInput): Variant!
    updateVariant(variantInput: VariantInput): Variant!
    removeImageFromVariant(imageId: String, variantId: String): Variant!
    addImageToVariant(files: [Upload], variantId: ID): ImageUploadResult!
  }
`;
