import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  http = inject(HttpClient);
  productsArray: any[] = [];
  productsArray2: any[] = []; 
  searchText: string = '';
  selectedCategories: string[] = []; 

  fetchData() {
    this.http.get('https://badrelgammal.github.io/json2/menu.json')
      .subscribe((data: any) => {
        this.productsArray = data;
        this.productsArray2 = data; 
      });
  }

  ngOnInit(): void {
    this.fetchData();
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
                      this.productsArray2.push(this.productsArray[i]);
                      
              }
          }
      }
  } else {
      for (let i = 0; i < this.productsArray.length; i++) {
              this.productsArray2.push(this.productsArray[i]);
      }
  }
}

}
