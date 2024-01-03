const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const LEN = input.length;
for (let i = 1; i < LEN;) {
  const [N, M] = input[i++];
  const NODES = input.slice(i, i + M);
  i += M;
  const result1 = solution1(N, M, NODES);
  const result2 = solution2(N, M, NODES);
  console.log(result1 ? 'possible' : 'impossible');
  console.log(result2 ? 'possible' : 'impossible');
}

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, nodes) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of nodes) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (node, color) => {
    visited[node] = color;
    for (const next of graph[node]) {
      if (visited[next] === color) return false;
      if (visited[next]) continue;

      const result = dfs(next, -color);
      if (!result) return false;
    }

    return true;
  }

  let kind = 1; // 1 or -1
  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    const result = dfs(i, kind);
    if (!result) return false;
  }

  return true;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, nodes) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of nodes) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const bfs = (initNode) => {
    const kind = 1;
    const queue = [[initNode, kind]]; // [node, color]
    visited[initNode] = kind;
    
    while (queue.length) {
      const [node, color] = queue.shift();
      for (const next of graph[node]) {
        if (visited[next] === color) return false;
        if (visited[next]) continue;
        visited[next] = -color;
        queue.push([next, -color]);
      }
    }

    return true;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    const result = bfs(i);
    if (!result) return false;
  }

  return true;
}

// [접근]
// ### 이분 그래프
// 이분 그래프는 정점의 색깔을 빨강, 파랑으로 색을 칠한다고 한다면
// 각 정점에서 인접한 두 정점이 다른 색으로 칠해질 수 있는 그래프를 의미한다.
// 즉, 각 정점이 인접한 정점과 다른 색을 가지고 있어야 한다.

// ### 과정
// 아무 동그라미(노드)에서 탐색을 시작혀여 색칠을 칠하면서 인접한 동그라미(노드)에는 다른 색으로 칠한다.
// - 현재 동그라미(노드)에서 인접한 동그라미(노드)는 다른 색으로 칠한다.
// - 현재 동그라미(노드)에서 인접한 동그라미(노드)에 이미 색칠한 동그마리(노드)가 존재한다면
//   현재 동그라미(노드)와 동일한 색인지 아닌지 확인한다.
// - 현재 동그라미(노드)와 인접한 동그라미(노드)가 같은 색이면 함수를 종료하고 'impossible'을 반환한다.
// - 모든 탐색이 완료되면 'possible'를 반환한다.

