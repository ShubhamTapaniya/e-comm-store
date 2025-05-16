import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  private http = inject(HttpClient);
  orderid:number = 123;

  constructor(){
    const storedOrderId = localStorage.getItem('orderid');
    if (storedOrderId) {
      this.orderid = +storedOrderId; // Convert string to number and set currentid to newid
    } else {
      localStorage.setItem('orderid', this.orderid.toString());
    }
  }
  incrementOrderId() {
    this.orderid += 1;
    localStorage.setItem('orderid', this.orderid.toString());
  }
  getOrderId() {
    return this.orderid;
  }
  post_cart(product:any){
    return this.http.post('https://ecomm-json-server.onrender.com/cart',{...product,quantity : 1,subtotal: product.price,total_amount:0});
  }
  get_cart(){
    return this.http.get<any[]>('https://ecomm-json-server.onrender.com/cart');
  }
  remove_cart(id:number){
    return this.http.delete(`https://ecomm-json-server.onrender.com/cart/${id}`);
  }
  change_quantity_subtotal(product: any){
    return this.http.put(`https://ecomm-json-server.onrender.com/cart/${product.id}`, product);
  } 
  product_cart:any = []; 
  total_products = signal(0);
  clear_cart(){
    this.get_cart().subscribe((products:any)=>{
      for(let product of products){
        this.remove_cart(product.id).subscribe();
      }
    })
  }
  checkout_data = {
      name:'',
      email:'',
      phone: '',
      address:'',
      city:'',
      zipcode: '',
      paymentmode: '',
  };
  the_final_price = 0;

  reduce_quantity(product :any){
    return this.http.patch(`https://ecomm-json-server.onrender.com/products/${product.id}`, { 'stock': product.stock });
  }
  // post_payment_data(paymentData:any){
  //   return this.http.post('http://localhost:3000/payments', paymentData);
  // }
}