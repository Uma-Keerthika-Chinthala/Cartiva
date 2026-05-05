import { ProductModel } from "./productmanage.model";

enum ProductActions {
    GET_ALL_PRODUCTS = '[Products] Get All Products',
    ADD_PRODUCT = '[Products] Add Product',
    UPDATE_PRODUCT = '[Products] Update Product',
    DELETE_PRODUCT = '[Products] Delete Product'
}

export class GetAllProducts {
  static readonly type:ProductActions =  ProductActions.GET_ALL_PRODUCTS;
  constructor(){}
}


export class AddProduct {
  static readonly type:ProductActions = ProductActions.ADD_PRODUCT;
  constructor(public payload: ProductModel){} 
}

export class UpdateProduct {
  static readonly type:ProductActions = ProductActions.UPDATE_PRODUCT
  constructor(public id:number, public payload: ProductModel){}
} 

export class DeleteProduct {
  static readonly type:ProductActions = ProductActions.DELETE_PRODUCT
  constructor(public id:number){}
}