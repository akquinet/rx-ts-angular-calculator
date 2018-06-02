import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OperationButtonComponent} from './operation-button/operation-button.component';
import {DigitButtonComponent} from './digit-button/digit-button.component';
import {CalculatorService} from './calculator-service';
import {RxCalculatorService} from './rx-calculator-service';

@NgModule({
  declarations: [
    AppComponent,
    DigitButtonComponent,
    OperationButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: CalculatorService, useClass: RxCalculatorService}], // useClass: SodiumCalculatorService
  bootstrap: [AppComponent]
})
export class AppModule {
}
