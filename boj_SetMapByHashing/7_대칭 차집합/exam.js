const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [[A, B], SETA, SETB] = stdin
  .split('\n')
  .map(item => item.trim().split(' ').map(Number));

// -------------
// 풀이
// -------------
function solution(a, b, setA, setB) {
  const set = new Set(setA);
  const commonCnt = setB.filter(num => set.has(num)).length; // 교집합의 개수

  return (setA.length + setB.length) - (2 * commonCnt);
}

// -------------
// 출력
// -------------
const result = solution(A, B, SETA, SETB);
console.log(result);

// [접근]
// ### 방법
// 대칭 차집합을 구해야 한다. (대칭 차집합: 합집합에서 교집합을 뺀 집합)
// 집합 A, B중 하나를 해시로 두고 집합의 원소를 반복하여 해시에 존재하는 같은 원소의 개수를 구한다. -> 교집합의 개수
// 결과적으로, 대칭 차집합 = (A집합의 개수 + B집합의 개수) - (2 * 교집합의 개수)