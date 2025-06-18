import { Component, inject } from '@angular/core';
import { VendingService } from '../../services/vending.service';
import { CommonModule } from '@angular/common';
import { CoinOption } from '../../models';

@Component({
  selector: 'app-wallet',
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  vendingService = inject(VendingService);

  coins: CoinOption[] = [
    { value: 0.10, dtoValue: 'TEN_RAPPEN' },
    { value: 0.20, dtoValue: 'TWENTY_RAPPEN' },
    { value: 0.50, dtoValue: 'FIFTY_RAPPEN' },
    { value: 1.00, dtoValue: 'ONE_CHF' },
    { value: 2.00, dtoValue: 'TWO_CHF' }
  ];

  insertCoin(index: number) {
    this.vendingService.insertCoin(this.coins[index]);
  }

}
