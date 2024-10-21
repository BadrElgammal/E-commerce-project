import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent,provideIcons} from '@ng-icons/core'
import { heroMagnifyingGlass, heroShoppingCart, heroUser } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent,RouterLink,RouterLinkActive],
  viewProviders:[provideIcons({heroMagnifyingGlass,heroUser,heroShoppingCart})],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  implements OnInit{
  cartProducts:any[]=[]

  ngOnInit(): void {
    this.getCartProduct()
  }

  getCartProduct()
  {
    if ("cart" in localStorage) 
      {
            this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      }
  }
}
