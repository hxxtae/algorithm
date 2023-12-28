const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, R], ...GRAPH] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, r, graph) {
  const visited = Array(n + 1).fill(-1);
  const dfsTree = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of graph) {
    dfsTree[a].push(b);
    dfsTree[b].push(a);
  }
  for (let i = 1; i <= n; i++) 
    dfsTree[i].sort((a, b) => a - b);
  
  const dfs = (node, deep) => {
    visited[node] = deep;

    for (const next of dfsTree[node]) {
      if (visited[next] !== -1) continue;
      dfs(next, deep + 1);
    }
  }

  dfs(r, 0); // dfs(node, deep)

  return visited.slice(1).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, R, GRAPH);
console.log(result);

// [접근]

// 문제에서는 양뱡향 그래프가 주어진다. 그리고 DFS 탐색 과정을 통해 인접 노드를 오름차순 순으로 방문하면
// Tree 형태가 만들어 진다고 한다. 즉, DFS-Tree 라고 한다.

// ### 과정
// 1. 입력값으로 주어진 양방향 그래프를 인접리스트 그래프로 나타낸다.
// 2. 인접리스트로 생성된 그래프의 각 노드의 배열(노드의 인접리스트)을 오름차순으로 정렬한다.
// 3. DFS 탐색을 통해 깊이를 증가시키면서 탐색을 수행한다.
//    - 탐색을 통해 visited에 "방문 여부"와 "깊이 값"을 메모이제이션 한다.