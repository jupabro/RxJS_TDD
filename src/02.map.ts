import { Observable } from 'rxjs';
import { FibonacciService } from './mocks/fibonacci.service';
import { concatMap, switchMap, mergeMap } from 'rxjs/operators';

/*
    DO NOT TOUCH CONST NAMES (Otherwise, tests won't work)
 */

/**
 * ##################### CONTEXT ##################### 
 */

/** 
 * => FibonacciService.getOperations();
 * This observable will emit an operation as a string every 500ms.
 * Example : "1 + 1 =", "2 + 1 =", "3 + 2 =", etc.
 */

/** 
 * => FibonacciService.getResults(...);
 * This observable will emit a single result for a given string operation.
 * Example : FibonacciService.getResults("1 + 1 =") will output 2, FibonacciService.getResults("2 + 1 =") will output 3, etc.
 * BE CAREFULL : the result may be output in 500ms or 1000ms.
 */

/**
 * 
 * ##################### CHALLENGE ONE ##################### 
 * 
 * Use "FibonacciService.getOperations()" to get fibonnaci operations one by one every second.
 * Then get result of operation by calling "FibonacciService.getResults(...)".
 * Store your Observable and pipe in "fibonacciObs" describe below.
 * Subscribe "fibonacciObs" to get emited values, value MUST BE EMITED IN THE RIGHT ORDER (ASC).
 * You need to only use ONE subscribe, and choose the right RxJs operators to get result in the right order
 */

/**
 * Use this constant to store your observable and pipe
 * Example : 
 *          const allFibonacciObs = of(...).pipe(...);
 *          allFibonacciObs.subscribe(...);
 */
export const allFibonacciObs: Observable<number> = FibonacciService.getOperations().pipe(
    concatMap((operator) => FibonacciService.getResults(operator))
);
/**
 * ##################### CHALLEGNGE TWO ##################### 
 * 
 * Use "FibonacciService.getOperations()" to get fibonnaci operations one by one every second.
 * Then get result of operation by calling "FibonacciService.getResults(...)".
 * Store your Observable and pipe in "fastestFibonacciObs" describe below.
 * 
 * Remember in the previous exercise we want all results, but some results take 1000ms to be emitted.
 * Now we only want :
 *  - results that takes 500ms 
 *  - only one inner observable should be active at the time.
 *  - automatically cancel inner Observable that take more that 500ms.
 * 
 * Use this constant to store your observable and pipe
 * Example : 
 *          const fastestFibonacciObs = of(...).pipe(...);
 *          fastestFibonacciObs.subscribe(...);
 */
export const fastestFibonacciObs: Observable<number> = FibonacciService.getOperations().pipe(
    switchMap((operator) => FibonacciService.getResults(operator))
);