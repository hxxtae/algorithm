const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim().split(' ').map(Number));
const [N, M, CONNECT] = [
  input[0][0],
  input[1][0],
  input.slice(2)
];

// -------------
// 풀이 1 (DFS)
// -------------
function solution1(n, m, connect) {
  const graph = Array.from({ length: N }, () => []);
  for (const [a, b] of connect) {
    graph[a - 1].push(b - 1);
    graph[b - 1].push(a - 1);
  }

  const visited = Array(n).fill(0);
  const dfs = (node) => {
    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = 1;
      dfs(next);
    }
  }
  visited[0] = 1;
  dfs(0);
  return visited.reduce((sum, com) => sum + com, 0) - 1;
}

// -------------
// 풀이 2 (BFS)
// -------------
function solution2(n, m, connect) {
  const graph = Array.from({ length: N }, () => []);
  for (const [a, b] of connect) {
    graph[a - 1].push(b - 1);
    graph[b - 1].push(a - 1);
  }
  const bfs = () => {
    const visited = Array(N).fill(0);
    const queue = [0];
    visited[0] = 1;

    while (queue.length) {
      const node = queue.shift();
      for (const next of graph[node]) {
        if (visited[next]) continue;
        visited[next] = 1;
        queue.push(next);
      }
    }
    return visited.reduce((sum, com) => sum + com, 0) - 1;
  }
  return bfs();
}

// -------------
// 출력
// -------------
const count1 = solution1(N, M, CONNECT);
console.log(count1);
const count2 = solution2(N, M, CONNECT);
console.log(count2);


