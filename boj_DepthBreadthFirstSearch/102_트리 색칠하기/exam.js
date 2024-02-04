const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], COLORS, ...TREE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, colors, tree) {
  colors.unshift(0);
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of tree) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  const dfs = (node, color) => {
    if (color !== colors[node]) {
      cnt += 1;
      color = colors[node];
    }
    visited[node] = 1;
    for (const next of graph[node]) {
      if (visited[next]) continue;
      dfs(next, color);
    }
  }

  let cnt = 0;
  dfs(1, 0); // (node, parent_color)

  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(N, COLORS, TREE);
console.log(result);

// [접근]
// ### 요구사항
// 문제에서 요구하는 바는 각 정점마다 정해진 색과 똑같은 색을 칠해야 하는데,
// 전부 0(흰색)인 정점에 색을 칠하면 몇 번 색칠해야 같아지는지 그 횟수를 구해야 한다.

// ### 방법
// 방법은 단순하다. DFS 탐색을 통해 부모의 색과 자식의 색이 일치하면 카운트 하지 않고,
// 부모의 색과 자식의 색이 다르면 색칠하는 횟수를 카운트 한다.
