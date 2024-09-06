import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class EndpointService {
    private readonly URL: string;

    constructor(private _http: HttpClient) {
        this.URL = environment.getUrl();
    }

    currency() {
        return {
            getCurrencies: () => {
                return this._http.get(`${this.URL}/currencies`);
            },
            convertCurrency: (fromCurrency: any, toCurrency: any, amount: number) => {
                return this._http.get(`${this.URL}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
            },
        };
    }
}
