const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, R], ...TREE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, r, tree) {
  const visited = Array.from({length: n + 1}, () => [0, -1]); // [방문 순서, 깊이]
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of tree) {
    graph[a].push(b);
    graph[b].push(a);
  }

  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => a - b);
  }

  const dfs = (node, deep, order) => {
    visited[node][0] = order;
    visited[node][1] = deep;
    for (const next of graph[node]) {
      if (visited[next][0]) continue;
      order = dfs(next, deep + 1, order + 1);
    }

    return order;
  }

  dfs(r, 0, 1); // parameter: (시작노드_R, 탐색 깊이, 방문 순서)
  const result = visited.reduce((sum, [order, deep]) => sum + (order * deep), 0);
  
  return result;
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, TREE);
console.log(result);

// [접근]
// ### 요구사항
// 문제 요구: i번 정점의 방문순서 x i번 정점의 깊이 -> N개 정점의 값의 합

// [방문 순서 초기값]
// - 시작 정점 R의 방문 순서: 1
// - 방문할 수 없는 노드의 방문 순서: 0

// [깊이 초기값]
// - 시작 정점 R의 깊이: 0
// - 아직 방문되지 않은 정점의 깊이: -1

