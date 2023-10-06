const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [K] = input[0];

// -------------
// 풀이 (DFS)
// -------------
function solution1(v, e, list) {
  const graph = Array.from({ length: v + 1 }, () => []);
  for (const [node1, node2] of list) {
    graph[node1].push(node2);
    graph[node2].push(node1);
  }
  const visited = Array(v + 1).fill(0);
  
  const dfs = (node, kind) => {
    for (const adjNode of graph[node]) {
      // 인접 노드 이분그래프 여부 확인
      if (visited[adjNode] === kind) {
        result = false;
        return;
      }
      
      // 인접 노드 방문 확인
      if (!visited[adjNode]) {
        visited[adjNode] = -kind;
        dfs(adjNode, -kind);
        if (!result) return;
      }
    }
  }

  let result = true;
  // 연결 그래프 & 비연결 그래프인 경우 고려
  for (let i = 1; i <= v; i++) {
    if (!result) break;
    if (!visited[i]) {
      visited[i] = 1;
      dfs(i, 1);
    }
  }
  return result ? 'YES' : 'NO';
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(v, e, list) {
  const graph = Array.from({ length: v + 1 }, () => []);
  for (const [node1, node2] of list) {
    graph[node1].push(node2);
    graph[node2].push(node1);
  }
  
  const visited = Array(v + 1).fill(0);

  const bfs = (node, kind) => {
    const queue = [[node, kind]];
    visited[node] = kind;
    while (queue.length) {
      const [nowNode, nowKind] = queue.shift();
      for (const adjNode of graph[nowNode]) {
        if (visited[adjNode] === nowKind) {
          result = false;
          return;
        }

        if (!visited[adjNode]) {
          queue.push([adjNode, -nowKind]);
          visited[adjNode] = -nowKind;
        }
      }
    }
  }

  let result = true;
  for (let i = 1; i <= v; i++) {
    if (!result) break;
    if (!visited[i]) {
      bfs(i, 1);
    }
  }
  return result ? "YES" : "NO";
}

// -------------
// 출력
// -------------
let end = 0;
for (let i = 1; i < input.length;) {
  const [V, E] = input[i];
  const start = i + 1;
  const [...list] = input.slice(start, start + E);
  i = start + E;
  const result1 = solution1(V, E, list);
  console.log(result1);
}

// [접근]
// ※ 이분 그래프의 정의
// 인접한 정점끼리는 다른 색상으로 분류되도록 그려진 그래프를 말한다.
// 즉, 인접한 정점끼리 서로 다른 색으로 칠해서 모든 정점을 두 가지 색으로만 칠할 수 있는 그래프이다.
// (서로 인접한 정점이 같은 색이면 이분 그래프가 아니다.)

// 1. BFS, DFS로 탐색하면서 정점을 방문할 때마다 두 가지 색 중 하나를 칠한다.
// 2. 다음 정점을 방문하면서 자신과 인접한 정점은 자신과 다른 색으로 칠한다.
// 3. 탐색을 진행할 때 자신과 인접한 정점의 색이 자신과 동일하면 이분 그래프가 아니다.
//    - BFS의 경우 정점을 방문하다가 만약 같은 레벨에서 정점을 다른 색으로 칠해야 한다면 무조건 이분 그래프가 아니다.
// 4. 모든 정점을 다 방문했는데 위와 같은 경우가 없다면 이분 그래프이다.

// ⚠ 이때 주의할 점은 연결 그래프와 비연결 그래프를 둘 다 고려 해야한다는 것이다.
// 그래프가 비연결 그래프인 경우 모든 정점에 대해서 확인하는 작업이 필요하다.


