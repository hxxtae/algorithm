const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...BOOKS] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, books) {
  const sales = new Map();
  let max = 0;
  books.forEach((book) => {
    sales.set(book, (sales.get(book) || 0) + 1);
    max = Math.max(max, sales.get(book));
  });
  
  return [...sales]
    .filter(([_, cnt]) => cnt === max)
    .map(([book, _]) => book)
    .sort()[0];
}

// -------------
// 출력
// -------------
const result = solution(+N, BOOKS);
console.log(result);
