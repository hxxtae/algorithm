const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, R], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, r, conn) {
  const visited = Array(n + 1).fill(-1);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of conn) {
    graph[u].push(v);
    graph[v].push(u);
  }
  
  graph.forEach(arr => {
    arr.sort((a, b) => b - a);
  });
  
  const dfs = (node, deep) => {
    visited[node] = deep;
    for (const next of graph[node]) {
      if (visited[next] !== -1) continue;
      dfs(next, deep + 1);
    }
  }

  dfs(r, 0);

  return visited.slice(1).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, CONN);
console.log(result);