import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { MaterialModule } from './modules/material.module';

const components = [
    CurrencyConverterComponent
  
  ];
@NgModule({
    declarations: [...components],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
    
    ],
    providers: [],
    exports: [
      ...components,
      RouterModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
    ],
  })
export class SharedModule {
//   static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
//     throw new Error('Method not implemented.');
//   }
   
  }
  