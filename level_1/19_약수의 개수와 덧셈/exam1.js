// 1.
function solution(left, right) {
  let sum = 0;
  for(let num = left; num <= right; num++) sum += !(measureCount(num) % 2) ? num : -num;
  return sum;
}

function measureCount(num) {
  let count = 0;
  for(let i = 1; i * i <= num; i++) {
      if(i * i === num) count++;
      else if(num % i === 0) count += 2;
  }
  return count;
}

// 2.

// 다른 풀이로 제곱근이 정수이면 짝수라는 규칙으로 풀이할 수 있다.
// Math.isInteger(Math.sqrt(i))

// NOTE: Math
