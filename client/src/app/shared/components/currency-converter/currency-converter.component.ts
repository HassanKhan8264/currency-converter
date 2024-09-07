import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EndpointService } from "src/app/services/endpoint.service";

@Component({
  selector: "app-currency-converter",
  templateUrl: "./currency-converter.component.html",
  styleUrls: ["./currency-converter.component.scss"],
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = [];
  conversionForm: FormGroup;
  conversionResult: any;
  singleCurrency: any = {};
  loading: boolean = false;
  conversionHistory: any[] = [];
  emptyRecords: string = "";

  constructor(private endpoint: EndpointService) {
    this.conversionForm = new FormGroup({
      fromCurrency: new FormControl("USD", Validators.required),
      toCurrency: new FormControl("EUR", Validators.required),
      amount: new FormControl(1, [Validators.required, Validators.min(0.01)]),
    });
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.loadConversionHistory();
  }

  getCurrencies(): void {
    this.endpoint
      .currency()
      .getCurrencies()
      .subscribe({
        next: (res: any) => {
          this.currencies = Object.keys(res.data);
          this.singleCurrency = res.data["USD"];
        },
        error: (error) => {
          console.log("err", error);
        },
      });
  }

  convertCurrency(): void {
    if (this.conversionForm.valid) {
      this.loading = true;
      const { fromCurrency, toCurrency, amount } = this.conversionForm.value;
      this.endpoint
        .currency()
        .convertCurrency(fromCurrency, toCurrency, amount)
        .subscribe({
          next: (res: any) => {
            this.conversionResult = res;
            this.fetchCurrencyDetails(
              fromCurrency,
              toCurrency,
              amount,
              res.convertedAmount
            );
          },
          error: (error) => {
            console.error("Error converting currency", error);
            this.loading = false;
          },
        });
    }
  }

  fetchCurrencyDetails(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    convertedAmount: number
  ): void {
    this.endpoint
      .currency()
      .getCurrencies()
      .subscribe({
        next: (res: any) => {
          const allCurrencies = res.data;
          this.singleCurrency = {
            fromSymbol: allCurrencies[fromCurrency]?.symbol || "",
            toSymbol: allCurrencies[toCurrency]?.symbol || "",
          };
          this.saveConversionHistory(
            fromCurrency,
            toCurrency,
            amount,
            convertedAmount
          );
          this.loading = false;
        },
        error: (error) => {
          console.error("Error converting currency", error);
        },
      });
  }

  saveConversionHistory(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    convertedAmount: number
  ): void {
    const conversionRecord = {
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      ...this.singleCurrency,
      date: new Date().toLocaleString(),
    };
    this.conversionHistory.push(conversionRecord);
    localStorage.setItem(
      "conversionHistory",
      JSON.stringify(this.conversionHistory.reverse())
    );
  }

  loadConversionHistory(): void {
    const history = localStorage.getItem("conversionHistory");
  
    this.conversionHistory.reverse()
    this.conversionHistory = history ? JSON.parse(history) : [];
      this.conversionHistory.length === 0
        ? "There is no conversion history right now"
        : "";
  }
}
