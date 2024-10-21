import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{

  cartProducts:any[]=[]
  total:number=0




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

  getTotalPrice()
  {
    this.total=0
    for(let x in this.cartProducts)
    {
      this.total+=this.cartProducts[x].price*this.cartProducts[x].amount
    }
  }
}
