import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = [];
  conversionForm: FormGroup;
  conversionResult: any;
  singleCurrency: any = {}; // Store a single currency object
  loading: boolean = false;
  conversionHistory: any[] = []; // Store conversion history

  constructor(private http: HttpClient) {
    this.conversionForm = new FormGroup({
      fromCurrency: new FormControl('USD', Validators.required),
      toCurrency: new FormControl('EUR', Validators.required),
      amount: new FormControl(1, [Validators.required, Validators.min(0.01)]),
    });
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.loadConversionHistory(); // Load conversion history on init
  }

  getCurrencies(): void {
    this.http.get('http://localhost:5001/currencies')
      .subscribe(
        (response: any) => {
          this.currencies = Object.keys(response.data);
          const defaultCurrencyCode = 'USD'; // Use 'USD' or any currency code you want to default to
          this.singleCurrency = response.data[defaultCurrencyCode];
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

            // Fetch the currency data for both currencies involved in conversion
            this.http.get('http://localhost:5001/currencies')
              .subscribe((response: any) => {
                const allCurrencies = response.data;

                // Get currency details for both 'fromCurrency' and 'toCurrency'
                const fromCurrencyDetails = allCurrencies[fromCurrency];
                const toCurrencyDetails = allCurrencies[toCurrency];

                // Store symbols or any other details needed
                this.singleCurrency = {
                  fromSymbol: fromCurrencyDetails?.symbol || '',
                  toSymbol: toCurrencyDetails?.symbol || ''
                };

                // Save conversion result in local storage
                this.saveConversionHistory(fromCurrency, toCurrency, amount, response.convertedAmount, this.singleCurrency.fromSymbol, this.singleCurrency.toSymbol);
              });
          },
          error => {
            console.error('Error converting currency', error);
            this.loading = false;
          }
        );
    }
  }

  // Save conversion result in local storage
  saveConversionHistory(fromCurrency: string, toCurrency: string, amount: number, convertedAmount: number, fromSymbol: string, toSymbol: string): void {
    const conversionRecord = {
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      fromSymbol,
      toSymbol,
      date: new Date().toLocaleString() // Store date and time
    };

    this.conversionHistory.push(conversionRecord); // Add to history array
    localStorage.setItem('conversionHistory', JSON.stringify(this.conversionHistory)); // Save to local storage
  }

  // Load conversion history from local storage
  loadConversionHistory(): void {
    const history = localStorage.getItem('conversionHistory');
    if (history) {
      this.conversionHistory = JSON.parse(history);
    }
  }
}
