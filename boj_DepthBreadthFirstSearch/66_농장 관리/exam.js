const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...MOUNT] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, mount) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0, 1, -1, -1, 1];
    const Y = [0, 1, 0, -1, 1, 1, -1, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, num) => {
    for (let i = 0; i < 8; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (mount[nextY][nextX] > num) peakNum = false;
        if (!visited[nextY][nextX]) {
          if (num === mount[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            dfs(nextY, nextX, num);
          }
        }
      }
    }
  }

  let peakCnt = 0;
  let peakNum = true;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!visited[r][c] && mount[r][c] !== 0) {
        visited[r][c] = 1;
        dfs(r, c, mount[r][c]);
        if (peakNum) peakCnt += 1;
        peakNum = true;
      }
    }
  }

  return peakCnt;
}

// -------------
// 출력
// -------------
const result = solution(N, M, MOUNT);
console.log(result);

// [접근]
// 일단 문제 자체의 조건을 이해하기가 어려웠다.. 명확하게 무슨 조건인지 파악하기 힘듦

// 같은 숫자끼리 DFS탐색을 진행하면서 DFS탐색 중 해당 숫자보다 큰 수가 존재한다면
// 해당 숫자는 산봉우리가 아니기 때문에 탐색 반환 결과를 false로 반영되며,
// 해당 숫자보다 큰 수가 존재하지 않는다면 해당 숫자는 산봉우리 이므로 true를 반형한다.
// 그럼 DFS가 끝나면 지점에서 true인 경우에만 산 봉우리 카운트를 +1 해준다.

// [주의할 점]
// - 여기서 각 격자 당 탐색 범위는 문제의 "인접한" 으로 상하좌우, 대각선 방향이 된다.
// - 산 봉우리가 되는 격자에서 "인접한" 범위 내에서만 하나의 산 봉우리로 간주한다.