import { AddProductModel } from "./product.model";
enum ProductActions {
    GET_ALL_PRODUCTS = '[Products] Get All Products',
    GET_PRODUCT_BY_ID = '[Products] Get Product By ID',
    ADD_PRODUCT = '[Products] Add Product'
}

export class GetAllProducts {
  static readonly type:ProductActions =  ProductActions.GET_ALL_PRODUCTS;
  constructor(){}
}

export class GetProductById {
  static readonly type:ProductActions = ProductActions.GET_PRODUCT_BY_ID;
  constructor(public id: number){}
}

export class AddProduct {
  static readonly type:ProductActions = ProductActions.ADD_PRODUCT;
  constructor(public payload:AddProductModel){}
}


