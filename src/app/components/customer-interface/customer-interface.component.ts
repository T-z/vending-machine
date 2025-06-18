import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VendingMaschineComponent } from '../vending-maschine/vending-maschine.component';
import { WalletComponent } from '../wallet/wallet.component';

@Component({
  selector: 'app-customer-interface',
  imports: [CommonModule,VendingMaschineComponent,WalletComponent],
  templateUrl: './customer-interface.component.html',
  styleUrl: './customer-interface.component.scss'
})
export class CustomerInterfaceComponent {

}
