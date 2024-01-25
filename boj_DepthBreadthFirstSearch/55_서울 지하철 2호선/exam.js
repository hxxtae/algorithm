const fs = require('fs');
const stdin = fs.readFileSync('./input_6.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...SUBWAY] = input;

// -------------
// 풀이 (DFS, BFS)
// -------------
function solution(n, subway) {
  const visited = Array(n + 1).fill(-1);
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [from, to] of subway) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const dfsOfCycle = (node, deep, start) => {
    for (const next of graph[node]) {
      if (deep > 2 && next === start)
        return true;
      if (visited[next] === -1) {
        visited[next] = 0;
        const cycle = dfsOfCycle(next, deep + 1, start);
        if (cycle) return true;
        visited[next] = -1;
      }
    }

    return false;
  }

  // DFS
  const dfs = (node, cnt) => {
    for (const next of graph[node]) {
      if (visited[next] === -1) {
        visited[next] = cnt;
        dfs(next, cnt + 1);
      }
    }
  }

  // BFS
  const bfs = (start) => {
    const queue = [[start, 0]];

    while (queue.length) {
      const [node, cnt] = queue.shift();
      for (const next of graph[node]) {
        if (visited[next] === -1) {
          visited[next] = cnt + 1;
          queue.push([next, cnt + 1]);
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    visited[i] = 0;
    const cycle = dfsOfCycle(i, 1, i);
    if (cycle) break;
    visited[i] = -1;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i] === 0) {
      // dfs(i, 1); // DFS
      bfs(i); // BFS
    }
  }
  
  return visited.slice(1).join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, SUBWAY);
console.log(result);

// [접근]
// 문제에서 요구하는 바는 순환하지 않는 노선(지선)에서 순환하는 노선 까지의 거리를 구하면 된다.

// 1. 순환하는 노선의 노드(정점)들을 구한다.
// 2. 지선에서 순환하는 노선까지의 거리를 구한다. (간선의 합)
//    - 또는, 순환하는 노선에서 각 지선까지의 거리를 구한다. (간선의 합)

// 1)
// 순환하는 즉, 사이클을 이루는 노드를 판단하는 조건은 다음과 같다.
// - 사이클의 시작 노드와 사이클이 끝나는 노드가 같으면, 탐색한 모든 노드는 사이클 노드들이다.
// - 단, 3개 이상의 노드를 가져야 한다. (3개 노드 이상 탐색해야 한다.)

// 2)
// 다음으로 각 '지선 노드'에서 '순환 노드' 까지의 거리를 측정한다.
// - 위 풀이에서는 '순환 노드' 에서 각 '지선 노드' 까지의 거리를 측정하였다.
// - DFS or BFS 탐색 알고리즘 둘 다 활용 가능하다.