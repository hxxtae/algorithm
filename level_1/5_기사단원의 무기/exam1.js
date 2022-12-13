"use strict";

function solution(number, limit, power) {
  const numbers = Array.from({length: number}, (n, i) => i + 1);
  return numbers.reduce((prev, curr) => {
      const count = numberOfMeasure(curr);
      return (count > limit) ? 
          prev + power : 
          prev + count;
  }, 0);
}

// NOTE: 약수의 개수 알고리즘
function numberOfMeasure(num) {
  let count = 0;
  for(let i = 1; i * i <= num; i++) {
      if(i * i === num) count++;
      else if(num % i === 0) count += 2;
  }
  return count;
}
