const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const KEYWORDS = input.slice(1, N + 1);
const WRITING = input.slice(N + 1);

// -------------
// 풀이
// -------------
function solution(n, m, keywords, writing) {
  const set = new Set(keywords);
  const answer = [];
  
  for (let list of writing) {
    list.split(',').forEach((keyword) => set.delete(keyword));
    answer.push(set.size);
  }

  return answer.join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, KEYWORDS, WRITING);
console.log(result);