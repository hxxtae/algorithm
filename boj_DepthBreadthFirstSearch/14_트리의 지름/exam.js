const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...TREE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, tree) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [p, c, val] of tree) {
    graph[p].push([c, val]);
    graph[c].push([p, val]);
  }
  const visited = Array(n + 1).fill(0);
  
  let diameterNode = 0,
    diameter = 0;
  
  const dfs = (node, max) => {
    if (diameter < max) {
      diameter = max;
      diameterNode = node;
    }
    for (const [next, val] of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(next, max + val);
        visited[next] = 0;
      }
    }
  }
  
  visited[1] = 1;
  dfs(1, 0);
  visited[1] = 0;

  visited[diameterNode] = 1;
  dfs(diameterNode, 0);

  return diameter;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, TREE);
console.log(result1);

// [접근]
// 1. DFS를 통해 임의의 정점(x)으로부터 가장 먼 정점(y)을 구한다.
// 2. DFS를 통해 구해진 (y)정점으로부터 가장 먼 정점(z)를 구한다.
// 3. (y) 정점과 (z) 정점을 잇는 경로가 트리의 지름이 된다.
