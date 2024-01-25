const fs = require('fs');
const stdin = fs.readFileSync('./input_5.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...FLOOR] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, floor) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0];
    const Y = [0, 1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, i, start) => {
    const [nextY, nextX] = findWay(y, x, i);
    if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
      if (!visited[nextY][nextX] && (floor[nextY][nextX] === start)) {
        visited[nextY][nextX] = 1;
        dfs(nextY, nextX, i, start);
      }
    }
  }

  let cnt = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!visited[r][c]) {
        cnt++;
        visited[r][c] = 1;
        if (floor[r][c] === '-') {
          dfs(r, c, 0, floor[r][c]);
          continue;
        }
        if (floor[r][c] === '|') {
          dfs(r, c, 1, floor[r][c]);
          continue;
        }
      }
    }
  }
  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(N, M, FLOOR);
console.log(result);

// [접근]
// '-'의 경우 같은 행(row)으로 연속적으로 이어지면 하나의 목재로 판단.
// '|'의 경우 같은 열로 연속적으로 이어지면 하나의 목재로 판단.

// 위 두 경우를 판단하여 하나의 목재로 이어 붙힐 수 있는 DFS 탐색을 수행한다.
