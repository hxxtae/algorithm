const fs = require('fs')
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[V], ...DATAS] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(v, datas) {
  const graph = Array.from({ length: v + 1 }, () => []);
  for (let i = 0; i < v; i++) {
    for (let d = 1; d < datas[i].length - 1; d += 2) {
      graph[datas[i][0]].push([datas[i][d], datas[i][d + 1]]);
    }
  }
  
  const visited = Array(v + 1).fill(0);

  let diameter = 0, diameterNode = 0;
  const dfs = (node, max) => {
    if (max > diameter) {
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
const result1 = solution1(V, DATAS);
console.log(result1);