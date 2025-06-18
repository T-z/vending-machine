import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { VendingService } from '../../services/vending.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vending-maschine',
  imports: [CommonModule],
  templateUrl: './vending-maschine.component.html',
  styleUrl: './vending-maschine.component.scss',
})
export class VendingMaschineComponent {
  productService = inject(ProductService);
  vendingService = inject(VendingService);

  products = computed(() => this.productService.products());
  balance = computed(() => this.vendingService.currentBalance());

  constructor() {}

  choice = '';
  errorMessage = '';

  keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['OK', 0, 'C'],
  ];

  onKeypadPress(key: any) {
    if (key === 'C') {
      this.choice = '';
      this.vendingService.resetAmount();
    }
    else if (key === 'OK') {
      // Check if a selection has been made
      if (!this.choice) {
        alert('Please select a product number first.');
        return;
      }
      const productIndex = parseInt(this.choice);

      // Check if the product number is valid
      if (
        isNaN(productIndex) ||
        productIndex < 0 ||
        productIndex >= this.products().length
      ) {
        alert(`Invalid product selection: ${this.choice}`);
        this.choice = '';
        return;
      }

      const product = this.products()[productIndex];

      if(product.price > this.balance().amount){
            alert( "not enough money for the goods")
      }

       // Try to buy the product
       this.vendingService.buyProduct(product.id as string).subscribe({
        next: (boughtProduct) => {
          // Success - show a success message
          alert(`Successfully purchased ${boughtProduct.name}!`);

        },
        error: (error: HttpErrorResponse) => {
          console.error('Error buying product:', error);

          if (error.status === 400) {
            if (error.error && error.error.errorMessage) {
              this.errorMessage = error.error.errorMessage;
            } else if (error.error && typeof error.error === 'object' && 'error' in error.error && error.error.error.errorMessage) {
              this.errorMessage = error.error.error.errorMessage;
            } else {
              // Try to extract the error message from the error object
              this.errorMessage = this.extractErrorMessage(error) || 'No more of this product left!';
            }
          } else {
            this.errorMessage = 'Failed to purchase product. Please try again.';
          }
          alert(this.errorMessage);
        }
      });

      // Clear the choice after attempting purchase
      this.choice = '';
    }
    else {
      this.choice += key;
    }

}



private extractErrorMessage(error: HttpErrorResponse): string | null {
  if (error.error) {
    if (typeof error.error === 'string') {
      return error.error;
    }

    if (typeof error.error === 'object') {
      // Try different common error message properties
      const possibleMessageProps = ['message', 'errorMessage', 'error', 'description'];

      for (const prop of possibleMessageProps) {
        if (error.error[prop]) {
          if (typeof error.error[prop] === 'string') {
            return error.error[prop];
          } else if (typeof error.error[prop] === 'object' && error.error[prop].message) {
            return error.error[prop].message;
          }
        }
      }
    }
  }

  // If we can't find a specific message, use the status text
  return error.statusText || null;
}

}



