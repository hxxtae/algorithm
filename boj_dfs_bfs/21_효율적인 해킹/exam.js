const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...CONN] = input;

// -------------
// 풀이 (BFS)
// -------------
function solution1(n, m, conn) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let [a, b] of conn) {
    graph[b].push(a);
  }
  const visited = Array(n + 1);
  
  const bfs = (com) => {
    const stack = [com];
    visited[com] = 1;
    let cnt = 1;

    while (stack.length) {
      const now = stack.pop();
      // "일반적인 for문" 이 "향상된 for문" 보다 속도가 빠르다.
      for (let i = 0; i < graph[now].length; i++) {
        if (!visited[graph[now][i]]) {
          stack.push(graph[now][i]);
          visited[graph[now][i]] = 1;
          cnt++;
        }
      }
    }
    if (maxCnt < cnt) {
      maxCnt = cnt;
      result = [com];
    } else if (maxCnt === cnt) {
      result.push(com);
    }
  }

  let maxCnt = 0;
  let result = [];
  for (let i = 1; i <= n; i++) {
    visited.fill(0); // visited 초기화 시 이렇게 사용해도 된다.
    bfs(i);
  }
  return result.join(' ');
}

// -------------
// 출력
// -------------
const result = solution1(N, M, CONN);
console.log(result);

// [시간 초과 Issue]
// 해당 문제는 5초의 넉넉한 시간을 두는 이유가 많은 양의 데이터를 처리하기 때문이다.
// 그래서 왠만한 코드는 대부분 시간초과가 발생한다.
// 때문에 for문 조차 향상된 for문 대신에 빠른 일반 for문을 사용해야 한다.
