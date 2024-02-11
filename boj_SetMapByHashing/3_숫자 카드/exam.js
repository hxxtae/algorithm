const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [[N], N_ARR, [M], M_ARR] = stdin.split('\n').map(item => item.trim().split(' ').map(Number));

// -------------
// 풀이 1
// -------------
function solution1(n, m, nArr, mArr) {
  const nMap = new Map();
  for (const card of nArr) 
    nMap.set(card, true);

  return mArr.map(card => nMap.has(card) ? 1 : 0).join(' ');
}

// -------------
// 풀이 2
// -------------
function solution2(n, m, nArr, mArr) {
  const nSet = new Set();
  for (const card of nArr)
    nSet.add(card);

  return mArr.map(card => nSet.has(card) ? 1 : 0).join(' ');
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, N_ARR, M_ARR);
const result2 = solution2(N, M, N_ARR, M_ARR);
// console.log(result1);
console.log(result2);

// [접근]
// ### 방법
// 문제에서 요구하는 바는 M개의 숫자카드 중에서 상근이가 가지고 있는 숫자 카드의 개수(N)를 주어진 M개의 순서대로 출력한다.
// 즉, 상근이 N개의 숫자카드를 해시로 두고 M개의 숫자 카드를 반복하여 M개의 카드에서 해시와 일치하는 숫자카드의 개수를 출력한다.