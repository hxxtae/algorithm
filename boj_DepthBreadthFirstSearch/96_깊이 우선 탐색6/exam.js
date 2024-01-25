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
  const visited = Array(n + 1).fill([-1, 0]); // NOTE: [deep, order]
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of tree) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => b - a);
  }

  const dfs = (node, deep, order) => {
    visited[node] = [deep, order];
    for (const next of graph[node]) {
      if (visited[next][1]) continue;
      order = dfs(next, deep + 1, order + 1);
    }

    return order;
  }

  dfs(r, 0, 1);
  return visited.reduce((sum, [d, t]) => sum += (d * t), 0);
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, TREE);
console.log(result);

// [접근]
// ### 요구사항
// 문제 요구: i번 정점의 깊이(d) x i번 정점의 방문순서(t) -> N개 정점의 값의 합

// [깊이 초기값]
// - 시작 정점 R의 깊이: 0
// - 아직 방문되지 않은 정점의 깊이: -1

// [방문 순서 초기값]
// - 시작 정점 R의 방문 순서: 1
// - 방문할 수 없는 노드의 방문 순서: 0


