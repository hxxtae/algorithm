// 풀이 1.
function solution1(numbers) {
  const resultArr = [];
  for(let i = 0, len = numbers.length; i < len; i++) {
    const num = numbers[i];
    const bit = num.toString(2);
    if(num % 2 === 0) {
      resultArr.push(num + 1);
      continue;
    }
    const findNum = findBitDiffMax2(bit, num);
    resultArr.push(findNum)
  }
  return resultArr;
}

function findBitDiffMax2(bit, num) {
  let zeroPos = [...bit].reverse().indexOf('0');
  zeroPos = zeroPos !== -1 ? (zeroPos + 1) : (bit.length + 1);
  const numOfZeroPosBit = parseInt('1'.padEnd(zeroPos , '0'), 2);
  const numOfZeroPosBitHalf = numOfZeroPosBit / 2;
  return num + numOfZeroPosBit - numOfZeroPosBitHalf;
}

// NOTE: 비트 연산자 활용

// [접근]
// 짝수의 경우 2진수로 변환했을 때 맨 뒤 첫번째에는 항상 0이기 때문에 짝수 + 1을 해주면 된다.
// 홀수의 경우 
//   1. 2진수로 변환했을 때 맨 뒤에서 부터 시작하여 0이 가장 먼저 나오는 비트의 10진수를 홀수에 더하고
//   2. (비트의 10진수 / 2)를 뺀다.
//   결과: 홀수 + 자릿수(10진수로 변환) - 자릿수(10진수로 변환)/2

// 풀이 2. (테스트 실패)
function solution2(numbers) {
    const resultArr = [];
    for(let i = 0, len = numbers.length; i < len; i++) {
      const num = numbers[i];
      if(num % 2 === 0) {
        resultArr.push(num + 1);
        continue;
      }
      resultArr.push(Math.ceil(num+(num^(num+1)+1)/4));
    }
    return resultArr;
}

// [접근]
// if(num%2==0) return num+1; 
// else return num+(num^(num+1)+1)/4; 

// [테스트 10, 11 실패 이유]
// 비트연산시 피연산자는 32비트 정수로 변환되며 일련의 비트(0과 1)로 표현됩니다. 
// 32비트 이상인 숫자는 최상위 비트가 삭제됩니다. 
// 예를 들어 32비트 이상인 다음 정수는 32비트 정수로 변환됩니다.