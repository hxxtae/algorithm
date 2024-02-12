const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const BOOK = input.slice(1, N + 1);
const EXAM = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, m, book, exam) {
  const bookMap = new Map();
  book.forEach((name, idx) => {
    bookMap.set(name, (idx + 1).toString());
    bookMap.set((idx + 1).toString(), name);
  });
  
  return exam.map(e => bookMap.get(e)).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, BOOK, EXAM);
console.log(result);