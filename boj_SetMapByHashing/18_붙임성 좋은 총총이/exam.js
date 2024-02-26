const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const [[N], ...PEOPLE] = input;

// -------------
// 풀이
// -------------
function solution(n, people) {
  const danceSet = new Set(['ChongChong']);

  for (const [a, b] of people) {
    if (danceSet.has(a) || danceSet.has(b)) {
      danceSet.add(a);
      danceSet.add(b);
    }
  }

  return danceSet.size;
}

// -------------
// 출력
// -------------
const result = solution(+N, PEOPLE);
console.log(result);