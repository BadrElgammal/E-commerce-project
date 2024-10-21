import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass,heroShoppingBag } from '@ng-icons/heroicons/outline';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ heroMagnifyingGlass,heroShoppingBag })],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  http = inject(HttpClient);
  productsArray: any[] = [];
  productsArray2: any[] = []; 
  searchText: string = '';
  selectedCategories: string[] = []; 
  cartProducts:any[]=[]
  @Input() page :any=1;
  numberOfProdcuts:number=0
  numberOfPages :any[]=[]
  startIndex :number=0
  endIndex :number=0
  productsToShow :any[]=[]
  constructor(private router: Router, private route: ActivatedRoute) {}





  fetchData() {
    this.http.get('https://badrelgammal.github.io/json2/menu.json')
      .subscribe((data: any) => {
        this.productsArray = data;
        this.productsArray2 = data; 

        this.productsShow()
        
      });
  }

  ngOnInit(): void {
    this.fetchData();
    
    this.route.queryParams.subscribe(params => {
      const pageNum = params['page'];
      if (!pageNum) {
        this.router.navigate(['/shop'], { queryParams: { page: 1 } });
      }
    });
  }
  
  productsShow()
  {
        this.numberOfProdcuts=this.productsArray2?.length
        this.numberOfPages = Array(Math.ceil(this.numberOfProdcuts/9))

        this.startIndex = (+this.page -1)*9
        this.endIndex = (this.startIndex +9 )

        this.productsToShow =this.productsArray2.slice(this.startIndex,this.endIndex)

        if (this.numberOfPages.length < this.page) {
          this.page = 1;
          this.router.navigate(['/shop'], { queryParams: { page: 1 } });
          this.fetchData()
        }
  }

  getInputData(inp: HTMLInputElement) {
    this.searchText = inp.value.toLowerCase();
    this.filteredProducts();
  }



  updateCategorySelection(category: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.filteredProducts();
  }



filteredProducts() {
  this.productsArray2 = [];
  if (this.selectedCategories.length > 0) {
      for (let i = 0; i < this.productsArray.length; i++) {
          for (let j = 0; j < this.selectedCategories.length; j++) {
              if (this.productsArray[i].category === this.selectedCategories[j])
              {
                if (this.productsArray[i].name.toLowerCase().includes(this.searchText?.toLowerCase()))
                      {
                        this.productsArray2.push(this.productsArray[i]);
                        this.productsShow()
                      }
                      
              }
          }
      }
  } else {
      for (let i = 0; i < this.productsArray.length; i++) {
        if (this.productsArray[i].name.toLowerCase().includes(this.searchText?.toLowerCase()))
          {
            this.productsArray2.push(this.productsArray[i]);
            this.productsShow()
          }
      }
  }
}



addCart(prod:any) {
  let product = {
    image:prod.images[0],
    id: prod.id,
    name: prod.name,
    price: prod.price,
    amount: 1
  };

  if ("cart" in localStorage) 
  {
    console.log(product)
        this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
        let exist = this.cartProducts.find(item => item.id === product.id);
        if (exist) 
        {
          exist.amount =`${+exist.amount + +1}`; 
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


changePage(ind:any)
{
  this.page=ind+1
  this.fetchData()
}

}
