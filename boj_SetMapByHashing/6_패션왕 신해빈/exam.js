const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const LEN = input.length;
for (let i = 1; i < LEN;) {
  const N = +input[i++];
  const CLOTHES = input.slice(i, i + N);
  const result = solution(N, CLOTHES);
  console.log(result);
  i += N;
}

// -------------
// 풀이
// -------------
function solution(n, clothes) {
  const clothesMap = new Map();
  clothes.forEach((item) => {
    const category = item.split(' ')[1];
    clothesMap.set(category, (clothesMap.get(category) || 1) + 1);
  });

  let result = 1;
  clothesMap.forEach(val => result *= val);
  
  return result - 1;
}

// [접근]
// ### 방법
// 각 카테고리별 의상 개수의 조합을 구한 뒤 카테고리별 조합을 모두 곱해주면 된다. 그리고 마지막에 1을 빼준다.
// 중요한 점은 의상의 개수에 아무것도 안 입었을 경우를 추가해 주어 조합을 구해야 한다.
// - headgear: [hat, turban, null] -> 3개
// - eyewear: [sunglasses, null] -> 2개
// - 3 x 2 = 6

// 그리고 마지막에 전부 null 인 경우, 즉 전부 아무 의상도 안 입었을 경우를 제외시켜 주기 위해 조합에서 1을 빼준다.
// - 6 - 1 = 5
