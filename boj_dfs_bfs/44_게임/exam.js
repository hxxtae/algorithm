const fs = require('fs');
const stdin = fs.readFileSync('./input_6.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...BOARD] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, board) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  const dp = Array.from({ length: n }, () => Array(m).fill(0)); // DP: 좌표를 방문할 당시 카운트 메모이제이션
  const matrix = board.map(str => [...str].map(item => Number.isNaN(+item) ? item : +item));

  const findWay = (y, x, way, numX) => {
    const X = [numX, -numX, 0, 0];
    const Y = [0, 0, numX, -numX];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, cnt, cycle) => {
    const numX = matrix[y][x];
    count = Math.max(count, cnt);

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i, numX);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
      if (matrix[nextY][nextX] === 'H') continue;
      // ↓ DP 메모이제이션 업데이트: 좌표 재방문시 카운트가 메모이제이션된 값 보다 더 큰 경우
      if (dp[nextY][nextX] >= cnt + 1) continue;
      if (visited[nextY][nextX]) return true;

      visited[nextY][nextX] = 1;
      dp[nextY][nextX] = cnt + 1; // DP: 좌표를 방문할 당시 카운트 메모이제이션
      cycle = dfs(nextY, nextX, cnt + 1, cycle);
      if (cycle) return true;
      visited[nextY][nextX] = 0;
    }

    return false;
  }

  let count = 0;
  visited[0][0] = 1;
  dp[0][0] = 1;
  const state = dfs(0, 0, 1, false);

  return state ? -1 : count;
}

// -------------
// 출력
// -------------
const result = solution(N, M, BOARD);
console.log(result);

// [접근]
// 각 좌표에서 정해진 숫자(X)의 크기 만큼 상하좌우로 이동할 있다.
// DFS탐색과 백트래킹을 이용하면 각 좌표를 탐색하면서 다음을 수행한다.
// - 더이상 탐색할 수 없을 때 까지의 방문 횟수의 최대값을 전역변수에 저장
//   (해당 좌표의 값이 'H' 이거나 좌표의 범위를 벗어아는 경우)
// - 사이클이 존재하는 경우 모든 탐색을 종료
//   (아직 탐색중인 과정에서 사이클이 발생하는 경우)

// "그러나 백트래킹만을 이용하면 시간초과가 발생한다."

// 그 이유는 방문한 좌표를 재방문시(새로운 탐색 과정으로 재방문)
// 현재 좌표에 카운트된 값이 이전에 방문한 카운트보다 작아도 다시 탐색 과정을 수행하므로
// 불필요한 탐색을 수행하게 된다.