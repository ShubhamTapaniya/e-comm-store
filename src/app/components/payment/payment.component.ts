import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { AddtocartService } from '../../services/addtocart.service';
import { loadStripe } from '@stripe/stripe-js';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToastService } from '../../services/toster.service';

@Component({
  selector: 'app-payment',
  imports: [ToasterComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent {

  @ViewChild('paymentref', { static: true }) paydiv!:ElementRef;
  tosterservice =inject(ToastService);
  router = inject(Router);
  cartservice= inject(AddtocartService);
  final_price = sessionStorage.getItem('final_price');
  transectionid = '';
  ngOnInit(){
    window.paypal.Buttons(
      {
        style:{
          layout: 'vertical',      // vertical | horizontal
          color: 'blue',           // gold | blue | silver | black | white
          label: 'paypal',         // paypal | checkout | pay | buynow | installment
          height: 45               // Button height in px (min: 25, max: 55)
        },
        createOrder : (data:any,actions:any)=>{
          return actions.order.create({
            purchase_units: [
              {
                amount:{
                  value: this.final_price,
                  currency_code:'USD'
                }
              }
            ]
          })
        },
        onApprove: (data:any,actions:any)=>{
          return actions.order.capture().then((details:any)=>{
                if (details.status === 'COMPLETED') {
                this.transectionid = details.id;
                this.tosterservice.show(`✅ payment successful!...your transaction id:'${this.transectionid}`);
                setTimeout(() => {
                  this.to_navigate();
                }, 3000);
              }
          })
        },
        onError : (error:any)=>{
          console.log(error);
        }
      }
    ).render(this.paydiv.nativeElement);
  }
  to_navigate(){
    this.router.navigate(['/placeorder']);
  }
  to_checkout(){
    this.router.navigate(['/checkout']);
  }
}
