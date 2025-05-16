import { Component, inject } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { AutoSliderComponent } from '../auto-slider/auto-slider.component';
import { AddtocartService } from '../../services/addtocart.service';
import { NgIf } from '@angular/common';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToastService } from '../../services/toster.service';
import { ScellyComponent } from '../scelly/scelly.component';

@Component({
  selector: 'app-home',
  imports: [AutoSliderComponent,RouterLink,ToasterComponent,ScellyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private userservice= inject (UserAuthService);
  private router =inject(Router);
  private cartservice = inject(AddtocartService);
  private toast= inject(ToastService);
  products:any;
  top_products:any=[];
  ngOnInit(){
    this.userservice.productsgetapi().subscribe((data)=>{
      this.products = data;
      for(let product of this.products){
        if(product.rating.rate > 4.6){
          this.top_products.push(product);
        }
      }
    }); 
  }
  cards=[
    {icon:"bx bxs-truck",boldtext:"Free Shipping",lighttext:"Get tour orders delivered with no extera cost"},
    {icon:"bx bx-support",boldtext:"Support 24/7",lighttext:"We are here to assist you any time"},
    {icon:"bx bx-rupee",boldtext:"100% Money back",lighttext:"Full refund if you are not satisfied"},
    {icon:"bx bxs-lock",boldtext:"Payment Secure",lighttext:"Your payment info is safe with us"},
    {icon:"bx bxs-discount",boldtext:"Discount",lighttext:"Enjoy the best prices on our product"},
  ]
  search_value(val:string){//from man women and kids cards also
    this.router.navigate([`/search/${val}`]);
    this.userservice.current_path.set(`/search/${val}`);
    this.userservice.search_products_service(val).subscribe((result)=>{
      this.userservice.search_products_data.set(result);
    });
  }        
  addtocart(product: any) {
    this.cartservice.get_cart().subscribe((cart: any[]) => {
      const isAlreadyInCart = cart.find(item => item.id === product.id);
      if (isAlreadyInCart) {
        this.toast.show("⚠️ Already Added to Cart");
      } else {
        this.cartservice.post_cart(product).subscribe(() => {//only post when product is not added
          this.cartservice.total_products.set(this.cartservice.total_products() + 1);
          this.toast.show("✅ Added to Cart");
        });
      }
    });
  }
}
