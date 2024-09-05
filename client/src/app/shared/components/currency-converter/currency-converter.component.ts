import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = ['USD', 'EUR', 'GBP', 'PKR', 'INR']; // Initialize as empty
  conversionForm: FormGroup;
  conversionResult: any;
  loading: boolean = false;

  constructor(private http: HttpClient) {
    this.conversionForm = new FormGroup({
      fromCurrency: new FormControl('USD', Validators.required),
      toCurrency: new FormControl('EUR', Validators.required),
      amount: new FormControl(1, [Validators.required, Validators.min(0.01)]),
    });
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.http.get('http://localhost:5001/currencies?currencies=EUR,USD,CAD,PKR,INR')  // Fetch specific currencies
      .subscribe(
        (response: any) => {
          this.currencies = Object.keys(response.data);
          console.log('Currencies:', this.currencies);
        },
        error => {
          console.error('Error fetching currencies', error);
        }
      );
  }

  convertCurrency(): void {
    if (this.conversionForm.valid) {
      this.loading = true;
      const { fromCurrency, toCurrency, amount } = this.conversionForm.value;
      this.http.get(`http://localhost:5001/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
        .subscribe(
          (response: any) => {
            this.conversionResult = response;
            this.loading = false;
          },
          error => {
            console.error('Error converting currency', error);
            this.loading = false;
          }
        );
    }
  }
}
