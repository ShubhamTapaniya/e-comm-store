import { Component, inject } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  sellerservice=inject(SellerService);
  orders:any[] = [];
  userservice = inject(UserAuthService);
  router = inject(Router);
  // ngOnInit(){
  //   this.load_orders();
  // }
  // load_orders(){
  //   this.sellerservice.get_orders().subscribe((data:any)=>{//data is array of object
  //     this.orders = data;
  //     // console.log(this.orders);
  //   })
  // }
  totalOrders = 0;
  totalRevenue = 0;
  pendingOrders = 0;
  completedOrders = 0;
  orderstatus = 'All';
  ngOnInit() {
    this.sellerservice.get_orders().subscribe((orders: any) => {
      this.orders = orders;
      this.totalOrders = orders.length;
      this.totalRevenue = orders.filter((o:any) => o.order_status === 'Delivered').reduce((sum :any, o :any) => sum + o.final_checkout_price, 0);
      this.pendingOrders = orders.filter((o:any) => o.order_status !== 'Delivered' && o.order_status !== 'Cancelled' ).length;
      this.completedOrders = orders.filter((o:any) => o.order_status === 'Delivered').length;
    });
    this.low_stocks();
  }
  loadorderstatus() {
    this.sellerservice.get_orders().subscribe((orders: any) => {
      if (this.orderstatus === 'without_action') {
        this.orders = orders.filter((o: any) => !o.order_status);//orders who does not have order_status properties
      } else if (this.orderstatus === 'All') {
        this.orders = orders;
      } else {
        this.orders = orders.filter((o: any) => o.order_status === this.orderstatus);
      }
    });
  }
  low_stock_products: any[] = [];

  low_stocks() {
    this.userservice.productsgetapi().subscribe((data: any) => {
      this.low_stock_products = data.filter((product : any) => product.stock <= 5);
    }, (error) => {
      console.error('Failed to load products', error);
    });
  }
  update_stock(id:number){
    this.router.navigate([`seller/products/update-product/${id}`]);
  }
}
