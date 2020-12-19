import { IImage } from "./images";

export interface IVariant {
  _id?: string;
  color: string;
  size: string;
  sku: string;
  barcode: string;
  price: {
    price: number;
    comparePrice: number;
    costPrice: number;
  };
  quantity: number;
  material: string;
  images?: IImage[];
}

export interface IFormVariant {
  color: string;
  size: string;
  sku: string;
  barcode: string;
  price: number;
  comparePrice: number;
  costPrice: number;
  quantity: number;
  material: string;
  images?: IImage[];
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
