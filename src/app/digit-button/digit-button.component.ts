import {Component, Input} from '@angular/core';
import {CalculatorService} from '../calculator-service';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent {

  @Input() digit: number;

  constructor(private service: CalculatorService) {
  }

  onClick() {
    this.service.enterDigit(this.digit);
  }
}
