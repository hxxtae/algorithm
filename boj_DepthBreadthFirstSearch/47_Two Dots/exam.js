const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

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

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, start, color, deep) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (board[nextY][nextX] === color) {
          if (deep >= 4 && nextY === start[0] && nextX === start[1]) {
            return true;
          }
          if (!visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            const result = dfs(nextY, nextX, start, color, deep + 1);
            if (result) return true;
            visited[nextY][nextX] = 0;
          }
        }
      }
    }
  }

  let cycle = false;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!visited[r][c]) {
        visited[r][c] = 1;
        cycle = dfs(r, c, [r, c], board[r][c], 1);
        if (cycle) return 'Yes';
        visited[r][c] = 0;
      }
    }
  }

  return 'No';
}

// -------------
// 출력
// -------------
const result = solution(N, M, BOARD);
console.log(result);

// [접근]
// 문제의 '사이클 조건'에 만족하는 경우에만 'Yes'를 출력하면 된다.
// 그렇지 않은 경우에는 'NO'를 출력한다.

// 사이클 조건
// 1. 4개 이상의 서로 다른 점으로 구성
// 2. 시작 지점이 끝 지점과 일치해야 한다.
// 3. 모든 점의 색이 같아야 한다.

// 위 조건의 사이클이 존재하는지 확인하기 위해 DFS 탐색을 이용한 함수를 만들면 된다.