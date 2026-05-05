import {Injectable, inject} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs'; 

import { ProductmanageService } from '../service/productmanage.service';
import { AddProduct, DeleteProduct, GetAllProducts, UpdateProduct} from './productmanage.action';
import { ProductManageStateModel, ProductModel} from './productmanage.model';
import { loadavg } from 'os';

@State<ProductManageStateModel>({
  name: 'productManage',
  defaults: {
    productsList: [],
    loading: false,
    error: null,
  },
})
@Injectable()
export class ProductsManageState {
  private productManageService = inject(ProductmanageService);

  @Selector()
  static isLoading(state: ProductManageStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getError(state: ProductManageStateModel): string | null {
    return state.error;
  }

  @Selector()
  static getAllProducts(state: ProductManageStateModel): ProductModel[] {
    return state.productsList;
  }

  @Action(GetAllProducts)
  getAllProducts(ctx: StateContext<ProductManageStateModel>) {
    ctx.patchState({
      loading: true,
      error: null,
    });
    return this.productManageService.getAllProducts().pipe(
      tap((products: ProductModel[]) => {
        ctx.patchState({
          productsList: products,
          loading: false,
        });
        console.log('✅ Products loaded:', products.length);
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          error: error.message,
        });
        console.error('❌ Failed to load products:', error);
        return throwError(() => error);
      }),
    );
  }

  // Add product action
  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductManageStateModel>, action: AddProduct) {
    ctx.patchState({
      loading: true,
      error: null,
    });
    return this.productManageService.addProduct(action.payload).pipe(
      tap((newProduct: ProductModel) => {
        const state = ctx.getState();
        ctx.patchState({
          productsList: [...state.productsList, newProduct],
          loading: false,
        });
        console.log('✅ Product added:', newProduct);
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          error: error.message,
        });
        console.error('❌ Failed to add product:', error);
        return throwError(() => error);
      }),
    );
  }

  //update product action
  @Action(UpdateProduct)
  updateProduct(
    ctx: StateContext<ProductManageStateModel>,
    action: UpdateProduct,
  ) {
    ctx.patchState({
      loading: true,
      error: null,
    });
    return this.productManageService
      .updateProduct(action.id, action.payload)
      .pipe(
        tap((updateProduct: ProductModel) => {
          const state = ctx.getState();
          const updateProducts = state.productsList.map((product) =>
            product.id === action.id ? updateProduct : product,
          );
          ctx.patchState({
            productsList: updateProducts,
            loading: false,
          });
        }),
        catchError((error) => {
          ctx.patchState({
            loading: false,
            error: error.message,
          });
          console.error('❌ Failed to update product:', error);
          return throwError(() => error);
        }),
      );
  }

  @Action(DeleteProduct)
  deleteProdduct(ctx: StateContext<ProductManageStateModel>, action: DeleteProduct){
    ctx.patchState({
      loading: true,
      error: null,
    });
    return this.productManageService.deleteProduct(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filterProducts = state.productsList.filter((product) => 
          product.id !== action.id
      );
       ctx.patchState({
        productsList: filterProducts,
        loading: false
       })
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          error: error.message
        })
        return throwError(() => error  );
      })
       
    )
  }
}  




