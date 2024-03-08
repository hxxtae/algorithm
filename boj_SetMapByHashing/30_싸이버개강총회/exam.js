const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [S, E, Q] = input[0].split(' ');
const CHATHISTORY = input.slice(1).map(history => history.split(' '));

// -------------
// 풀이
// -------------
function solution(s, e, q, chatHistory) {
  const enter = new Set();

  const convertTimeToSec = (time) => {
    const [H, M] = time.split(':').map(Number);
    return (H * 60 * 60) + (M * 60);
  }

  const [start, end, endStreaming] = [convertTimeToSec(s), convertTimeToSec(e), convertTimeToSec(q)];
  let cnt = 0;

  for (const [time, name] of chatHistory) {
    const sec = convertTimeToSec(time);
    if (sec <= start) {
      enter.add(name);
      continue;
    }

    if (sec >= end && sec <= endStreaming) {
      enter.has(name) && cnt++;
      enter.delete(name);
    }
  }

  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(S, E, Q, CHATHISTORY);
console.log(result);