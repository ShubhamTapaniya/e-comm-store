import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  cartservice = inject(AddtocartService);
  sellerservice = inject(SellerService);
  userservice = inject(UserAuthService);
  router = inject(Router);
  
  re_order_cart = [];
  total_items:number[] = [];
  order_list:any[] = [];
  ngOnInit(){
    this.get_orders();
  }
  
  get_orders(){
    this.sellerservice.get_orders().subscribe((data:any)=>{
      const match_orders = data;
      const userid = localStorage.getItem('userid');
      this.order_list = match_orders.filter((o:any)=>o.userid === userid);//only allow that order which are order by current loggedin user
      
      for(let order of this.order_list){
        let total_quntity = 0;
        for(let item of order.cart){
          total_quntity = total_quntity + (item.product_quantity);
        }
        this.total_items.push(total_quntity);
      }
    })
  }
  re_order(orderid:number){
    this.sellerservice.find_order(orderid).subscribe((result:any)=>{
      this.re_order_cart = result.cart;
      this.userservice.productsgetapi().subscribe((products:any)=>{
        this.re_order_cart.map((obj:any)=>{
            for(let product of products){
              if(obj.product_title === product.title){
                this.cartservice.post_cart(product).subscribe();//only allowing product that matches with old order products
              }
            }
        })
        this.router.navigate(['/cart']);
      });
    })
  }
  track_order(orderid:number){
    this.router.navigate([`track-order/${orderid}`]);
  }
}
