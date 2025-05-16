import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller',
  imports: [FormsModule,NgIf],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.css'
})
export class SellerComponent {
  constructor(private router:Router){}
  private userservice= inject(UserAuthService);
  adminobj:any={
    name:'',
    email:'',
    password:''
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

  ngOnInit(){
    this.adminshowdiv.set(true);
  }

  signup(data:any){
    this.userservice.admingetapi().subscribe((res:any)=>{
      const matchobj = res.find((user:any)=>user.email.toLowerCase() === data.email.trim().toLowerCase());
      if(!matchobj){
        this.userservice.adminpostapi(this.adminobj).subscribe(()=>{
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
    this.userservice.admingetapi().subscribe((data:any)=>{
      const matchobj = data.find((user:any)=>user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password.trim());
      if(matchobj){
        this.userservice.sellername = matchobj.name;
        localStorage.setItem('sellerloginkey',matchobj.name);
        this.router.navigateByUrl('/seller');
      }else{
        alert('invalid credentials');
      }
    })
  }
  adminshowdiv = this.userservice.adminshowdivservice;
  loginhidefunc(){
      this.adminshowdiv.set(false);
      this.router.navigate(['/home']);
  }
  pass_show = false;
  password_hide_show_toggle(){
    this.pass_show = !this.pass_show;
  }
}
