const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n');
const T = +input[0];
for (let i = 1; i < input.length;) {
  const [H, W] = input[i].split(' ').map(Number);
  i += 1;
  const FIELD = input.slice(i, i + H);
  const result = solution(T, H, W, FIELD);
  console.log(result);
  i += H;
}

// -------------
// 풀이 (DFS)
// -------------
function solution(t, h, w, field) {
  const visited = Array.from({ length: h }, () => Array(w).fill(0));
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < h && nextX < w) {
        if (field[nextY][nextX] === '#' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX);
        }
      }
    }
  }

  let flockCnt = 0;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (field[r][c] === '#' && !visited[r][c]) {
        flockCnt += 1;
        visited[r][c] = 1;
        dfs(r, c);
      }
    }
  }

  return flockCnt;
}

