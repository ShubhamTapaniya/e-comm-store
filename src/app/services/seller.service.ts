import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  constructor(private http:HttpClient) { }
  addproduct(product:any):Observable<object>{
    return this.http.post('http://localhost:3000/products',product);
  }
  removeproduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  updateproduct(id:number,product:any){
    return this.http.put(`http://localhost:3000/products/${id}`,product);
  }
  getproduct(id:number){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  create_orders(cart:any):Observable<object>{
    return this.http.post('http://localhost:3000/orders',cart);
  }
  get_orders():Observable<object>{
    return this.http.get('http://localhost:3000/orders');
  }
  put_order(order:any){
    return this.http.put('http://localhost:3000/orders',order);
  }
  find_order(id:number){
    return this.http.get(`http://localhost:3000/orders/${id}`);
  }
  update_status(id:number,order:any){//update order status date and replace with old order obj
    return this.http.put(`http://localhost:3000/orders/${id}`,order);
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
