import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel, AddProductModel } from '../state/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private http = inject(HttpClient)
  private readonly baseUrl = 'https://fakestoreapi.com/products';
  private addProductUrl = 'https://fakestoreapi.com/products';
  

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: AddProductModel): Observable<AddProductModel> {
    return this.http.post<AddProductModel>(this.addProductUrl, product);
  }

}
