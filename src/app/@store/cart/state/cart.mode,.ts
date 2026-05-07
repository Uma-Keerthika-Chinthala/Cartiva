export interface CartItemModel {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartStateModel {
    items: CartItemModel[];
}