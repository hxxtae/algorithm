const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [[N, GAME], PLAYERS] = [input[0].split(' '), input.slice(1)];

// -------------
// 풀이
// -------------
function solution(n, game, players) {
  const playRule = { Y: 2, F: 3, O: 4 };
  const playMember = new Set();
  let playCnt = 0;
  let ruleCnt = 1; // 1 -> 임스 자기 자신

  for (const name of players) {
    if (playCnt === n) break;
    if (playMember.has(name)) continue;

    playMember.add(name);
    ruleCnt += 1;
    if (ruleCnt === playRule[game]) {
      ruleCnt = 1;
      playCnt += 1;
    }
  }

  return playCnt;
}

// -------------
// 출력
// -------------
const result = solution(N, GAME, PLAYERS);
console.log(result);