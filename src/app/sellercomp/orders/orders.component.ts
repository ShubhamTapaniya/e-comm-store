import { Component, computed, inject, signal } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { AddtocartService } from '../../services/addtocart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  sellerservice = inject(SellerService);
  cartservice = inject(AddtocartService);
  orders:any[] = [];
  ngOnInit(){
    this.load_orders();
    localStorage.setItem('total_orders', '0');//once user sees it shold not be shown again
    this.sellerservice.total_orders.set(0);//once user sees it shold not be shown again
  }
  load_orders(){
    this.sellerservice.get_orders().subscribe((data:any)=>{
      this.orders = data;
    })
  }
}
