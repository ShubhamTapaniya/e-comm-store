import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private http:HttpClient){}

  
  userpostapi(data:any){
    return this.http.post('http://localhost:3000/userdata',data);
  }
  
  usergetapi(){
    return this.http.get('http://localhost:3000/userdata');
  }

  adminpostapi(data:any){
    return this.http.post('http://localhost:3000/admindata',data);
  }
  
  admingetapi(){
    return this.http.get('http://localhost:3000/admindata');
  }

  getcategoryapi(){
    return this.http.get('http://localhost:3000/categories');
  }
  isLoggedin = signal<boolean>(false);
  username = '';
  sellername = '';
  username_set(data:any){
    this.username = (data.name);
    this.isLoggedin.set(true);
  }
  logoutservice(){
    this.isLoggedin.set(false);
  }
  usershowdivservice = signal(false);
  adminshowdivservice = signal(false);
  productsgetapi(){
    return this.http.get('http://localhost:3000/products');
  }
  search_products_service(search:string){
    return this.http.get(`http://localhost:3000/products?title_like=${search}`);
    //only match in 'title'...if find in description write 'descreption_like'
  }
  delete_product(id:number){
    this.http.delete(`http://localhost:3000/products?id=${id}`);
  }
  get_product(id:number){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }
  get_product_title(title:string){
    return this.http.get(`http://localhost:3000/products?title=${title}`);
  }
  search_products_data = signal<any>([]);
  current_path = signal('');
  filter_products(val:string){
    if(val === 'men'){
      return this.http.get(`http://localhost:3000/products?category=${val}`);
    }else{
      return this.http.get(`http://localhost:3000/products?category_like=${val}`);
    }
  }
  filterbyprice(min:number,max:number){
    return this.http.get(`http://localhost:3000/products?price_gte=${min}&price_lte=${max}`);
  }
  apply_fiters(min:number,max:number,category:string,checkbox_val:number){
    let var1;
    let var2 = checkbox_val > 0 ? `&rating.rate_gte=${checkbox_val}` : '';
    if(category !== 'All'){
      var1 = category === 'men' ? `&category=${category}` : `&category_like=${category}`; 
    }else{
      var1 = '';
    }
    return this.http.get(`http://localhost:3000/products?price_gte=${min}&price_lte=${max}${var1}${var2}`);
  }
}
