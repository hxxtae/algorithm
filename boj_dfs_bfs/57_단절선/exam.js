const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[V, E], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(v, e, conn) {
  conn = conn.slice(0, e);
  const visited = Array(v + 1).fill(-1);
  const resultArr = [];
  const graph = Array.from({ length: v + 1 }, () => []);
  for (const [A, B] of conn) {
    graph[A].push(B);
    graph[B].push(A);
  }
  
  const dfs = (node, parent) => {
    visited[node] = ++cnt;
    let num = visited[node]; // 현재 노드 방문 순서
    
    for (const next of graph[node]) {
      if (next === parent) continue;
      if (visited[next] === -1) {
        let low = dfs(next, node);
        num = Math.min(num, low);
        if (low > visited[node]) {
          resultArr.push([Math.min(node, next), Math.max(node, next)]);
        }
      } else {
        num = Math.min(num, visited[next]);
      }
    }

    return num;
  }

  let cnt = 0;
  for (let i = 0; i < v; i++) {
    dfs(i, -1);
  }

  resultArr.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  const result = resultArr.map(arr => arr.join(' ')).join('\n');
  return `${resultArr.length}\n${result}`;
}

// -------------
// 출력
// -------------
const result = solution(V, E, CONN);
console.log(result)
