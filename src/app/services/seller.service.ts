import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  constructor(private http:HttpClient) { }
  addproduct(product:any):Observable<object>{
    return this.http.post('https://ecomm-json-server.onrender.com/products',product);
  }
  removeproduct(id:number){
    return this.http.delete(`https://ecomm-json-server.onrender.com/products/${id}`);
  }
  updateproduct(id:number,product:any){
    return this.http.put(`https://ecomm-json-server.onrender.com/products/${id}`,product);
  }
  getproduct(id:number){
    return this.http.get(`https://ecomm-json-server.onrender.com/products/${id}`);
  }
  create_orders(cart:any):Observable<object>{
    return this.http.post('https://ecomm-json-server.onrender.com/orders',cart);
  }
  get_orders():Observable<object>{
    return this.http.get('https://ecomm-json-server.onrender.com/orders');
  }
  put_order(order:any){
    return this.http.put('https://ecomm-json-server.onrender.com/orders',order);
  }
  find_order(id:number){
    return this.http.get(`https://ecomm-json-server.onrender.com/orders/${id}`);
  }
  update_status(id:number,order:any){//update order status date and replace with old order obj
    return this.http.patch(`https://ecomm-json-server.onrender.com/orders/${id}`,order);
  }
  data_to_seller = {};
  final_cart = {};
  total_orders = signal(0);
  incrementOrderCount() {
    const newCount = this.total_orders() + 1;
    this.total_orders.set(newCount);
    // Update localStorage to notify other tabs
    localStorage.setItem('total_orders', newCount.toString());
  }

  initializeOrderCount() {
    this.get_orders().subscribe((orders: any) => {
      const count = orders.length;
      this.total_orders.set(count);
      // Initialize localStorage with the current length of 
      localStorage.setItem('total_orders', count.toString());
    });
  }
}
