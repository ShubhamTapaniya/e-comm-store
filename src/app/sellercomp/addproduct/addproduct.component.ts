import { Component, inject, NgModule } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  imports: [FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  sellerservice = inject(SellerService);
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
    }
  };
  
  submitProductForm() {
    this.product.image = (this.product.image).replace("C:\\fakepath\\","http://localhost:4200/assets/");
    this.sellerservice.addproduct(this.product).subscribe((response:any) => {
        alert('product added');
        this.resetForm();// Optionally reset form here
      },
      (error:any) => {
        console.error('Error adding product', error);
      }
    );
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
      }
    };
  }
  
}
