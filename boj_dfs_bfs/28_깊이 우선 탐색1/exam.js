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
  // 1. 무방향 연결 리스트 구성 (그래프 구성)
  for (const [from, to] of conn) {
    graph[from].push(to);
    graph[to].push(from);
  }
  
  // 2. 각 노드로 부터 방문 노드들 오름차순 정렬
  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => a - b);
  }

  // 3. 깊이 우선 탐색으로 방문 순서(rank) 기록
  const dfs = (node, rank) => {
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = rank + 1;
        rank = dfs(next, rank + 1);
      }
    }
    return rank;
  }

  visited[r] = 1;
  dfs(r, 1);
  return visited.slice(1).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, CONN);
console.log(result);