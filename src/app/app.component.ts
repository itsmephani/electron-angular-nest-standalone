import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products = [];

  constructor(private readonly http: HttpClient) {
    console.log('fetching products');
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/products').subscribe((data: []) => {
      console.log(data);
      this.products = data;
    });
  }

  addProduct(name: string, description: string, count: number) {
    this.http
      .post('http://localhost:3000/products', { name, description, count })
      .subscribe((product: {}) => {
        this.products.push(product);
      });
  }
}
