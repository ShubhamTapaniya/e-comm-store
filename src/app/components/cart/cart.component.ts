import { Component, inject, signal } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToastService } from '../../services/toster.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,ToasterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartservice = inject(AddtocartService);
  userservice = inject(UserAuthService);
  router = inject(Router);
  tosterservice = inject(ToastService);
  product_cart:any = [];
  final_cart_object ={
    total_items : 0,
    address : '',
    total_price : 0,
    discount : 0.33
  };
  the_final_price = 0;
  ngOnInit(){
    this.loadcart();
  }
  loadcart(){
    this.cartservice.get_cart().subscribe((data)=>{
      this.product_cart = data;//product_cart array getting products
      this.final_cart_object.total_items = this.total_products;//initially items will be total products
      this.cartservice.total_products.set(0); //user entred to cart then dont show badge
      this.product_cart.forEach((product:any) => {//changing subtotal for all
        product.subtotal = product.price * product.quantity;
      });
      this.total_price;
      this.the_final_price = this.total_price;//initially final price will be total price
    });
  }
  remove_cart(id:number){
    this.cartservice.remove_cart(id).subscribe();
    this.loadcart();
  }
  get total_products(){
    return (this.final_cart_object.total_items = this.product_cart.reduce((acc:number, product:any) => {return acc + product.quantity}, 0))//find total products in cart
  }
  get total_price(){
    return (this.final_cart_object.total_price = this.product_cart.reduce((acc:number, product:any) => {return acc + product.subtotal}, 0))//find price products
  }
  
  addbtn(product: any, quantity: number) {
    const updatedQty = quantity + 1;
    const updatedProduct = {
      ...product,
      quantity: updatedQty,
      subtotal: product.price * updatedQty
    };
    this.cartservice.change_quantity_subtotal(updatedProduct).subscribe(() => {//update in database
      const index = this.product_cart.findIndex((p:any)=> p.id === product.id);
      if (index !== -1) {
        this.product_cart[index] = updatedProduct;
        this.total_products;//change total products
        this.total_price;//change total price
        if(!this.show_discount()){
          this.the_final_price = this.total_price;
        }else{
          this.the_final_price = this.total_price - this.total_price*this.final_cart_object.discount;
        }
      }
    });
  }
  
  minusbtn(product: any, quantity: number) {
    if (quantity > 1) {
      const updatedQty = quantity - 1;
      const updatedProduct = {
        ...product,
        quantity: updatedQty,
        subtotal: product.price * updatedQty
      };
      this.cartservice.change_quantity_subtotal(updatedProduct).subscribe(() => {
        const index = this.product_cart.findIndex((p:any) => p.id === product.id);
        if (index !== -1) {
          this.product_cart[index] = updatedProduct;
          this.total_products;//change total products
          this.total_price;//change total price
          if(!this.show_discount()){
            this.the_final_price = this.total_price;
          }else{
            this.the_final_price = this.total_price - this.total_price*this.final_cart_object.discount;
          }
        }
      });
    } else {
      this.remove_cart(product.id);
    }
  }

  is_address_changed = signal(false);
  change_address(){
    const newAddress = prompt("Enter your shipping address:");
    if (newAddress && newAddress.trim().length > 0) {
      this.final_cart_object.address = newAddress.trim();
      this.is_address_changed.set(true);
    } else {
      console.log("Address update canceled or invalid.");
    }
  }
  show_discount = signal(false);
  showdiscount(){
    if(!this.show_discount()){
      this.show_discount.set(true);
      this.the_final_price = this.total_price - this.total_price*this.final_cart_object.discount;
    }else{
      this.show_discount.set(false);
      this.the_final_price = this.total_price;
    }
  }
  clear_cart(){
    this.product_cart.forEach((product :any) => {
      this.remove_cart(product.id);
    });
  }
  is_product_found = true;
  bool_arr:any[] = [];
  to_navigate() {
    this.bool_arr = [];//reset map
    this.cartservice.get_cart().subscribe((cart: any[]) => {
      let pending_products = cart.length;//total products in cart
      cart.forEach(single_product => {
        this.userservice.get_product(single_product.id).subscribe((original_product_array: any) => {
          original_product_array.stock = original_product_array.stock - single_product.quantity;
          if (original_product_array.stock < 0) { // ✅ strictly less than 0
            this.bool_arr.push(false);
          }else{
            this.bool_arr.push(true);
          }
          pending_products--;
          if (pending_products === 0) {//check at last itration(means after all products being checked)
            if (!this.bool_arr.includes(false)) {
              this.router.navigate(['/checkout']);
              this.cartservice.the_final_price = this.the_final_price;
              sessionStorage.setItem('final_price', this.the_final_price.toPrecision(4));
            } else {
              this.router.navigate(['/cart']);
            }
          }
        });
      });
    });
  }  
}
