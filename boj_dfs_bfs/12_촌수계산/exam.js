const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim().split(' ').map(Number));
const [[N], [P1, P2], [M], ...RELATION] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, p1, p2, m, relation) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [x, y] of relation) {
    graph[x].push(y);
    graph[y].push(x);
  }

  let result = -1;
  const visited = Array(n + 1).fill(0);
  const dfs = (deep, p) => {
    if (p === p2) {
      result = deep;
      return;
    }
    for (const next of graph[p]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(deep + 1, next);
        visited[next] = 0;
      }
    }
  }

  visited[p1] = 1;
  dfs(0, p1);
  return result;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, p1, p2, m, relation) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [x, y] of relation) {
    graph[x].push(y);
    graph[y].push(x);
  }
  
  const visited = Array(n + 1).fill(0);
  
  const bfs = () => {
    let result = -1;
    const queue = [[p1, 0]];
    visited[p1] = 1;

    while (queue.length) {
      const [p, deep] = queue.shift();
      if (p === p2) {
        result = deep;
        break;
      }

      for (const next of graph[p]) {
        if (!visited[next]) {
          visited[next] = 1;
          queue.push([next, deep + 1]);
        }
      }
    }
    return result;
  }
  return bfs();
}

// -------------
// 출력
// -------------
const result1 = solution1(N, P1, P2, M, RELATION);
const result2 = solution2(N, P1, P2, M, RELATION);
console.log(result1)
console.log(result2)
