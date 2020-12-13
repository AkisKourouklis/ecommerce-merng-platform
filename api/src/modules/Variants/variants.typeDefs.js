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

  type DeleteVariantResults {
    updatedProduct: Product
    removedVariant: Variant
  }

  input UpdateVariant {
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

  input CreateVariant {
    size: String
    color: String
    material: String
    price: GeneralPriceInput
    quantity: Int
    sku: String
    barcode: String
    images: [ImageInput]
    productId: ID
  }

  extend type Query {
    findAllVariants(search: String, page: Int, limit: Int): VariantsResult
    findVariantById(variantId: String): Variant!
  }

  extend type Mutation {
    createVariant(variantInput: CreateVariant): Variant!
    updateVariant(variantInput: UpdateVariant): Variant!
    deleteVariant(variantId: ID): DeleteVariantResults!
    removeImageFromVariant(imageId: String, variantId: String): Variant!
    addImageToVariant(files: [Upload], variantId: ID): ImageUploadResult!
  }
`;
