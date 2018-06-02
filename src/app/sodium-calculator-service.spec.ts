import {async} from '@angular/core/testing';
import {RxCalculatorService} from './rx-calculator-service';
import {Operator} from './calculator-state';
import {SodiumCalculatorService} from './sodium-calculator-service';

describe('CalculatorService', () => {

  let service: SodiumCalculatorService;

  beforeEach(async(() => {
    service = new SodiumCalculatorService();
  }));

  it('should display a 0 at startup', async(() => {
    service.display.subscribe(result => expect(result).toBe(0));
  }));

  it('should display a 123 after clicking the digits 1,2,3', async(() => {
    service.enterDigit(1);
    service.enterDigit(2);
    service.enterDigit(3);
    service.display.subscribe(result => expect(result).toBe(123));
  }));

  it('should display a 12 after adding 10 and 2 and continue to add', async(() => {
    service.enterDigit(1);
    service.enterDigit(0);
    service.enterOperator(Operator.Plus);
    service.enterDigit(2);
    service.enterOperator(Operator.Plus);
    service.display.subscribe(result => expect(result).toBe(12));
  }));

  it('should display a 12 after adding 10 and 2 press compute', async(() => {
    service.enterDigit(1);
    service.enterDigit(0);
    service.enterOperator(Operator.Plus);
    service.enterDigit(2);
    service.enterOperator(Operator.Compute);
    service.display.subscribe(result => expect(result).toBe(12));
  }));

  it('should display a 15 after adding 10 and 2 and 3 ', async(() => {
    service.enterDigit(1);
    service.enterDigit(0);
    service.enterOperator(Operator.Plus);
    service.enterDigit(2);
    service.enterOperator(Operator.Plus);
    service.enterDigit(3);
    service.enterOperator(Operator.Compute);
    service.display.subscribe(result => expect(result).toBe(15));
  }));

  it('should display a 8 after subtracting 2 from 10', async(() => {
    service.enterDigit(1);
    service.enterDigit(0);
    service.enterOperator(Operator.Minus);
    service.enterDigit(2);
    service.enterOperator(Operator.Compute);
    service.display.subscribe(result => expect(result).toBe(8));
  }));

  it('should display a 12 after 10-2+4', async(() => {
    service.enterDigit(1);
    service.enterDigit(0);
    service.enterOperator(Operator.Minus);
    service.enterDigit(2);
    service.enterOperator(Operator.Plus);
    service.enterDigit(4);
    service.enterOperator(Operator.Compute);
    service.display.subscribe(result => expect(result).toBe(12));
  }));
});
