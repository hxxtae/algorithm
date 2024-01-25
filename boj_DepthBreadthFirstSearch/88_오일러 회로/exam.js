const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...MATRIX] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, matrix) {
  const route = [];
  const degree = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= n; c++) {
      let val = matrix[r - 1][c - 1];
      if (!val) continue;
      while (val--) {
        graph[r].push(c);
        degree[c]++;
      }
    }
  }

  // NOTE: 오일러 회로 경로 탐색
  const dfs = (node) => {
    while (graph[node + 1].length) {
      const next = graph[node + 1].pop();
      if (!matrix[node][next - 1] || !matrix[next - 1][node]) continue;
      matrix[node][next - 1]--;
      matrix[next - 1][node]--;
      dfs(next - 1);
    }
    
    route.push(node + 1);
  }

  // NOTE: 오일러 회로가 아닌 경우
  // - 정점의 차수(간선의 개수)가 홀수인 정점이 존재하는 경우
  for (let i = 1; i <= n; i++) {
    if (degree[i] % 2) return -1;
  }

  dfs(0);

  return route.join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, MATRIX);
console.log(result);

// [접근]
// ### 개념
// 무방향이나 유방향 그래프가 있을 때, 그래프에 존재하는 모든 간선을 정확히 1번씩만 방문하는 연속된 경로가 바로 오일러 경로 및 회로 입니다.
// 이때 시작점과 도착점이 같으면 오일러 회로가 되고, 아닐 경우 그냥 오일러 경로가 됩니다.

// 무방향 그래프의 경우, 차수(degree)가 홀수인 정점이 2개일 때 오일러 경로(회로가 아닌)가, 0개일 때 오일러 회로가 존재하고
// 오일러 경로는 시작점과 끝점을 차수가 홀수인 정점 2개로 하며, 오일러 회로는 존재만 한다면 그 어떤 정점을 시작점으로 뽑아도 만드는 것이 가능합니다.
// ref: https://blog.naver.com/kks227/220800097205

// ### 제출 문제
// 현재 nodejs로 제출 시 런타임 에러(StackSizeExceeded) 가 발생한다.