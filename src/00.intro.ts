import {Observable, of, range} from 'rxjs';
import {filter, map} from 'rxjs/operators';

/*
    DO NOT TOUCH CONST NAMES (Otherwise, tests won't work)
 */

// Just an observable which should send "Hello World"
export const helloWorldObservable = of('Hello World');

// This one must trigger numbers from 0 to 10
// Pro tip: You can also use `range` from RxJS
export const zeroToTenObservable = range(0,11);

// Use map operator to pick the first letter au each word
export const firstLetterObservable = of('Wild', 'Code', 'School').pipe(map((w)=>w.charAt(0)));

// Use filter operator to allow only positive numbers
export const positiveNumbersObservable = of(-23, 543, 7, 6, 3, -234, 43).pipe(filter((num)=>num>0))

// Write a function that produce the first 15th fibonnaci numbers
// In mathematics, the Fibonacci numbers, commonly denoted Fn form a sequence,
// called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.
// It starts with number 0 and 1. Example:
// 0 + 1 = 1
// 1 + 1 = 2
// 1 + 2 = 3
// 2 + 3 = 5
// 3 + 5 = 8
// ect ...
//
// NOTE: Do not use `scan` operator
export const fibonacciObservable = new Observable(function (observer) {
    let count = 0
    let value1 = 0
    let value2 = 1

    const generateFibonacci = () => {
        if (count < 15) {
            const sum = value1 + value2;
            observer.next(sum) 
            value1 = value2;
            value2 = sum;
            count++;
            generateFibonacci()
        } else {
            observer.complete()
        }
    };

    generateFibonacci()
});
