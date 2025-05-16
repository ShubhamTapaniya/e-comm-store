import { Component, computed, inject, Query, signal, Signal } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddtocartService } from '../../services/addtocart.service';
import { ToastService } from '../../services/toster.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-search',
  imports: [ToasterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  userservice=inject(UserAuthService);
  private router = inject(Router);
  private cartservice = inject(AddtocartService);
  private toast = inject(ToastService);
  activeroute = inject(ActivatedRoute);

  result_products = this.userservice.search_products_data;
  current_search: string = '';
  ngOnInit() {
    this.activeroute.params.subscribe(params => {
      this.current_search = params['query'];//continues to listen for changes to the route parameters even after ngOnInit() has run.
      this.userservice.search_products_service(this.current_search).subscribe((result) => {
        this.userservice.search_products_data.set(result);
      });
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
