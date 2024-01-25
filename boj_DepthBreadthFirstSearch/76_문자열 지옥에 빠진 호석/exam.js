const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M, K] = input[0].split(' ').map(Number);
const BOARD = input.slice(1, N + 1);
const STR = input.slice(N + 1);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, k, board, strArr) {
  const strCountMap = new Map();
  for (const str of strArr) {
    strCountMap.set(str, 0);
  }
  
  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];

    let [nextY, nextX] = [y + Y[way], x + X[way]];
    if (nextY < 0) nextY = n - 1;
    if (nextY >= n) nextY = 0;
    if (nextX < 0) nextX = m - 1;
    if (nextX >= m) nextX = 0;

    return [nextY, nextX];
  }

  const dfs = (y, x, str) => {
    if (str.length > 5)
      return;

    if (strCountMap.has(str)) {
      strCountMap.set(str, (strCountMap.get(str) || 0) + 1);
    }

    for (let i = 0; i < 8; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      dfs(nextY, nextX, str + board[nextY][nextX]);
    }
  }

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      dfs(r, c, board[r][c]);
    }
  }

  const result = [];
  for (const str of strArr) {
    result.push(strCountMap.get(str));
  }
  return result.join('\n');
  // return [...strCountMap.values()].join('\n');
  // 문제 자체에 중복된 문자(신의 문자, str)가 주어지기 때문에 불가
  // ["aba", "abc", "aba"]
}

// -------------
// 출력
// -------------
const result = solution(N, M, K, BOARD, STR);
console.log(result);

// [접근]

// ### 실수
// 문제 에서
// > 경우의 수를 셀 때, 방문 순서가 다르면 다른 경우이다.즉, (1, 1) -> (1, 2) 로 가는 것과(1, 2) -> (1, 1) 을 가는 것은 서로 다른 경우이다.
// 를 읽고 모든 y, x 좌표를 문자열로 더하여 경우의 수가 같은 경우를 제외하고자 하였다.
// 잘못된 이해와 정의였다. 또한 모든 좌표를 문자열로 더해도 중복된 경우는 존재하지 않는다.

// ### 과정
// 1. 해당 문제는 DFS를 통해 상하좌우, 대각선 방향으로 격자를 탐색한다.
// 2. 격자를 탐색하면서 신의 문자열이 존재하면 해시 객체에 해당 문자를 카운트 한다.
//    - 신의 문자열의 최대 길이는 5이다.
// 3. 각각의 격자에서 시작하여 모든 방향으로 탐색을 통해, 각 격자를 통해 조합된 문자열이 신의 문자열임을 확인하여 카운트한다.
