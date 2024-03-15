const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const T = +input[0];
for (let i = 0, idx = 1; i < T; i++) {
  const N = +input[idx++];
  const PUBLIC_KEY_1 = input[idx++].split(' ');
  const PUBLIC_KEY_2 = input[idx++].split(' ');
  const CRYP = input[idx++].split(' ');
  console.log(solution(N, PUBLIC_KEY_1, PUBLIC_KEY_2, CRYP));
}

// -------------
// 풀이
// -------------
function solution(n, publicKey1, publicKey2, cryp) {
  const publicKey2Map = new Map(publicKey2.map((key, idx) => [key, idx + 1]));
  const crypMap = new Map(cryp.map((key, idx) => [idx + 1, key]));
  const answer = [];
  
  publicKey1.forEach((key) => {
    // 1. 공개키2와 공개키1을 비교하여 규칙성 구하기
    const order = publicKey2Map.get(key)

    // 2. 규칙성을 가지고 암호문을 평문으로 변환하기
    answer.push(crypMap.get(order));
  });

  return answer.join(' ');
}
