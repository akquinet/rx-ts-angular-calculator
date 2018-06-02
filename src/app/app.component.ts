import {Component} from '@angular/core';
import 'rxjs-compat/add/operator/map';
import {Operator} from './calculator-state';
import {CalculatorService} from './calculator-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';

  public operator = Operator; // this field is required to allow access to enum value from Operator
  public display = this.service.display;

  constructor(private service: CalculatorService) {
  }
}
