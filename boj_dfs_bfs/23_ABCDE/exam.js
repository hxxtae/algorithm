const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, conn) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of conn) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const visited = Array(n).fill(0);
  let result = false;

  const dfs = (node, cnt) => {
    if (cnt === 5) {
      result = true;
      return;
    }
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(next, cnt + 1);
        if (result) return; // 백트래킹
        visited[next] = 0;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      dfs(i, 1, [i]);
      if (result) return 1;
      visited[i] = 0;
    }
  }
  return 0;
}

// -------------
// 출력
// -------------
const result = solution(N, CONN);
console.log(result);

// [추가 설명]
// "연속된 5개 노드"가 존재하는지 구하는 문제
// 정확히 5개의 노드가 아니라 5개의 노드 이상으로만 구성되면 된다.