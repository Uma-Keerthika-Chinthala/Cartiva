import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../../components/header/header.component';
import { Store } from '@ngxs/store';
import { signal, inject, computed} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AddProduct, GetAllProducts, UpdateProduct, DeleteProduct} from '../store/state/productmanage.action';
import { ProductsManageState } from '../store/state/productmanage.state';
import { ProductModel } from '../store/state/productmanage.model';

import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private fb = inject(FormBuilder);

  productsForm!: FormGroup;

  // ─── Signals ─────────────────────────────────────────
  productsList = signal<ProductModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  editId = signal<number>(0);

  hasProducts = computed(() => this.productsList().length > 0);
  totalCount = computed(() => this.productsList().length);
  hasError = computed(() => this.error() !== null);
  isEmpty = computed(
    () => !this.loading() && !this.hasProducts() && !this.hasError(),
  );


  ngOnInit(): void {
    this.dispatchAndLoad();
    this.selectProducts();
    this.selectLoading();
    this.selectError();
    this.initlizeForm();
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
      .select(ProductsManageState.getAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products: ProductModel[]) => {
          this.productsList.set(products);
        },
        error: (err) => {
          console.error('Error fetching products', err);
          this.error.set(err);
        },
      });
  }

  private selectLoading(): void {
    this.store.select(ProductsManageState.isLoading).subscribe({
      next: (isLoading: boolean) => {
        this.loading.set(isLoading);
      },
      error: (err) => {
        this.error.set(err);
      },
    });
  }

  private selectError(): void {
    this.store.select(ProductsManageState.getError).subscribe({
      next: (error: string | null) => {
        this.error.set(error);
      },
    });
  }

  initlizeForm(): void {
    this.productsForm = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required] ],
      price: ['', [Validators.required] ],
      category: ['', [Validators.required] ],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addProduct(): void {
    console.log("Add product called")
    if (this.productsForm.valid) {
      const payload: ProductModel = {
        id: this.productsForm.value.id!,
        title: this.productsForm.value.title!,
        price: this.productsForm.value.price!,
        description: this.productsForm.value.description!,
        category: this.productsForm.value.category!,
        image: this.productsForm.value.image!,
      };
      console.log('Adding product with payload:', payload);
      this.store.dispatch(new AddProduct(payload)).subscribe({
        
        next: () => {
          console.log('✅ AddProduct dispatched successfully');
          this.successMessage.set('Product added successfully!');
          this.productsForm.reset();
        },
        error: (err) => {
          this.errorMessage.set('Failed to add product. Please try again.');
          console.error('❌ Dispatch failed:', err);
        },
        complete: () => {
          console.log('🏁 Add product complete');
        },
      });
    }
  }

  editProduct(id: number): void {
    const product = this.productsList().find((product) => product.id === id);
    console.log('Selected product for editing:', product);
    if (product) {
      this.editId.set(id);
      this.productsForm.patchValue(product);
      console.log('Editing product:', product);
      console.log('Form values after patch:', this.productsForm.patchValue(product));
    }
  }

  updateProduct(): void {
    console.log("Update product called")
    const productId = this.editId();
    if (this.productsForm.valid && productId) {
      const payload: ProductModel = this.productsForm.value;
      this.store.dispatch(new UpdateProduct(productId, payload)).subscribe({
        next: () => {
          console.log('✅ UpdateProduct dispatched successfully');
          this.successMessage.set('Product updated successfully!');
          this.productsForm.reset();
          this.editId.set(0);
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          this.error.set(err.message); // ✅ Show error in UI
        },
        complete: () => console.log('🏁 Update complete'),
      });
    }
  }

  deleteProduct(id:number): void {
    this.store.dispatch(new DeleteProduct(id)).subscribe({
      next: () => {
        console.log('✅ DeleteProduct dispatched successfully');
        this.successMessage.set('Product deleted successfully!');
      }
    })
  }

  resetForm(): void {
    this.productsForm.reset();
    this.editId.set(0);
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 




