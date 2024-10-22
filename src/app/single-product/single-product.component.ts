import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit {
  http =inject(HttpClient)
  @Input() id: any;
  productsArray :any[]=[]
  mainImageSrc:string =''
  amount:number=0
  cartProducts :any[]=[]

  fetchData()
  {
    this.http.get('https://badrelgammal.github.io/json2/menu.json')
    .subscribe((data:any)=>this.productsArray=data)
  }

  ngOnInit(): void {
    this.fetchData()
  }

  changeImage(ev:any)
  {
    this.mainImageSrc=ev.target.src
  }
  
  add()
  {
    this.amount++
  }
  minus()
  {
    if(this.amount==0)
      this.amount=this.amount
    else
    this.amount--
  }

  addCart() {
    let product = {
      id: this.productsArray[this.id - 1].id,
      name: this.productsArray[this.id - 1].name,
      price: this.productsArray[this.id - 1].price,
      image: this.mainImageSrc? this.mainImageSrc :this.productsArray[+this.id-1]?.images[0],
      amount: this.amount 
    };
  
    if ("cart" in localStorage) 
    {
          this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
          let exist = this.cartProducts.find(item => item.id === product.id);
          if (exist) 
          {
            exist.amount =`${+exist.amount + +this.amount}`; 
          } 
          else 
          {
            this.cartProducts.push(product);
          } 
          localStorage.setItem("cart", JSON.stringify(this.cartProducts));
          this.cartProducts=[]
    } 
    else 
    {
      this.cartProducts.push(product); 
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      this.cartProducts=[]
    }
  }
  
}
