const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...BEADS] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, beads) {
  const HALF_NUM = (n + 1) / 2;
  // 해당 구슬이 각 구슬로 부터 `무거운` 구슬의 무게 차이를 담은 그래프
  const graphA =
    Array.from({ length: n + 1 }, () =>
      Array.from({ length: n + 1 }, () => Infinity));
  
  // 해당 구슬이 각 구슬로 부터 `가벼운` 구슬의 무게 차이를 담은 그래프
  const graphB =
    Array.from({ length: n + 1 }, () =>
      Array.from({ length: n + 1 }, () => Infinity));
  
  for (const [a, b] of beads) {
    graphA[b][a] = 1; // 정뱡향(가벼운거에서 무거운거로) 간선
    graphB[a][b] = 1; // 역방향(무거운거에서 가벼운거로) 간선
  }

  for (let k = 1; k <= n; k++) {
    for (let r = 1; r <= n; r++) {
      for (let c = 1; c <= n; c++) {
        if (graphA[r][c] > graphA[r][k] + graphA[k][c]) {
          graphA[r][c] = graphA[r][k] + graphA[k][c];
        }

        if (graphB[r][c] > graphB[r][k] + graphB[k][c]) {
          graphB[r][c] = graphB[r][k] + graphB[k][c];
        }
      }
    }
  }

  let result = 0;
  for (let node = 1; node <= n; node++) {
    // [정방향, 역방향] -> 각 노드에서 부터 다른 노드로 무겁거나(정방향) 가벼운(역방향) 노드 인지를 구분할 수 있는 노드의 개수
    const [A, B] = [
      graphA[node].filter(num => num !== Infinity).length,
      graphB[node].filter(num => num !== Infinity).length
    ];

    if (A >= HALF_NUM || B >= HALF_NUM) {
      result++;
    }
  }

  return result;
}

// -------------
// 출력
// -------------
const result = solution(N, M, BEADS);
console.log(result);

// [접근]
// 중간 번호가 될 수 없는 구슬의 개수를 구하는 문제이다.
// 중간 번호란 무게 순서로 (N + 1) / 2 에 존재하는 무게의 구슬을 의미한다.
// 그렇기 때문에, 그래프를 탐색하면서 현재 구슬 보다 `1)가볍거나`, `2)무거운 것`의 개수가 중간 번호(N + 1) / 2 이상 이면, 중간 구슬이 될 수 없다.

// 무게 정보를 보면 간선이 한 방향이다. 
// 이렇게 주어졌기 때문에 나보다 가볍거나 혹은 무거운지만 그래프로 알 수 있다.
// 인접 리스트를 하나 더 만들고 간선을 거꾸로 넣어준다. (무거운 -> 가벼운 or 가벼운 -> 무거운)
// 결과적으로, 그래프 탐색을 1) 정방향, 2) 역방향 두 번 돌아준다.
