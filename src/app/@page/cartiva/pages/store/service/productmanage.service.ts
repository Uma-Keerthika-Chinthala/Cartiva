import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductModel } from '../state/productmanage.model';
@Injectable({
  providedIn: 'root'
})
export class ProductmanageService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  // get products
  getAllProducts(): Observable<any> {
    return this.http.get<ProductModel[]>(this.baseUrl);
  }

  // add product
  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.baseUrl, product);
  }

  //update product
  updateProduct(id: number, product:ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/${id}`, product)
  }

  // delete product
  deleteProduct(id:number):Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${this.baseUrl}/${id}`)
  }
}
