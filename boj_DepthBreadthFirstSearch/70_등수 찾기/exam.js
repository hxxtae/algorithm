const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, X], ...RANK] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, x, rank) {
  const visited = Array(n + 1).fill(0);
  const graphA = Array.from({ length: n + 1 }, () => []);
  const graphB = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of rank) {
    graphA[a].push(b);
    graphB[b].push(a);
  }
  
  const dfsOfWorse = (node, cnt) => {
    for (const next of graphA[node]) {
      if (visited[next]) continue;
      visited[next] = 1;
      cnt = dfsOfWorse(next, cnt + 1);
    }

    return cnt;
  }

  const dfsOfBetter = (node, cnt) => {
    for (const next of graphB[node]) {
      if (visited[next]) continue;
      visited[next] = 1;
      cnt = dfsOfBetter(next, cnt + 1);
    }

    return cnt;
  }

  const worseX = dfsOfWorse(x, 0);
  visited.fill(0);
  const betterX = dfsOfBetter(x, 0);
  
  return [1 + betterX, n - worseX].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, M, X, RANK);
console.log(result);

// [접근]
// 처음 문제를 접하고 나서는 조금 어려울 것이라 생각했지만 생각보다 단순하게 풀어서 당황했다.

// x의 상대적인 등수를 구하는 문제로,
// X보다 높은(잘한) 등수와 X보다 낮은(못한) 등수를 구하면 X의 상대적인 높은 등수(U)와 낮은 등수(V)를 구할 수 있다.

// - x보다 못한 등수들의 개수를 알면 x의 최대한 못한(낮은) 등수를 알 수 있다.
//   -> N - (x보다 낮은 등수의 개수)
// - x보다 잘한 등수들의 개수를 알면 x의 최소한 잘한(높은) 등수를 알 수 있다.
//   -> 1 - (x보다 높은 등수의 개수)