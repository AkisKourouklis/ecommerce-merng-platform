import { IImage } from "./images";

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  selected?: boolean;
}

export interface ICreateProduct {
  title: string;
  description: string;
  sku: string;
  barcode: string;
  isActive: string;
  quantity: number;
  tax: number;
  images: IImage[];
  variants: { _id: string }[];
  tags: { _id: string }[];
  price: {
    comparePrice: number;
    price: number;
  };
  seo: {
    name: string;
    description: string;
  };
}
