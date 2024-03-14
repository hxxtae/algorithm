const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...CARDS] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, cards) {
  const cardKinds = [["STRAWBERRY", 0], ["BANANA", 0], ["LIME", 0], ["PLUM", 0]];
  const cardMap = new Map(cardKinds);

  cards.forEach((card) => {
    const [name, cnt] = card.split(' ');
    cardMap.set(name, (cardMap.get(name) + Number(cnt)));
  });
  
  return [...cardMap.values()].some(cnt => cnt === 5) ? "YES" : "NO";
}

// -------------
// 출력
// -------------
const result = solution(N, CARDS);
console.log(result);