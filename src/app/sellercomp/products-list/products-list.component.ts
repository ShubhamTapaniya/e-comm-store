import { Component, inject } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  userservice = inject(UserAuthService);
  sellerservice = inject(SellerService);
  router = inject(Router);
  products:any[] = [];
  update_product = {};
  ngOnInit(){
    this.loadproducts();
  }
  loadproducts(){
    this.userservice.productsgetapi().subscribe((data:any)=>{
      this.products = data;
    })
  }
  remove_product(id:number){
    if(confirm('Do you want to remove product')){
      this.sellerservice.removeproduct(id).subscribe(()=>{
        console.log('products removed');
        this.loadproducts();
      });
    }
  }
  // edit_product(id:number){
  //   this.sellerservice.updateproduct(id,updatedproduct).subscribe((data:any)=>{
  //     this.update_product = data;
  //   });
  // }

}
