const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim()

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, TREE, Q, Q_ARR] = [
  +input[0],
  input.slice(1, +input[0]),
  input[+input[0]],
  input.slice(+input[0] + 1)
];

// -------------
// 풀이 (DFS)
// -------------
function solution(n, tree, q, q_arr) {
  const parents = Array(n + 1).fill(1);
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const uv of tree) {
    const [u, v] = uv.split(' ').map(Number);
    graph[u].push(v);
    graph[v].push(u);
  }

  const getParent = (node, sParent) => {
    while (node !== sParent[node]) {
      sParent[node] = sParent[sParent[node]];
      node = sParent[node];
    }
    return sParent[node];
  }

  const setParent = (nodeA, nodeB, sParent) => {
    const [a, b] = [getParent(nodeA, sParent), getParent(nodeB, sParent)];
    if (a > b) return sParent[a] = b;
    return sParent[b] = a;
  }

  const findParent = (nodeA, nodeB, sParent) => {
    const [a, b] = [getParent(nodeA, sParent), getParent(nodeB, sParent)];
    if (a === b) return true;
    return false;
  }

  // NOTE: DFS탐색을 통해 각 노드의 부모를 초기화 한다.
  // - DFS 재귀탐색 시 시간초과 발생
  const dfs = (node) => {
    visited[node] = 1;

    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = 1;
      parents[next] = node;
      dfs(next);
    }
  }

  // NOTE: BFS탐색을 통해 각 노드의 부모를 초기화 한다.
  const bfs = (root) => {
    const queue = [root];
    visited[root] = 1;
    while (queue.length) {
      const node = queue.pop();
      for (const next of graph[node]) {
        if (visited[next]) continue;
        visited[next] = 1;
        queue.push(next);
        parents[next] = node;
      }
    }
  }

  // dfs(1);
  bfs(1);
  let parentOfS = Array.from({ length: n + 1 }, (_, idx) => idx);
  const isinS = Array(n + 1).fill(0);
  
  for (let i = 0; i < q; i++) {
    const [K, ...S] = q_arr[i].split(' ').map(Number);
    for (const nodeS of S) isinS[nodeS] = 1;

    for (let j = 0; j < K; j++) {
      const node = S[j];
      if (isinS[parents[node]]) {
        if (!findParent(node, parents[node], parentOfS)) {
          setParent(node, parents[node], parentOfS);
        }
      }
    }

    for (const nodeS of S) {
      parentOfS[nodeS] = getParent(nodeS, parentOfS);
    }

    const sMap = new Map();
    for (const nodeS of S) {
      sMap.set(parentOfS[nodeS], (sMap.get(parentOfS[nodeS]) || 0) + 1);
    }
    
    console.log([...sMap.values()].reduce((sum, num) => sum + (num * (num - 1)) / 2, 0));

    isinS.fill(0);

    // NOTE: 이 부분이 21점의 원인이 아닐까 예상.. (parentOfS 초기화)
    parentOfS = Array.from({ length: n + 1 }, (_, idx) => idx);
  }

}

// -------------
// 출력
// -------------
solution(N, TREE, Q, Q_ARR);

// [접근]
// ### 설명
// 문제에서 요구하는 바는 다음과 같다.
// - 주어진 트리에서 S안에 존재하는 정점으로 다시 정점들 끼리 이어 트리를 나타낸다면 분리 집합된 한 개 이상의 트리가 만들어 진다.
// - 만들어진 각 트리에서 정점의 개수로 만들 수 있는 조합의 경우의 수를 구하면 된다.

// ### 과정
// - 주어진 트리를 DFS or BFS 탐색을 통해 각 정점에 부모의 정점 번호를 할당해 준다.
// - K 개의 테스트에서 S개의 정점을 통해 트리를 생성하면 분리 집합 즉, 한 개 이상의 트리가 구성된다.
// - 각 생성된 트리의 root를 가장 작거나 큰 정점의 번호로 root를 잡는다.
// - union 알고리즘(유니온파인드)을 활용해 각 트리에 이어진 두 정점 번호(정점 번호와 정점의 부모 번호)의 크기를 비교하여 트리의 정점을 root 번호로 몰아준다.
// - 각 트리의 정점의 개수로 조합의 경우의 수를 구한다.

// ### 기타
// - 시간복잡도(최대): O(N) + O(K ∗ α(K))
// - nodejs로 제출 시 점수: 21점