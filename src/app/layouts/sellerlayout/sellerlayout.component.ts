import { Component, effect, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { SellerService } from '../../services/seller.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sellerlayout',
  imports: [RouterLink,RouterLinkActive,RouterOutlet,NgIf],
  templateUrl: './sellerlayout.component.html',
  styleUrl: './sellerlayout.component.css'
})
export class SellerlayoutComponent {
  constructor(private router: Router) {}
  userservice = inject(UserAuthService);
  sellerservice = inject(SellerService);
  total_orders = this.sellerservice.total_orders; // ✅ direct reactive reference
  ngOnInit(){
    let temp = JSON.stringify(localStorage.getItem('sellerloginkey'));
    this.userservice.sellername = JSON.parse(temp);
    // Listen for changes in localStorage
    window.addEventListener('storage', (event) => {
      // console.log(event);
      if (event.key === 'total_orders') {
        const count = parseInt(event.newValue || '0');
        this.total_orders.set(count);
      }
    });
  }
  logout() {
    localStorage.removeItem('sellerloginkey');
    this.router.navigate(['/home']);
  } 
}
