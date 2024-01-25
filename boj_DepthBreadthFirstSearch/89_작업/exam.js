const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [X] = input.pop();
const [[N, M], ...WORKS] = input;

// -------------
// 풀이 (DFS) - 시간초과
// -------------
function solution1(n, m, x, works) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of works) {
    graph[a].push(b);
  }
  
  const dfs = (node, cnt) => {
    if (node === x || visited[node] === 1) {
      workCnt += cnt;
      return true;
    }
    for (const next of graph[node]) {
      const end = dfs(next, cnt + 1);
      if (end) {
        visited[next] = 1;
        return true;
      } else {
        visited[next] = -1;
      }
    }

    return false;
  }

  let workCnt = 0;
  for (let start = 1; start <= n; start++) {
    if (visited[start]) continue;
    const end = dfs(start, 0);
    if (end) visited[start] = 1;
    else visited[start] = -1;
  }

  return workCnt;
}

// -------------
// 풀이 (DFS)
// -------------
function solution2(n, m, x, works) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of works) {
    graph[b].push(a);
  }
  
  const dfs = (node, cnt) => {
    visited[node] = 1;
    for (const next of graph[node]) {
      if (visited[next]) continue;
      cnt = dfs(next, cnt + 1);
    }

    return cnt;
  }
  
  return dfs(x, 0);
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, X, WORKS);
const result2 = solution2(N, M, X, WORKS);
console.log(result1);
console.log(result2);

// [접근]
// ### 방법
// 단방향 그래프로, 정점 X와 이어진 모든 정점들의 개수를 구하는 문제이다.
// 각 정점으로 부터 X까지 탐색하면서 정점의 개수를 구하면 풀이가 복잡해지고 어려워 진다.
// 어차피 도착지가 X정점 이므로 X에서 부터 뻗어 나가는 정점들의 개수를 구하면 쉽게 X로 부터 이어진 정점의 개수를 구할 수 있다.

// 문제에서 주어진 단뱡향 그래프는 X를 도착지로 단방향 그래프이므로,
// 방향을 반대 방향으로 새롭게 그래프로 그려준다면 X를 시작점으로 하여 단방향 그래프 탐색을 수행하면 된다.

// ### 풀이 설명
// 첫 번째 풀이의 경우 단방향 그래프의 각 정점으로 부터 도착점 X정점 까지 이어지는 정점들의 개수를 구한다.
// -> 시간초과 발생

// 두 번째 풀이의 경우 단방향 그래프의 방향을 반대로 하여 시작점 x정점으로 부터 이어지는 정점들의 개수를 구한다.
// -> 성공