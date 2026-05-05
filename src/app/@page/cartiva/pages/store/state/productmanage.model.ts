export interface ProductManageStateModel {
  productsList: ProductModel[];
  loading: boolean;
  error: string | null;
}

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}



