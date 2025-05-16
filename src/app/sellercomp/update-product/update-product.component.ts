import { Component, inject, signal } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  sellerservice = inject(SellerService);
  router = inject(Router);
  activeroute = inject(ActivatedRoute);
  product = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    stock: 0,
    rating: {
      rate: 0,
      count: 0
    },
    id : 0
  };
  ngOnInit(){
    this.activeroute.paramMap.subscribe((params)=>{
    this.product.id = Number(params.get('id'));
    if (!isNaN(this.product.id)){
      this.sellerservice.getproduct(this.product.id).subscribe((data: any) =>{
        this.product = data;
      });
    } else {
      console.error('Invalid product ID in route');
    }
    })
  }
  updateproduct() {
    this.sellerservice.updateproduct(this.product.id,this.product).subscribe(()=>{
      alert('product updated');
    })
    this.resetForm();
    this.router.navigate(['seller/products']);
  }
  
  resetForm() {
    this.product = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      stock: 0,
      rating: {
        rate: 0,
        count: 0
      },
      id: 0
    };
  }
  change_image = false;
  changeimage(){
    this.change_image = !(this.change_image);
  }
  ngOnDestroy(){
    this.resetForm();
  }
}
