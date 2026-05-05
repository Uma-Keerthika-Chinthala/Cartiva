import { Component, inject,  signal, computed} from '@angular/core';
import {OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from '../../components/header/header.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductModel } from '@store/products/state/product.model';
import { ProductsState } from '@store/products/state/product.state';
import { GetAllProducts } from '@store/products/state/product.action';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductItemComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  // ─── Signals ─────────────────────────────────────────
  products = signal<ProductModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('');
  searchQuery = signal<string>('');

  hasProducts = computed(() => this.products().length > 0);
  totalCount = computed(() => this.products().length);
  hasError = computed(() => this.error() !== null);
  isEmpty = computed(
    () => !this.loading() && !this.hasProducts() && !this.hasError(),
  );
  categories = computed(() => [
    ...new Set(this.products().map((p) => p.category)),
  ]);

  ngOnInit(): void {
    this.dispatchAndLoad();
    this.selectProducts();
    this.selectLoading();
    this.selectError();
  }

  private dispatchAndLoad(): void {
    this.store.dispatch(new GetAllProducts()).subscribe({
      next: () => {
        console.log('✅ GetAllProducts dispatched successfully');
      },
      error: (err) => {
        console.error('❌ Dispatch failed:', err);
        this.error.set(err.message); // ✅ Set signal on dispatch error
      },
      complete: () => {
        console.log('🏁 Dispatch complete');
      },
    });
  }

  private selectProducts(): void {
    this.store
      .select(ProductsState.getAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products: ProductModel[]) => {
          this.products.set(products);
        },
        error: (err) => {
          console.error('Error fetching products', err);
          this.error.set(err);
        },
      });
  }

  private selectLoading(): void {
    this.store.select(ProductsState.isLoading).subscribe({
      next: (isLoading: boolean) => {
        this.loading.set(isLoading);
      },
      error: (err) => {
        this.error.set(err);
      },
    });
  }

  private selectError(): void {
    this.store.select(ProductsState.getError).subscribe({
      next: (error: string | null) => {
        this.error.set(error);
      },
    });
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }

  onSearchProduct(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchQuery.set(inputValue);
  }

  filteredProducts = computed(() => {
    return this.products().filter((p) => {
      const matchesCategory =
        !this.selectedCategory() || p.category === this.selectedCategory();
      const matchesTitle =
        !this.searchQuery() ||
        p.title.toLowerCase().includes(this.searchQuery().toLowerCase());
      return matchesCategory && matchesTitle;
    });
  });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
