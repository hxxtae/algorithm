const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, C], SEQUENCE] = input;

// -------------
// 풀이
// -------------
function solution(n, c, sequence) {
  const numMap = new Map();
  let cnt = 0;
  sequence.forEach((num) => {
    if (!numMap.has(num)) {
      numMap.set(num, {
        order: ++cnt,
        freq: 1
      });
      return;
    }
    numMap.get(num).freq++;
  });
  
  sequence.sort((a, b) =>
    numMap.get(b).freq - numMap.get(a).freq ||
    numMap.get(a).order - numMap.get(b).order);
  
  return sequence.join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, C, SEQUENCE);
console.log(result);

// [접근]
// 문제에서, 수열의 두 수 X와 Y가 있을 때, X가 Y보다 수열에서 많이 등장하는 경우에는 X가 Y보다 앞에 있어야 한다.
// 만약, 등장하는 횟수가 같다면, 먼저 나온 것이 앞에 있어야 한다.

// 이를 해결하기 위해 해시를 사용하여, 키 값으로 (순서, 빈도)를 가지도록 한다.
// 이후, 해당 수열을 정렬할 때 해시에 기록된 (키-값)을 통해 조건에 맞게 수열을 정렬하면 된다.