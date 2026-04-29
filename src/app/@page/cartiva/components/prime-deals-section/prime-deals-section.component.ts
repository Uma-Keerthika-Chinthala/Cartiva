import { Component } from '@angular/core';
import { filter, first, Observable, take } from 'rxjs';

@Component({
  selector: 'app-prime-deals-section',
  standalone: true,
  imports: [],
  templateUrl: './prime-deals-section.component.html',
  styleUrl: './prime-deals-section.component.scss'
})
export class PrimeDealsSectionComponent {

  constructor() {}

  ngOnInit(): void {

    console.log('Initializing PrimeDealsSectionComponent');

  }

  // primeDealsProducts!: Observable<ProductModel[]>;

  // constructor(
  //   private store: Store
  // ){}

  // ngOnInit(){
  //   console.log('Initializing PrimeDealsSectionComponent');
  //   // Dispatch action to load products
  //   this.store.dispatch(new GetPrimeDealsProducts());

  //   // Select products from state
  //   this.primeDealsProducts$ = this.store.select(ProductsState.getPrimeProducts);

  // }

  // getPrimeDealsProducts() : void {
  //   this.store.dispatch(new GetPrimeDealProducts()).pipe(first()).subscribe({
  //       next: () => {
  //         console.log('Products action completed');

  //         this.store.select(ProductsState.getPrimeProducts).pipe(first()).subscribe((products) => {
  //           this.primeDealsProducts = products ?? [];
  //           console.log('Prime deals products loaded', this.primeDealsProducts);
  //         });
  //       }
  //     })

  // }

  

  // getPrimeDealsProducts(): void {
  //   this.store.dispatch(new GetPrimeDealsProducts());
  //   this.store.select(ProductsState.getPrimeProducts)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (products) => {
  //         this.primeDealsProducts = products ?? [];
  //         console.log('Prime deals products loaded', this.primeDealsProducts);
  //       },
  //       error: (err) => console.error('Error loading prime deals products', err)
  //     });
  // }

}