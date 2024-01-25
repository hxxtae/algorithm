const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim().split(' '));
const [[N, M], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, conn) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of conn) {
    graph[a-1].push(b-1);
    graph[b-1].push(a-1);
  }
  
  const visited = Array(n).fill(0);
  const dfs = (node) => {
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(next);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      count++;
      dfs(i);
    }
  }

  return count;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, conn) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of conn) {
    graph[a - 1].push(b - 1);
    graph[b - 1].push(a - 1);
  }

  const visited = Array(n).fill(0);
  const bfs = (start) => {
    const queue = [start];
    visited[start] = 1;

    while (queue.length) {
      const node = queue.pop();
      for (const next of graph[node]) {
        if (!visited[next]) {
          visited[next] = 1;
          queue.push(next);
        }
      }
    }
  }
  
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      bfs(i);
    }
  }
  return count;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, CONN);
const result2 = solution2(N, M, CONN);
console.log(result1);
console.log(result2);
