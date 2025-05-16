import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {
  activeroute = inject(ActivatedRoute);
  sellerservice = inject(SellerService);
  route = inject(Router);
  order = {
    delivery_date: '',
    email: '',
    final_checkout_price: 0,
    id: 0,
    name: '',
    order_status: '',
    orderdate: '',
    orderid: 0,
    payment_mode: '',
    phone: '',
    userid: '',
    cart:[{
      product_title:'',
      product_quantity:0,
      product_image:''
    }]
  };
  total_products:any = 0;
  getProgressPercent(status: string): number {
    switch (status) {
      case '': return 0;
      case 'Packed': return 38;
      case 'Shipped': return 63;
      case 'Delivered': return 100;
      default: return 0;
    }
  }
  ngOnInit(){
    this.activeroute.params.subscribe(params=>{
      let orderid = params['id'];
      this.sellerservice.find_order(orderid).subscribe((data:any)=>{
        this.order = {...data};//assign evrything
        this.total_products = this.order.cart.reduce((sum, o) => sum + o.product_quantity, 0);//total products
      })
    })
  }
  back(){
    this.route.navigate(['/orders']);
  }
}
