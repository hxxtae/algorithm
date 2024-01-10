const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.split(' ').map(Number));
const [[N], ...SALES] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, sales) {
  const visited = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)); // NOTE: row: 특정날짜, col: 떡의 종류
  const resultArr = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < n; i++) {
    const [_, ...riceCakes] = sales[i];
    graph[i + 1] = riceCakes;
  }
  
  const dfs = (day, cake) => {
    visited[day][cake] = 1;
    resultArr[day] = cake;
    if (day === n) {
      return true;
    }
    for (const next of graph[day + 1]) {
      if (visited[day + 1][next]) continue; // NOTE: 다음날 줄 떡이 이미 이전에 떡을 준 이력이 있는 경우
      if (cake === next) continue; // NOTE: 다음날 줄 떡이 이전날과 같은 떡인 경우
      const end = dfs(day + 1, next);
      if (end) return true;
    }

    return false;
  }

  let result = false;
  for (const cake of graph[1]) {
    result = dfs(1, cake);
    if (result) return resultArr.slice(1).join('\n');
  }

  return -1;
  
}

// -------------
// 출력
// -------------
const result = solution(N, SALES);
console.log(result);

//[접근]
// ### 탐색 방법
// 쳇째날 떡의 종류를 기준으로 탐색이 시작된다.
// 현재 날짜에서 다음날 나누어줄 떡의 종류를 판단해야 한다. 그 조건으로
// - 다음 날짜에 나누어줄 떡의 종류가 현재 날짜의 떡의 종류와 달라야 한다.
// - 다음 날짜에 나누어줄 떡의 종류가 이미 나눠준 이력이 있는 경우 건너뛴다.

// ### 건너뛰는 이유
// 해당 3일 날짜에서 A종류의 떡을 나눠준다면 다음 4일 날짜에서 B의 종류의 떡을 나눠줄 것이다.
// 만약 3일 날짜에 이미 A종류의 떡을 나눠준 이력을 무시하고 다시 DFS 탐색을 한다면
// 또 다시 4일 날짜에 B종류의 떡을 나눠줄 것이다.
// -> 시간초과

// 그렇기 때문에 이력을 남겨 해당 날짜에 해당 종류의 떡을 나눠준 이력이 있는 경우 재탐색을 배재한다.
// -> 메모이제이션

