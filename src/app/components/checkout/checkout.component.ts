import { Component, inject, NgModule, signal } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  payment_method = '';
  cartservice = inject(AddtocartService);
  router = inject(Router);
  userservice = inject(UserAuthService);
  billing_info = signal(false);
  shipping_info = signal(false);
  payment_mode = signal(false);
  payment_mode_card = signal(true);
  order_summary_obj:any[] = [];
  net_price = 0;
  discount = 0.33;
  the_final_price!:string | null;
  checkout_details ={
    name:'',
    email:'',
    phone: '',
    address:'',
    city:'',
    zipcode: '',
    paymentmode: ''
  }
  ngOnInit(){
    this.load_order_summary();
    let final_price = sessionStorage.getItem('final_price');
    this.the_final_price = final_price;
  }
  toggleSection(section: 'billing' | 'shipping' | 'payment') {
    switch (section) {
      case 'billing':
        this.billing_info.set(!this.billing_info());
        break;
      case 'shipping':
        this.shipping_info.set(!this.shipping_info());
        break;
      case 'payment':
        this.payment_mode.set(!this.payment_mode());
        break;
    }
  }
  load_order_summary(){
    this.cartservice.get_cart().subscribe((data)=>{
      this.order_summary_obj = data;
      for(let product of this.order_summary_obj){
        this.net_price += product.subtotal;
      }
    })
  }
  to_navigate(){
    this.cartservice.checkout_data =this.checkout_details;
    if(this.checkout_details.name && this.checkout_details.address && this.checkout_details.paymentmode){
      if(this.checkout_details.paymentmode === 'card'){
        this.router.navigate(['/payment']);
      }else if(this.checkout_details.paymentmode === 'cash'){
        this.router.navigate(['/placeorder']);
      }
    }
  }
}
