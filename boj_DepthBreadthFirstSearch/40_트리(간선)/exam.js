const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));

// -------------
// 풀이 (DFS)
// -------------
function solution(n, conn) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of conn) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (node, nodeCnt, connCnt) => {
    for (const next of graph[node]) {
      connCnt++;
      if (!visited[next]) {
        visited[next] = 1;
        [nodeCnt, connCnt] = dfs(next, nodeCnt + 1, connCnt);
      }
    }
    return [nodeCnt, connCnt];
  }

  let treeCount = 0;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      const [nodeCount, connCount] = dfs(i, 1, 0);
      if ((nodeCount - 1) === (connCount / 2)) 
        treeCount++;
    }
  }
  return treeCount;
}

// -------------
// 출력
// -------------
const resultStr = (caseCount, count) => {
  let str = '';
  if (!count) str = "No trees.";
  if (count === 1) str = "There is one tree.";
  if (count > 1) str = `A forest of ${count} trees.`;
  return `Case ${caseCount}: ${str}`
}

for (let i = 0, caseCnt = 1; i < input.length - 1; caseCnt++) {
  const [N, M] = input[i++];
  const CONN = input.slice(i, i + M);
  const cnt = solution(N, CONN);
  console.log(resultStr(caseCnt, cnt));
  i += M;
}

// [접근]
// DFS나 BFS로 visited를 체크해서 노드의 개수를 셀수는 있지만,
// 간선의 개수 체크를 어떻게 해야할지 모르고 있었다.
// (노드의 개수) - (간선의 개수) = 1 인 그래프는 트리가 성립된다는 성질을 이용하면 해당 문제를 풀수 있다.
// -> N = M + 1

// 일단 (노드의 개수) - (간선의 개수) = 1 이 되면 사이클이 발생하지 않는 그래프 즉, 트리가 된다.
// DFS를 탐색하면서 노드의 개수를 카운트 하면서 간선의 개수는 노드 방문 여부에 상관없이 카운트해 주면,
// (DFS 노드 카운트 = (DFS 간선 카운트 / 2) - 1) 처럼 식이 성립 될 수 있다.
// -> DFS를 통해 간선의 양쪽 노드를 각각 한 번 씩 카운트 하기 때문에 간선의 (카운트 개수)는 (간선의 개수 * 2) 나오게 된다.

// ---

// 트리(Tree)
// - N(노드의 개수) = M(간선의 개수) + 1 성립
// - 사이클이 없는 그래프
// - root가 존재하는 그래프
// - 양 정점을 이은 간선은 한번만 지난다.
