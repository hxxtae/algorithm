const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const N = +input[0];
const PARTICIPANTS = input.slice(1, N + 1);
const COMPLETED = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, participants, completed) {
  const compleMap = new Map();
  completed.forEach((name) => {
    compleMap.set(name, (compleMap.get(name) ?? 0) + 1);
  });

  for (const name of participants) {
    // NOTE: 완주하지 못한 사람
    if (!compleMap.has(name)) return name;
    // NOTE: 완주하지 못한 사람 (동명인)
    compleMap.set(name, compleMap.get(name) - 1);
    if (compleMap.get(name) < 0) return name;
  }
}

// -------------
// 출력
// -------------
const result = solution(N, PARTICIPANTS, COMPLETED);
console.log(result);
