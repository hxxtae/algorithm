const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n').map(item => item.trim());
INPUT.pop();

// -------------
// 풀이
// -------------
function solution(input) {
  const confirmDoubleStr = (str) => {
    const set = new Set();
    const len = str.length;
    for (let r = 1; r < len; r++) {
      let cnt = 0;
      for (let i = 0; i < len; i++) {
        const [start, end] = [i, i + r];
        if (end >= len) break;
        set.add(str[start] + str[end]);
        cnt++;
      }
      if (cnt !== set.size) return false;
      set.clear();
    }

    return true;
  }

  const getMessage = (str, kind) => {
    if (kind) return `${str} is surprising.`;
    return `${str} is NOT surprising.`;
  }

  const answer = [];  
  for (const str of input) {
    const confirm = confirmDoubleStr(str);
    answer.push(getMessage(str, confirm));
  }
  
  return answer.join('\n');
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);
