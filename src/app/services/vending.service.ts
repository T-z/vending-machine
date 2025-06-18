import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { catchError, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { Balance, CoinOption, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendingService implements OnDestroy{
  private apiUrl = '/api/vendingmachine';
  http = inject(HttpClient);

  private destroy$ = new Subject<void>();

  currentBalance = signal<Balance>({"amount": 0.00});

  constructor() {
    this.getBalance();
  }

   /**
   * Insert a coin into the vending machine
   * POST /vendingmachine/coin
   * @param amount The amount of the coin to insert
   */
   insertCoin(params: CoinOption): void {
     this.http.post<Balance>(`${this.apiUrl}/coin`, { coin:params.dtoValue }).pipe(takeUntil(this.destroy$),).subscribe((response)=>{
      this.currentBalance.set(response);
    });
  }

    /**
   * Reset the current amount in the machine to 0
   * DELETE /vendingmachine/coin
   */
    resetAmount() {
      this.http.delete<void>(`${this.apiUrl}/coin`).pipe(take(1),
    ).subscribe({
        next: (response) => {
          this.currentBalance.set({"amount": 0.00});
        },
        error: (error) => {
          console.error('Error resetting amount:', error);
        }
      })
    }

    /**
   * Buy a product from the vending machine
   * GET /vendingmachine/product/{productId}
   * @param productId The ID of the product to buy
   */
  buyProduct(productId: string):Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/product/${productId}`);
  }

  /**
   * Get the current balance of the vending machine
   * GET /vendingmachine/balance
   */
  getBalance() {
    this.http.get<Balance>(`${this.apiUrl}/balance`).pipe(
      takeUntil(this.destroy$),
      tap((response) => {
        // Check if response is a valid Balance object
        if (response &&  typeof response === 'object' &&  'amount' in response) {
          this.currentBalance.set(response);
        }
      }),
      catchError((error) => {
        console.error('Error fetching balance:', error);
        return of(null);
      })
    ).subscribe((response) => {
      console.log("TOP");
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
