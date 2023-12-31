const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
input.shift();
const LEN = input.length;
for (let i = 0; i < LEN;) {
  const [N, M] = input[i].split(' ').map(Number);
  i++;
  const BRIDGES = input.slice(i, i + M).map(item => item.split(' ').map(Number));
  i += M;
  const result = solution(N, M, BRIDGES);
  console.log(result);
}

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, bridges) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(0);
  for (const [a, b, val] of bridges) {
    graph[a].push([b, val]);
    graph[b].push([a, val]);
  }
  
  const dfsOfReverse = (node, dynamite) => {
    visited[node] = 1;
    let sum = 0;

    for (const [next, nextDynamite] of graph[node]) {
      if (visited[next]) continue;
      sum += dfsOfReverse(next, nextDynamite);
    }

    if (sum === 0) return dynamite; // LEAF_NODE Return.
    if (node === 1) return sum;     // ROOT_NODE Return.
    return Math.min(sum, dynamite); // DEFAULT_NODE Return.
  }
  
  const minDynamite = dfsOfReverse(1, 0);

  return minDynamite;
}


// [접근]
// ### 방법
// 각 리프 노드를 시작으로 부모 노드로 올라가면서,
// 자식 노드들의 다이너마이트 비용의 합과 부모 노드로 가는 다이너마이트 비용 중에서 최소값을 최종 비용으로 가져간다.

// ### 흐름
// 리프 노드로부터 부모 노드로 거쳐 올라 가면서,
// 자식 노드들의 간선의 합(다이너마이트 합의 크기)과 부모 노드로 올라가는 간선(다이너마이트 크기)을 비교하여
// 최소값을 넘긴다.
// 1. 현재 노드에서 자식 노드들의 간선 크기의 합 (1)
// 2. 현재 노드에서 부모로 가는 간선의 크기 (2)
// 3. (1)과 (2)의 최소값을 다음 노드의 간선의 크기의 합에 반환한다.
// 4. 위 1 ~ 3 과정을 리프 노드에서부터 루트 노드까지 반복한다.

// 유사한 알고리즘으로는 "전단지 돌리기" 문제와 비슷하다.
// -> dfsOfReverse 함수에서 leaf 노드에서 부터 dfs의 재귀를 반환하는 방식이 유사하다.