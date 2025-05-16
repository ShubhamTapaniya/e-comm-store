import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-action',
  imports: [FormsModule],
  templateUrl: './order-action.component.html',
  styleUrl: './order-action.component.css'
})

export class OrderActionComponent {
  activeroute = inject(ActivatedRoute);
  sellerservice = inject(SellerService);
  router = inject(Router);
  id= 0;
  date = '';
  userid!:string | null;
  today = '';
  ngOnInit(){
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    this.show_order();
    this.userid = localStorage.getItem('userid');
  }
  update_status = {
    name : '',
    email : '',
    phone: 0,
    orderid : 0,
    payment_mode: "",
    final_checkout_price: 0,
    orderdate : '',
    date: ''
  };
  orderstatus='';
  cart_data = [{
    product_title: '',
    product_quantity: 0,
    product_image: ''
  }];
  show_order(){
    this.activeroute.params.subscribe((res)=>{
      this.id = res['id'];
      this.sellerservice.find_order(this.id).subscribe((data:any)=>{
        this.update_status.name = data.name;
        this.update_status.email = data.email;
        this.update_status.phone = data.phone;
        this.update_status.orderid = data.orderid;
        this.update_status.orderdate =data.orderdate;
        this.update_status.payment_mode = data.payment_mode;
        this.update_status.final_checkout_price = data.final_checkout_price;
        this.cart_data = data.cart;
        if(data.delivery_date !== ''){
          this.update_status.date = data.delivery_date;
        }
      })
    })
  }
  updateStatus(){
    
    if(confirm(`set order status to ${this.orderstatus} & delivery date to ${this.date} ?`)){
      this.sellerservice.update_status(this.id,{...this.update_status,cart: this.cart_data,order_status : this.orderstatus,delivery_date:this.date,userid : this.userid}).subscribe(()=>{
        this.show_order();
      });
      this.router.navigate(['seller/orders']);
    }
  }
}
