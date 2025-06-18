import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  dialog = inject(MatDialog);

  productService = inject(ProductService);

  products = computed(() => this.productService.products());

  addNewProduct(): void {
    console.log('Adding new product');
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.productService.addProduct(result);
      }
    });
  }

  viewProduct(productId: string): void {
    this.productService.getProduct(productId);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId);
    }
  }

}
