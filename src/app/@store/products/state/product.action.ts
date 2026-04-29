enum ProductActions {
    GET_ALL_PRODUCTS = '[Products] Get All Products',
    GET_PRODUCT_BY_ID = '[Products] Get Product By ID'
}

export class GetAllProducts {
  static readonly type:ProductActions =  ProductActions.GET_ALL_PRODUCTS;
  constructor(){}
}

export class GetProductById {
  static readonly type:ProductActions = ProductActions.GET_PRODUCT_BY_ID;
  constructor(public id: number){}
}