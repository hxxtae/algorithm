const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
for (let i = 1; i < input.length;) {
  const N = +input[i++];
  const ARR_N = input[i++].split(' ');
  const M = +input[i++];
  const ARR_M = input[i++].split(' ');
  const result = solution(N, M, ARR_N, ARR_M);
  console.log(result);
}

// -------------
// 풀이
// -------------
function solution(n, m, arrN, arrM) {
  const setN = new Set(arrN);

  return arrM
    .map(num => +setN.has(num))
    .join('\n');
}
