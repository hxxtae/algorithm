const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split(' ').map(Number);
const [N, ...PERCENT] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, percent) {
  const BOARD_LEN = (2 * n) + 1
  const visited = Array.from({ length: BOARD_LEN }, () => Array(BOARD_LEN).fill(0));

  const findWay = (y, x, way) => {
    // XY 순서: 동서남북
    const X = [1, -1, 0, 0];
    const Y = [0, 0, 1, -1];
    return [y + Y[way], x + X[way]];
  }
  
  const dfs = (y, x, cnt, prevP) => {
    if (cnt === n) {
      answerPercent += prevP;
      return;
    }
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < BOARD_LEN && nextX < BOARD_LEN) {
        if (!visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX, cnt + 1, prevP * (percent[i] * 0.01));
          visited[nextY][nextX] = 0;
        }
      }
    }
  }

  let answerPercent = 0;
  visited[n][n] = 1;
  dfs(n, n, 0, 1);
  return answerPercent;
}

// -------------
// 출력
// -------------
const result = solution(N, PERCENT);
console.log(result);

// [접근]
// 문제에서 요구하는 바는 간단하다.
// 로봇이 N번 행동을 취하였을 때, 로봇의 이동경로가 단순할 확률을 구하는 것이다.
// 즉, N번째 이동하였을 때, 이미 방문한 경로를 방문하지 않고 새로운 경로로 이동한 경우의 확률을 구한다.

// [확률 구하는 방법]
// - 확률의 경우 주어진 방향에 대한 확률(percent)을 백분율로 나타내어 각 방문한 방향마다 이전 확률에 곱해준다.
// - 최종 N번째 까지 이동한 경로가 단순한 경우, N번째 까지 구한 확률을 따로 저장해두며, 모든 N번째 확률을 더한다.