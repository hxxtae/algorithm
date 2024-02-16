const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, ...LOGS] = input;

// -------------
// 풀이
// -------------
function solution(n, logs) {
  const logMap = new Map();
  logs.forEach((log) => {
    const [name, state] = log.split(' ');
    logMap.set(name, state);
  });

  return [...logMap]
    .filter(([_, state]) => state === 'enter')
    .flatMap(([name, _]) => name)
    .sort()
    .reverse()
    .join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, LOGS);
console.log(result);
