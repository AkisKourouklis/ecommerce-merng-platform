import { IImage } from "./images";
import { ITag } from "./tags";
import { IVariant } from "./variants";

export interface IProduct {
  _id: string;
  name?: string;
  description?: string;
  sku?: string;
  barcode?: string;
  selected?: boolean;
  isActive?: boolean;
  images?: IImage[];
  tags?: ITag[];
  tax?: number;
  quantity?: number;
  vendor?: string;
  variants?: IVariant[];
  price?: { price: number; comparePrice: number; costPrice: number };
  seo?: {
    name: string;
    description: string;
  };
}

export interface ICreateProduct {
  name: string;
  description: string;
  sku: string;
  barcode: string;
  isActive: string;
  quantity: number;
  tax: number;
  images: IImage[];
  variants: { _id: string }[];
  tags: { _id: string }[];
  comparePrice: number;
  costPrice: number;
  price: number;
  seoName: string;
  seoDescription: string;
  vendor: string;
}
