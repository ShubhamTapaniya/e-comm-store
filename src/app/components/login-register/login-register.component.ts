import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { AddtocartService } from '../../services/addtocart.service';

@Component({
  selector: 'app-login-register',
  imports: [FormsModule,NgIf],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  constructor(private router:Router){}
  private userservice= inject(UserAuthService);
  userobj:any={
    name:'',
    email:'',
    password:''
  }
  ngOnInit(){
    this.usershowdiv.set(true);
  }
  @ViewChild('register') signupBtn!: ElementRef;
  @ViewChild('login') loginBtn!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('loginhide') loginhide!:ElementRef;
  ngAfterViewInit() {
    if (this.signupBtn && this.loginBtn && this.container) {
      this.signupBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.add('active');
      });
      this.loginBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.remove('active');
      });
    }
  }
  signup(data:any){
    this.userservice.usergetapi().subscribe((res:any)=>{
      const matchobj = res.find((user:any)=>user.email.toLowerCase() === data.email.trim().toLowerCase());
      if(!matchobj){
        this.userservice.userpostapi(this.userobj).subscribe(()=>{
          this.container.nativeElement.classList.remove('active');//if user actually creted then only it should toggle
          const inputs = this.container.nativeElement.querySelectorAll('input');
          inputs.forEach((input: HTMLInputElement) => input.value = '');
        });//send data to DB
      }else{
        alert('Email already exists');
      }
    });
  }
  signin(email:string,password:string){
    this.userservice.usergetapi().subscribe((data:any)=>{
      const matchobj = data.find((user:any)=>user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password.trim());
      if(matchobj){
        this.userservice.username_set(matchobj);
        localStorage.setItem('userloginkey',matchobj.name);
        localStorage.setItem('userid',matchobj.id);
        this.router.navigate(["/home"]);
      }else{
        alert('invalid credentials');
      }
    })
  }
  usershowdiv = this.userservice.usershowdivservice;
  loginhidefunc(){
      this.usershowdiv.set(false);
      this.router.navigate(['/home']);
  }
  pass_show = false;
  password_hide_show_toggle(){
    this.pass_show = !this.pass_show;
  }
}