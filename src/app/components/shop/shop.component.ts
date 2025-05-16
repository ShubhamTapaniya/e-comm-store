import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { AddtocartService } from '../../services/addtocart.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { ToastService } from '../../services/toster.service';
import { ScellyComponent } from '../scelly/scelly.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-shop',
  imports: [ToasterComponent,ScellyComponent,FormsModule,NgxSliderModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent {
  @ViewChild('loadmore_btn') loadmore_btn!:ElementRef;
  constructor(private userservice:UserAuthService,private router:Router,private cartservice:AddtocartService){}
  private toast = inject(ToastService);
  products:any=[];
  categories:any=[];
  temp:any[] = [];
  rating = 0;
  minprice = 1;
  maxprice = 1000;
  selectedMin: number = 1;
  selectedMax: number = 1000;

  sliderOptions: Options = {
    floor: this.minprice,
    ceil: this.maxprice,
    translate: (value: number): string => {
      return  value +  '$';
    }
  };
  applyPriceFilter() {
    this.userservice.apply_fiters(this.selectedMin, this.selectedMax, this.filter,this.rating).subscribe((data: any) => {
      this.products = data;
    });
  }

  change_checkbox(event: any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const values = Array.from(checkboxes).map((el: any) => +el.value);
    this.rating = values.length > 0 ? Math.min(...values) : 0;//map all checkbax values and find lowest of them
  }

  filter='All';
  change(){
    if(this.filter === 'All'){
      this.get_products();
    }
    else{
      this.userservice.filter_products(this.filter).subscribe((data:any)=>{
        this.products = data;
      })
    }
  }
  ngOnInit(){
    this.get_products();
    this.usecategory();
  }
  usecategory(){
    this.userservice.getcategoryapi().subscribe((data)=>{
      this.categories = data;
    })
  }
  get_products(){
    this.userservice.productsgetapi().subscribe((data)=>{
      this.products = data;
    });
  }
  loadingindex:number = 3;
  isloding = false;
  loadmore(){
    if(this.isloding) return;//prevent multiple clicks
      this.isloding = true;
      setTimeout(()=>{
        this.loadingindex += 3;
        this.isloding = false;
      },300);
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

  reset_filter() {
  // Reset filter values
  this.selectedMin = 1;
  this.selectedMax = 1000;
  this.filter = 'All';
  this.rating = 0;

  // Uncheck all rating checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb: any) => cb.checked = false);

  // Reload all products
  this.get_products();
}
}
