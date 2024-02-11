const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const N_ARR = input.slice(1, N + 1);
const M_ARR = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, m, nArr, mArr) {
  const peopleMap = new Map(nArr.map(name => [name, true]));
  const resultArr = [];
  for (const name of mArr) {
    peopleMap.has(name) && resultArr.push(name);
  }

  return [resultArr.length, ...resultArr.sort()].join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, N_ARR, M_ARR);
console.log(result);

// [접근]
// ### 방법
// (1)듣도 못한 사람과 (2)보도 못한 사람 중에서 듣도 + 보도 못한 사람을 알아내야 한다.
// 1. (1)(2) 둘 중 에서 가장 이름이 많은(길이가 긴) 이름을 가진 배열을 해시로 만든다.
// 2. 나머지 배열을 순회 하면서 해시의 키에 부합되면 해당 이름을 다른 배열에 기록한다.
// 3. 이름이 기록된 배열을 출력 조건에 맞게 출력