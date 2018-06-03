export enum Operator {
  Plus = '+',
  Minus = '-',
  Compute = '='
}

export namespace Operator {
  export function toOperation(operator: Operator): (a: number, b: number) => number {
    switch (operator) {
      case Operator.Compute: return (a, b) => b;
      case Operator.Plus: return (a, b) => a + b;
      case Operator.Minus: return (a, b) => a - b;
      default: throw new Error('Operator not supported');
    }
  }
}

export class CalculatorState {
  constructor(readonly main: number, readonly display: number, readonly activeOperation: (b: number) => number) {
  }
}

export function applyDigit(digit: number, state: CalculatorState): CalculatorState {
  return new CalculatorState(state.main * 10 + digit, state.main * 10 + digit, state.activeOperation);
}

export function applyOperation(operator: (a: number, b: number) => number, state: CalculatorState): CalculatorState {
  return new CalculatorState(0, state.activeOperation(state.main), b => operator(state.activeOperation(state.main), b));
}
