import {Component, Input} from '@angular/core';
import {Operator} from '../calculator-state';
import {CalculatorService} from '../calculator-service';

@Component({
  selector: 'app-operation-button',
  templateUrl: './operation-button.component.html',
  styleUrls: ['./operation-button.component.css']
})
export class OperationButtonComponent {
  @Input()
  private operator: Operator;

  constructor(private service: CalculatorService) {
  }

  onClick() {
    this.service.enterOperator(this.operator);
  }
}
