const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, S, D], ...TREE_LOAD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, s, d, tree_load) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const nodes = Array(n + 1).fill(-1);
  const visited = Array(n + 1).fill(0);
  for (const [a, b] of tree_load) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // NOTE: 각 노드로부터 리프노드와 거리를 구하는 함수(최대 거리 set)
  const setDistanceToLeaf = (node) => {
    let maxDistance = 0;
    visited[node] = 1;
    for (const next of graph[node]) {
      if (visited[next]) continue;
      maxDistance = Math.max(maxDistance, 1 + setDistanceToLeaf(next));
    }
    nodes[node] = maxDistance;
    return maxDistance;
  }

  // NOTE: 이동할 수 있는 거리 탐색 함수(왕복 거리 count)
  const onMoveOfDistance = (node, sum) => {
    visited[node] = 1;
    for (const next of graph[node]) {
      if (visited[next]) continue;
      if (nodes[next] < d) continue;
      sum = onMoveOfDistance(next, sum + 1);
      sum += 1;
    }

    return sum;
  }

  setDistanceToLeaf(s);
  visited.fill(0);
  const distance = onMoveOfDistance(s, 0);
  return distance;
}

// -------------
// 출력
// -------------
const result = solution(N, S, D, TREE_LOAD);
console.log(result);

// [접근]
// 모든 곳에 전단지를 돌리는데, 최소한으로 이동하여 던져야 한다.
// 여기서 최소한이란 힘(D)으로 던질 수 있는 곳은 굳이 이동하지 않고 전단지를 던져서 전달하도록 한다.

// ### 함수 정의(리프노드와 각 노드 사이의 거리)
// - 각 리프노드를 시작으로 각 노드와의 거리를 구한다.
// - 리프노드에서 힘(D)만큼의 거리(간선의 길이 합)는 이동할 필요가 없는 거리가 된다.
// - 리프노드를 기준으로 거리를 0으로 두고 힘(D)의 거리 만큼 각 노드에 리프노드와의 거리를 증가시켜준다.
// - 각 리프노드로부터 각 노드까지의 거리 값을 할당할 때 이미 할당된(중복된) 거리값이 존재하면, 해당 노드에는 가장 먼 리프노드와의 거리값을 할당한다.

// ### 함수 정의(이동할 수 있는 거리 탐색)
// - 노드에서 할당된 거리값이 힘(D)의 크기와 같거나 크다면 다음 노드로 이동한다.
// - 노드에 할당된 거리값이 힘(D)의 크기보다 작다면 다음 노드로 이동하지 않는다.
