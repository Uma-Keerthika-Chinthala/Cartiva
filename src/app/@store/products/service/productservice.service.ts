import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../state/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private readonly baseUrl = 'https://fakestoreapi.com/products';
  private http = inject(HttpClient)

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }
}
