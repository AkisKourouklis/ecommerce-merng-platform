export interface VariantData {
  variants: [
    {
      _id: string;
      sku: string;
      size: string;
      color: string;
      material: string;
      price: {
        comparePrice: number;
        price: number;
        costPrice: number;
      };
      barcode: string;
      images: {
        _id: string;
      };
    }
  ];
}

export interface VariantMapedData {
  _id: string;
  sku: string;
  size: string;
  color: string;
  material: string;
  price: {
    comparePrice: number;
    price: number;
    costPrice: number;
  };
  barcode: string;
  images: {
    _id: string;
  };
}
