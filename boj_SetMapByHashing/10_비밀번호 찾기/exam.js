const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const MEMO = input.slice(1, N + 1);
const LIST = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, m, memo, list) {
  const memoMap = new Map(memo.map(item => item.split(' ')));
  
  return list
    .map(link => memoMap.get(link))
    .join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, MEMO, LIST);
console.log(result);