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
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    graph[conn[i][0]].push(conn[i][1]);
    graph[conn[i][1]].push(conn[i][0]);
  }

  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => b - a);
  }
  
  const dfs = (node, rank) => {
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = rank;
        rank = dfs(next, rank + 1);
      }
    }
    return rank;
  }

  visited[r] = 1;
  dfs(r, 2);
  return visited.slice(1).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, CONN);
console.log(result);