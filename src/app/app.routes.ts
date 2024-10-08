import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ShopComponent } from './shop/shop.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = 
[
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'menu',
        component:MenuComponent
    },
    {
        path:'blog',
        component:BlogComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'shop',
        component:ShopComponent
    },
    {
        path:'**',
        component: NotFoundComponent
    }
];
