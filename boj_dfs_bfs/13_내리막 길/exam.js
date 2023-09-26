const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[M, N], ...BOARD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, board) {
  const visited = Array.from({ length: m }, () => Array(n).fill(-1));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (nowY, nowX) => {
    if (nowY === m - 1 && nowX === n - 1) return 1;
    if (visited[nowY][nowX] !== -1) return visited[nowY][nowX];

    visited[nowY][nowX] = 0; // DP[y][x] 초기화
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
        if (board[nowY][nowX] > board[nextY][nextX]) {
          visited[nowY][nowX] += dfs(nextY, nextX);
        }
      }
    }
    return visited[nowY][nowX];
  }
  const result = dfs(0, 0);
  return result;
}

// -------------
// 출력
// -------------
const result1 = solution1(M, N, BOARD);
console.log(result1);

// [접근]
// DP(visited)를 활용한다 ->
// 1. 메모이제이션 되어야 하는 값이 무엇이고,
// 2. 반환되는 값이 무엇이 되어야 하는지 생각해 봐야 한다.

// 해당 문제에서는 다음 칸이 작은수(내리막길)일 경우에 이동을 하는데,
// 중복된 내리막길을 다시 가는 경우 DP를 활용하여 불필요한 재귀 함수(DFS)의 호출을 막는다.

// ⚠ 해당 문제에서는 해당 칸에 도달하였을 때 DP[y][x] (visited[y][x]) 를 `0` 으로 초기화 해주어야 한다.
// 반환된 값으로 새로운 DP의 값으로 갱신시켜 주기 위해서 이다.

// ---------------------
// 탐색을 완료한 visited)
// ---------------------
// [
//   [ 3,  2,  2,  2,  1 ],
//   [ 1, -1, -1,  1,  1 ],
//   [ 1, -1, -1,  1, -1 ],
//   [ 1,  1,  1,  1, -1 ]
// ]