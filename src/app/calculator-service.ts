import {Operator} from './calculator-state';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/observable/merge';
import 'rxjs-compat/add/operator/startWith';
import 'rxjs-compat/add/operator/map';

export abstract class CalculatorService {

  display: Observable<number>;
  abstract enterDigit(value: number);
  abstract enterOperator(value: Operator);
}
