import { IImage } from "./images";
import { IProduct } from "./products";
import { ITags } from "../components/Products/Tags/TagTypes";

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  images: IImage[];
  products: IProduct[];
  tags: ITags[];
  seo: {
    name: string;
    description: string;
  };
}
export interface IEditCategory {
  _id: string;
  name: string;
  description: string;
  images: IImage[];
  products: IProduct[];
  tags: ITags[];
  seoName: string;
  seoDescription: string;
}
