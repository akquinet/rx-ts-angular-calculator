import {Injectable} from '@angular/core';
import {applyDigit, applyOperation, CalculatorState, Operator} from './calculator-state';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/observable/merge';
import 'rxjs-compat/add/operator/startWith';
import 'rxjs-compat/add/operator/map';
import {CalculatorService} from './calculator-service';

@Injectable()
export class RxCalculatorService extends CalculatorService {

  private digits: Subject<number> = new Subject<number>();
  private operations: Subject<(a: number, b: number) => number> = new Subject<(a: number, b: number) => number>();
  private state: Subject<CalculatorState> = new BehaviorSubject<CalculatorState>(new CalculatorState(0, 0, x => x));
  display = this.state.map(state => state.display);

  constructor() {
    super();
    Observable.merge(
      this.digits.withLatestFrom(this.state, applyDigit),
      this.operations.withLatestFrom(this.state, applyOperation)
    ).subscribe(this.state);
  }

  public enterDigit(value: number) {
    this.digits.next(value);
  }

  public enterOperator(value: Operator) {
    this.operations.next(this.operation(value));
  }

  private operation(operator: Operator): (a: number, b: number) => number {
    switch (operator) {
      case Operator.Compute: return (a, b) => b;
      case Operator.Plus: return (a, b) => a + b;
      case Operator.Minus: return (a, b) => a - b;
      default: throw new Error('Operator not supported');
    }
  }
}
