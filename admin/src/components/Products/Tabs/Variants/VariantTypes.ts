export interface VariantData {
  variants: VariantMapedData[] | null | undefined;
}

export interface VariantMapedData {
  _id?: string;
  sku: string;
  size: string;
  color: string;
  material: string;
  quantity: string;
  price: {
    comparePrice: number;
    price: number;
    costPrice: number;
  };
  barcode: string;
  images: ISingleImage[];
}

export interface ISingleImage {
  _id: string;
  path: string;
  alt: string;
}

export interface IUploadResponseProp {
  alt: string;
  path: string;
}

export interface VariantFormData {
  color: string;
  size: string;
  material: string;
  sku: string;
  barcode: string;
  quantity: string;
  price: string;
  comparePrice: string;
  costPrice: string;
  images?: ISingleImage[];
  productId?: string;
}

export interface IEditVariant {
  color: string;
  size: string;
  material: string;
  sku: string;
  barcode: string;
  quantity: string;
  price: string;
  comparePrice: string;
  costPrice: string;
  variantId: string | undefined;
}
