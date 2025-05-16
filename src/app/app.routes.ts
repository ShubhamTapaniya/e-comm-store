import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './layouts/user/user.component';
import { SellerComponent } from './components/seller-login/seller-login.component';
import { SellerlayoutComponent } from './layouts/sellerlayout/sellerlayout.component';
import { DashbordComponent } from './sellercomp/dashbord/dashbord.component'
import { AuthGuard } from './guard/seller-guard/auth.guard';
import { userAuthGuard } from './guard/user-guard/user-auth.guard';
import { protectorGuard } from './guard/protector.guard';


export const routes: Routes = [
    {
        path: '',
        component: UserComponent,//user-layout
        children: [
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: 'shop', loadComponent: () => import('./components/shop/shop.component').then(c => c.ShopComponent) },
          { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(c => c.ContactComponent) },
          { path: 'about', loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent) },
          { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
          { path: 'search/:query', loadComponent: () => import('./components/search/search.component').then(c => c.SearchComponent) },
          { path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(c => c.CheckoutComponent) ,canActivate:[userAuthGuard,protectorGuard]},
          { path: 'payment', loadComponent: () => import('./components/payment/payment.component').then(c => c.PaymentComponent) ,canActivate:[userAuthGuard,protectorGuard]},
          { path: 'login', loadComponent: () => import('./components/login-register/login-register.component').then(c => c.LoginRegisterComponent) },
          {path:'placeorder',loadComponent:()=>import('./components/placeorder/placeorder.component').then((c)=>c.PlaceorderComponent),canActivate:[userAuthGuard,protectorGuard]},
          {path:'orders',loadComponent:()=>import('./components/order-list/order-list.component').then((c)=>c.OrderListComponent),canActivate:[userAuthGuard]},
          {path:'track-order/:id',loadComponent:()=>import('./components/track-order/track-order.component').then((c)=>c.TrackOrderComponent),canActivate:[userAuthGuard]}
        ]
    },
    {path: 'seller',
      component: SellerlayoutComponent,//seller-layout
      children : [
        { path: '',component:DashbordComponent ,canActivate : [AuthGuard]},
        { path: 'dashbord', loadComponent:()=>import('./sellercomp/dashbord/dashbord.component').then((c)=>c.DashbordComponent),canActivate : [AuthGuard]},
        { path: 'products', loadComponent:()=>import('./sellercomp/products-list/products-list.component').then((c)=>c.ProductsListComponent),canActivate : [AuthGuard]},
        { path: 'orders', loadComponent:()=>import('./sellercomp/orders/orders.component').then((c)=>c.OrdersComponent),canActivate : [AuthGuard]},
        { path: 'add-product', loadComponent:()=>import('./sellercomp/addproduct/addproduct.component').then((c)=>c.AddproductComponent),canActivate : [AuthGuard]},
        { path: 'products/update-product/:id', loadComponent:()=>import('./sellercomp/update-product/update-product.component').then((c)=>c.UpdateProductComponent),canActivate : [AuthGuard]},
        { path : 'orders/order-action/:id', loadComponent:()=>import('./sellercomp/order-action/order-action.component').then((c)=>c.OrderActionComponent),canActivate : [AuthGuard] }
      ]
    },
    {path:'seller-login',component:SellerComponent},//seller-login
    { path: '**', component: PageNotFoundComponent }
];
