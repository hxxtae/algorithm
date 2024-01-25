const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => parseInt(item.trim(), 10));
const [N, ...LINE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, line) {
  line.unshift(0);
  const visited = Array.from({ length: n + 1 }, () => 0);
  const result = [];

  const dfs = (node, startNode) => {
    const next = line[node];
    // 1. 왕복(Cycle)을 이루는 경우
    if (next === startNode) {
      // 2. 정점 기록
      result.push(node);
      return;
    }
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next, startNode);
      visited[next] = 0;
    }
  }

  // 각 정점 방문
  for (let i = 1; i <= n; i++) {
    visited[i] = 1;
    dfs(i, i);
    visited[i] = 0;
  }

  return [
    result.length,
    ...result.sort((a, b) => a - b)
  ].join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, LINE);
console.log(result);

// [접근]
// ※ 문제의 접근이 어려운 경우 해당 숫자를 정점으로 하는 그래프를 그려보면 쉽게 이해할 수 있다.
// 그래프1: 2 -> 1 <-> 3
// 그래프2: 7 -> 6 -> 4 -> 5

// 문제에서 조건이 첫번째 라인에서 선택한 번호의 집합과 선택에 따라오는 두번째 라인의 번호의 집합이
// 크기와 숫자가 일치해야 한다. 그리고 그 집합의 개수가 최대인 경우를 출력으로 한다.
// 즉, 뽑은 숫자와 딸려오는 숫자의 집합이 일치해야 하며, 집합의 크기의 최대값을 출력한다.

// 1. 첫번째 라인과 두번째 라인이 이루는 집합이 일치하는 경우의 조건 모두 탐색
//    -> 뱡향을 가지는 그래프로 왕복이 이루어 지는 경우가 조건이 일치하는 경우이다.
// 2. 그 중 집합의 개수가 가장 많은 것을 출력
//    -> 왕복이 이루어지는 모든 그래프 정점을 기록하여 그 크기를 출력한다.

