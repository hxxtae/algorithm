const fs = require('fs');
const stdin = fs.readFileSync('./input_5.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, R], ...TREE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, r, tree) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, d] of tree) {
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  }
  
  // NOTE: 1. 기둥 탐색
  const dfsOfPiller = (node) => {
    visited[node] = 1;
    // NOTE: 기가노드 또는 기가노드가 리프노드인 경우
    if (graph[node].length > 2 || (node !== r && graph[node].length === 1)) {
      return node;
    }
    // NOTE: 기가노드가 루트노드인 경우
    if (node === r && graph[node].length >= 2) {
      return node;
    }
    for (const [next, val] of graph[node]) {
      if (visited[next]) continue;
      pillerCnt += val;
      const giga = dfsOfPiller(next);
      if (giga) return giga;
    }
  }

  // NOTE: 2. 가지 탐색
  const dfsOfBranch = (node, cnt) => {
    visited[node] = 1;
    if (graph[node].length === 1) {
      maxBranchCnt = Math.max(maxBranchCnt, cnt);
      return;
    }
    for (const [next, val] of graph[node]) {
      if (visited[next]) continue;
      dfsOfBranch(next, cnt + val);
    }
  }

  let pillerCnt = 0, maxBranchCnt = 0;
  if (!tree?.length) return [pillerCnt, maxBranchCnt].join(' ');
  
  const gigaNode = dfsOfPiller(r);
  dfsOfBranch(gigaNode, 0);

  return [pillerCnt, maxBranchCnt].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, R, TREE);
console.log(result);