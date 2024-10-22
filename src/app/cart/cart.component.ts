import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  cartProducts :any[]= []
  total:number=0;


  ngOnInit(): void {
    this.getCartProduct()
  }

  getCartProduct()
  {
    if ("cart" in localStorage) 
      {
            this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      }
      this.getTotalPrice()
  }

  minusAmount(index:number)
  {
    this.cartProducts[index].amount--
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getTotalPrice()
  }
  addAmount(index:number)
  {
    this.cartProducts[index].amount++
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getTotalPrice()
  }
  detectChange()
  {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getTotalPrice()
  }
  deleteProduct(index:number)
  {
    this.cartProducts.splice(index,1)
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getTotalPrice()
  }

  getTotalPrice()
  {
    this.total=0
    for(let x in this.cartProducts)
    {
      this.total+=this.cartProducts[x].price * this.cartProducts[x].amount;
    }
  }
}
