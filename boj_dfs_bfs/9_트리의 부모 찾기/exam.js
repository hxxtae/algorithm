const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, conn) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of conn) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  const nodeParent = Array(n+1).fill(null);
  const dfs = (parent) => {
    for (const node of graph[parent]) {
      if (nodeParent[node] === null) {
        nodeParent[node] = parent;
        dfs(node);
      }
    }
  }
  nodeParent[1] = 1;
  dfs(1);

  return nodeParent.slice(2).join('\n');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, conn) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of conn) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const bfs = () => {
    const queue = [[1]];
    const nodeParent = Array(n + 1).fill(null);
    nodeParent[1] = 1;
    
    while (queue.length) {
      const parent = queue.shift();
      for (const node of graph[parent]) {
        if (nodeParent[node] === null) {
          nodeParent[node] = parent;
          queue.push(node);
        }
      }
    }
    return nodeParent.slice(2).join('\n');
  }

  return bfs();
}

// -------------
// 출력
// -------------
const result1 = solution1(N, CONN);
const result2 = solution2(N, CONN);
console.log(result1)
console.log(result2)

// [접근 - DFS]
// root를 1부터 시작한다고 하였다.
// DFS의 시작을 1부터 시작하여 1의 자식을 먼저 탐색한다.
// root부터 (1번 노드 부터) 시작되어 먼저 탐색된 자식 노드가 다음 자식 노드들의 부모 노드가 된다.
// 즉, root부터 먼저 탐색된 순서대로 탐색된 자식 노드의 부모 노드를 nodeParent의 각 인덱스에 할당하면 된다.