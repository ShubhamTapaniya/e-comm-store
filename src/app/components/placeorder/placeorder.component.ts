import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AddtocartService } from '../../services/addtocart.service';
import { SellerService } from '../../services/seller.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-placeorder',
  imports: [CommonModule],
  templateUrl: './placeorder.component.html',
  styleUrl: './placeorder.component.css'
})
export class PlaceorderComponent {
  router=inject(Router);
  cartservice =inject(AddtocartService);
  sellerservice = inject(SellerService);
  userservice = inject(UserAuthService);

  yyyy_mm_dd = '';
  checkout_data = {
    name:'',
    email:'',
    phone: '',
    address:'',
    city:'',
    zipcode: '',
    paymentmode: ''
  };
  data_to_seller ={
    name : '',
    email: '',
    phone : '',
    orderid : 0,
    payment_mode: '',
    final_checkout_price: 0,
    userid : '',
    orderdate: '',
    cart: [{}]
  }
  total_subtotal = 0;
  orderid:string = '';
  products:any[] = [];
  ngOnInit(){
    sessionStorage.removeItem('final_price');
    const temp = localStorage.getItem('userid');
    if(temp){
      this.data_to_seller.userid = temp;//set user id in evry order to track order
    }
    this.checkout_data = this.cartservice.checkout_data;
    this.cart_data();
    this.setter();//set all values which are coming from checkout and send to data_to_seller and to seller service(after that send to seller also)
    let today = new Date();
    this.yyyy_mm_dd = today.toISOString().slice(0, 10); // "2025-05-11"
    this.data_to_seller.orderdate = this.yyyy_mm_dd;//set delivery date
  }
  cart_data(){
    this.cartservice.get_cart().subscribe((data:any)=>{
      this.products = data;
      // this.data_to_seller.cart = data;//send cart data data_to_seller
      for(let product of this.products){
        this.total_subtotal = this.total_subtotal + product.subtotal;
      }
      this.data_to_seller.cart = this.products.map((product)=>{// dont send whole cart instead only send usefull info
        return {product_title : product.title,product_quantity : product.quantity,product_image :product.image};
      });
      if(this.data_to_seller.cart.length > 0 && this.data_to_seller.final_checkout_price > 0){// ✅ successfull order
        this.sellerservice.create_orders(this.data_to_seller).subscribe();//send data to orders page
        this.cartservice.incrementOrderId();//increse orderid
        this.sellerservice.incrementOrderCount();// Increment the order count signal
        this.cartservice.clear_cart();//clear cart 
        this.subtract_quantity();//decrese quantity
      }else if(this.data_to_seller.final_checkout_price === 0){
        this.router.navigate(['/cart']);
      }
    });
  }

  setter(){
    this.data_to_seller.name = this.checkout_data.name;
    this.data_to_seller.email = this.checkout_data.email;
    this.data_to_seller.phone = this.checkout_data.phone;
    this.data_to_seller.orderid = this.cartservice.orderid;
    this.data_to_seller.payment_mode = this.checkout_data.paymentmode;
    this.data_to_seller.final_checkout_price = this.cartservice.the_final_price;
  }

  subtract_quantity(){
    this.cartservice.get_cart().subscribe((cart:any[])=>{
      cart.forEach(single_product => {//reduce quantity by for loop of all cart products
        this.userservice.get_product(single_product.id).subscribe((original_product_array:any)=>{
          original_product_array.stock = original_product_array.stock - single_product.quantity;
          if(original_product_array.stock < 0){
            console.log(`not enought stock for ${single_product.title}`);
          }else{
            this.cartservice.reduce_quantity(original_product_array).subscribe(()=>console.log('quantity reduced'));
          }
        });
      })
    })
  }

  to_navigate(){
    this.router.navigate(['/home']);
  }

}
