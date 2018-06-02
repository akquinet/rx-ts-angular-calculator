import {Injectable} from '@angular/core';
import {applyDigit, applyOperation, CalculatorState, Operator} from './calculator-state';
import {BehaviorSubject} from 'rxjs';
import 'rxjs-compat/add/operator/withLatestFrom';
import 'rxjs-compat/add/observable/merge';
import 'rxjs-compat/add/operator/startWith';
import 'rxjs-compat/add/operator/map';
import {CalculatorService} from './calculator-service';
import {CellLoop, Operational, StreamSink, Transaction} from 'sodiumjs';

@Injectable()
export class SodiumCalculatorService extends CalculatorService {

  private digitS = new StreamSink<number>();
  private operationS = new StreamSink<(a: number, b: number) => number>();
  private statusC: CellLoop<CalculatorState>;
  display = new BehaviorSubject<number>(0);

  constructor() {
    super();

    Transaction.run(() => {
      this.statusC = new CellLoop<CalculatorState>();
      const updatedStateS = this.digitS.snapshot(this.statusC, applyDigit)
        .orElse(this.operationS.snapshot(this.statusC, applyOperation));

      return this.statusC.loop(
        updatedStateS.hold(
          new CalculatorState(0, 0, x => x)));
    });

    Operational.updates(this.statusC).listen(state => {
      this.display.next(state.display);
    });
  }

  public enterDigit(value: number) {
    this.digitS.send(value);
  }

  public enterOperator(value: Operator) {
    this.operationS.send(this.operation(value));
  }

  private operation(operator: Operator): (a: number, b: number) => number {
    switch (operator) {
      case Operator.Compute:
        return (a, b) => b;
      case Operator.Plus:
        return (a, b) => a + b;
      case Operator.Minus:
        return (a, b) => a - b;
      default:
        throw new Error('Operator not supported');
    }
  }
}
