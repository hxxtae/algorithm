const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...ALPHABET] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이
// -------------
function solution(n, m, alphabet) {
  const note = new Map();
  alphabet = alphabet.filter(str => {
    note.set(str, (note.get(str) ?? 0) + 1)
    return str.length >= m;
  });
  alphabet.sort();
  alphabet.sort((a, b) => note.get(b) - note.get(a) || b.length - a.length);
  return [...new Set(alphabet)].join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, ALPHABET);
console.log(result);