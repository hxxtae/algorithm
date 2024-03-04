const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...PASSWORDS] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, passwords) {
  const set = new Set();
  let answer = '';

  for (const password of passwords) {
    set.add(password);
    const reversePw = [...password].reverse().join('');
    if (reversePw === password) {
      answer = password;
      break;
    }
    if (set.has(reversePw)) {
      answer = password;
      break;
    }
  }

  return [
    answer.length,
    answer[Math.floor(answer.length / 2)]
  ].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, PASSWORDS);
console.log(result);
