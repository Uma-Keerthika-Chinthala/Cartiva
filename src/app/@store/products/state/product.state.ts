import {Injectable, inject} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs'; 

import { ProductModel, ProductStateModel } from './product.model';
import { GetAllProducts, GetProductById } from './product.action';
import { ProductserviceService } from '../service/productservice.service';

@State<ProductStateModel>({
    name: 'products',
    defaults:{
        products:[], 
        loading:false,
        error:null
    }
})
@Injectable()
export class ProductsState {
    private productService = inject(ProductserviceService);

    @Selector()
    static getAllProducts(state:ProductStateModel): ProductModel[] {
        return state.products;
    }

    @Selector()
    static isLoading(state: ProductStateModel): boolean {
        return state.loading;
    }

    @Selector()
    static getError(state: ProductStateModel): string | null {
        return state.error;
    }

    @Action(GetAllProducts)
    getAllProducts(ctx:StateContext<ProductStateModel>){
        ctx.patchState({
            loading:true,
            error:null
        })
        return this.productService.getAllProducts().pipe(
            tap((products: ProductModel[]) => {
                ctx.patchState({
                    products,
                    loading:false
                });
            }),
            catchError((error) => {
                ctx.patchState({
                    loading:false,
                    error:error.message
                })
                return throwError(() => error);
            })
        )
    }

    
    @Action(GetProductById)
    getProductById(ctx:StateContext<ProductStateModel>, action: GetProductById){
        ctx.patchState({
            loading:true,
            error:null
        })
        return this.productService.getProductById(action.id).pipe(
            tap((product: ProductModel) => {
                const state = ctx.getState();
                ctx.patchState({
                    products: [...state.products, product],
                    loading:false
                })
            }),
            catchError((error) => {
                ctx.patchState({ loading: false, error: error.message });
                return throwError(() => error);
            })

    )}














} 



