import { from, Observable, of } from 'rxjs';
import { switchMap, delay, tap, concatMap, map } from 'rxjs/operators';
import operationsString from '../assets/operations';

export class FibonacciService {
  private static delay: number = 500

  /**
   * This observable will emit an operation as a string every seconds
   * Example : "1 + 1 =", "2 + 1 =", "3 + 2 =", etc
   */
  static getOperations(): Observable<string> {
    console.log(`Start gettings operations one by one`);
    return <Observable<string>>from(operationsString)
      .pipe(
        // tap(() => console.log(`Start gettings operations one by one`)),
        // switchMap(operations => from(operations)),
        concatMap(operation => of(operation).pipe(delay(500))),
        tap((operation) => console.log(`${this.trackingId(operation)} [getOperations] : send operation : ${operation} ?`)),
      );
  }

  /**
   * This observable will emit a single result for a given string operation
   * Example : FibonacciService.getResults("1 + 1 =") will output 2, FibonacciService.getResults("2 + 1 =") will output 3, etc
   * BE CAREFULL : the result may be output between 1s and 5s
   * @param operation A string which represents a mathematical addition ("1 + 1 =")
   */
  static getResults(operation: string): Observable<number> {
    return new Observable<number>((subscribe) => {
      if (!operation) {
        subscribe.error(new Error('Operation cannot be undefined'));
      }

      operation = operation.replace('=', '');

      const ops = operation.split('+');

      if (ops.length !== 2 || (isNaN(+ops[0]) && isNaN(+ops[1]))) {
        subscribe.error(new Error('Bad operation'));
      }
      console.log(`${this.trackingId(operation)} [getResults] : computing ${operation}...`);

      subscribe.next(+ops[0] + +ops[1]);
      subscribe.complete();
    }).pipe(
      tap(() => {
        this.delay = this.delay === 1000 ? 500 : 1000;
      }),
      switchMap((res) => of(res).pipe(delay(this.delay))),
      map((res) => res as number),
      tap((res) => console.log(`${this.trackingId(operation)} [getResults] : send result of : ${operation} = ${res} [${this.delay} ms]`)),
    );
  }

  private static trackingId(operation): string {
    operation = operation.replace('=', '');

    const ops = operation.split('+');

    const result = +ops[0] + +ops[1];

    const t = result.toString().padEnd(4, '0').substring(0, 4);

    return `#${t}`;
  }
}
