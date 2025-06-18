import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { catchError, Observable, of, pipe, Subject, take, takeUntil, tap } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  private apiUrl = '/api/products';

  http = inject(HttpClient);

  products = signal<Product[]>([]);

   private destroy$ = new Subject<void>();

  constructor() {
     this.getAllProducts();
   }


    /**
   * Get all current products
   * GET /products
   */
    getAllProducts(): void {
      this.http.get<Product[]>(this.apiUrl).pipe(
            takeUntil(this.destroy$),
            tap((response) => { this.products.set((response as any).products);
            }),
            catchError((error) => {
              console.error('Error fetching products:', error);
              return of(null);
            })
          ).subscribe();
    }

   /**
   * Get a specific product by ID
   * GET /products/{productId}
   */
   getProduct(productId: string): void {
      this.http.get<Product>(`${this.apiUrl}/${productId}`).pipe(take(1)).subscribe((response)=>{
       alert(JSON.stringify(response, null, 2));
    });
  }

    /**
   * Delete a product
   * DELETE /products/{productId}
   */
    deleteProduct(productId: string): void {
      this.http.delete<void>(`${this.apiUrl}/${productId}`).subscribe((response)=>{
        console.log(`Product ${productId} deleted`);
        this.getAllProducts();
      });
    }


  /**
   * Create a new product
   * POST /products
   */
  addProduct(product: Product): void {
    console.log('Product added:', product);
    this.http.post<Product>(this.apiUrl, product).pipe(take(1)).subscribe((response)=>{
      console.log('Product successfully added', response);
      this.getAllProducts();
    });
  }


  /**
   * Cleanup method to prevent memory leaks
   * Called when the service is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}




