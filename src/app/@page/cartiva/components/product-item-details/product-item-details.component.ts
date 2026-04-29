import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductModel } from '@store/products/state/product.model';
import { ProductsState } from '@store/products/state/product.state';
import { GetProductById } from '@store/products/state/product.action';

@Component({
  selector: 'app-product-item-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './product-item-details.component.html',
  styleUrl: './product-item-details.component.scss'
})
export class ProductItemDetailsComponent implements OnInit, OnDestroy {

  private route  = inject(ActivatedRoute);
  private store  = inject(Store);
  private destroy$ = new Subject<void>();

  // ─── Signals ──────────────────────────────────────────
  product  = signal<ProductModel | null>(null);
  loading  = signal<boolean>(false);
  error    = signal<string | null>(null);

  // ─── Computed Signals ─────────────────────────────────
  hasProduct = computed(() => this.product() !== null);
  hasError   = computed(() => this.error() !== null);

  // ─── Cleanup ──────────────────────────────────────────
  ngOnInit(): void {
  this.route.paramMap
    .pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        console.log('🔑 Product ID from route:', id);
        this.loading.set(true);
        this.selectProduct(id);                             // ✅ Listen first
        return this.store.dispatch(new GetProductById(id)); // ✅ Then dispatch
      })
    )
    .subscribe({
      next: () => {
        console.log('✅ Dispatch successful');
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Dispatch failed:', err);
        this.error.set(err.message);
        this.loading.set(false);
      },
      complete: () => {
        console.log('🏁 Complete');
        this.loading.set(false);
      }
    });
}

private selectProduct(id: number): void {
  this.store.select(ProductsState.getAllProducts)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (products: ProductModel[]) => {
        const found = products.find(p => p.id === id) ?? null;
        console.log('📦 Product found:', found);
        this.product.set(found);
      },
      error: (err) => {
        console.error('❌ Select error:', err);
        this.error.set(err.message);
      }
    });
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('🧹 ProductItemDetails cleaned up');
  }
}