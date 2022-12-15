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

// ---

// NOTE: 약수의 개수 알고리즘(2)
function numberOfMeasure2(num) {
  let count = 0;
  for(let i = 1; i * i <= num; i++) {
    if(num % i === 0) {
      count++;
      if(i * i < num) {
        count++;
      }
    }
  }
  return count;
}

// NOTE: 소수 판별 알고리즘
function numberOfDecimal(num) {
  if(num <= 1) return false;
  for(let i = 2; i * i <= num; i++) {
    if(num % i === 0) {
      return false;
    }
  }
  return true;
}
/*
  수학적으로 어떤 수 N의 소수 여부를 판단할 때, 
  N의 제곱근까지의 나누어 떨어짐 여부만 판단하면
  그 이후 숫자는 판단하지 않아도 된다.
  (이는 제곱근은 자신과, 그 이전의 수는 더 큰 수와 짝을 맞추고 있기 때문이다.)
  이를 활용하여 반복문이 돌아가는 횟수를 현저히 줄일 수 있다.
*/

/*
  ✔ 에라토스테네스의 체
  에라토스테네스의 체는 대량의 소수를 판별해야할 경우 사용한다.
  에라토스테네스의 체는 가장 먼저 소수를 판별할 범위만큼 배열을 할당하여, 
  해당하는 값을 넣어주고, 이후에 하나씩 지워나가는 방법을 이용한다.

  1. 배열을 생성하여 초기화한다.
  2. 2부터 시작해서 특정 수의 배수에 해당하는 수를 모두 지운다.
      (지울 때 자기자신은 지우지 않고, 이미 지워진 수는 건너뛴다.)
  3. 2부터 시작하여 남아있는 수를 모두 출력한다.
  ref: https://velog.io/@max9106/Algorithm-%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98-%EC%B2%B4
 */