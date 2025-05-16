import { Component, computed, effect, ElementRef, inject, Signal, signal, ViewChild, viewChild} from '@angular/core';
import {ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { AddtocartService } from '../../services/addtocart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router,private activeroute:ActivatedRoute){}
  
  @ViewChild('search') Search_input_field!:ElementRef;
  
  private cartservice = inject(AddtocartService);
  private userservice=inject(UserAuthService);
  
  total_products = this.cartservice.total_products;
  isuserloggedin = this.userservice.isLoggedin;
  name = signal('');
  ngOnInit() {
    const user = localStorage.getItem('userloginkey');
    if (user) {
      this.name.set(user);
      this.isuserloggedin.set(true);
    } else {
      this.isuserloggedin.set(false);
    }
  }
  logout(){
    this.userservice.logoutservice();//set false
    localStorage.removeItem('userloginkey');
    localStorage.removeItem('userid');
    this.router.navigate(['/login']);
  }
  usershowdivchange(){
    this.userservice.usershowdivservice.set(true);
  }
  adminshowdivchange(){
    this.userservice.adminshowdivservice.set(true);
  }

  load_search_component(data:string){
    if(data){
      this.router.navigate([`/search/${data}`]);
    }else{
      this.userservice.search_products_data.set([]);//so that no product found image shows up
    }
  } 

  isfilled = signal(false);
  input_search_suggetion(data:string){
    if(data){
      this.isfilled.set(true);
    }else{
      this.clearSearch();
      this.isfilled = signal(false);
    }
  }
  clearSearch() {
    this.userservice.search_products_data.set([]); // Reset search results
    this.Search_input_field.nativeElement.value='';//clear input
    this.isfilled = signal(false);
  }
}