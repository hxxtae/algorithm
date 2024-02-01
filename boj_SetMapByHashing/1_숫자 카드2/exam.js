const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], N_CARDS, [M], M_CARDS] = input;

// -------------
// 풀이
// -------------
function solution(n, nCards, m, mCards) {
  const mMap = new Map(mCards.map(card => [card, 0]));
  for (const card of nCards) {
    if (!mMap.has(card)) continue;
    mMap.set(card, mMap.get(card) + 1);
  }
    
  const result = [];
  for (const card of mCards) 
    result.push(mMap.get(card));

  return result.join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, N_CARDS, M, M_CARDS);
console.log(result);

// [접근]
// ### 방법
// N개의 카드를 가지고 있으며, 주어진 M개의 카드 중에서 N개의 카드가 몇개 있는지 출력해야 한다.
// 해시(mMap)를 만들고, N개의 카드를 반복하여 해시(mMap)의 키와 맵핑되는 N의 카드만 해시값을 카운트 해준다.
// 반복을 완료하고, 주어진 M개의 카드 순서대로 카드의 개수를 출력해 준다.
