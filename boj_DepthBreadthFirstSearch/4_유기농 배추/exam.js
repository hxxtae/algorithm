const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim().split(' ').map(Number));
const T = input.shift();
const TESTGROUP = [];
for (const arr of input) {
  if (arr.length === 3) {
    TESTGROUP.push([arr]);
    continue;
  }
  TESTGROUP[TESTGROUP.length - 1].push(arr);
}

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, k, field) {
  const matrix = Array.from({ length: n }, () => Array(m).fill(0));
  for (const [x, y] of field)
    matrix[y][x] = 1;

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  const dfs = (nowY, nowX) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextX >= 0 && nextY >= 0 && nextX < m && nextY < n) {
        if (matrix[nextY][nextX]) {
          matrix[nextY][nextX] = 0;
          dfs(nextY, nextX);
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c]) {
        matrix[r][c] = 0;
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(m, n, k, field) {
  const matrix = Array.from({ length: n }, () => Array(m).fill(0));
  for (const [x, y] of field)
    matrix[y][x] = 1;

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    matrix[startY][startX] = 0;

    while (queue.length) {
      const [nowY, nowX] = queue.pop();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (matrix[nextY][nextX]) {
            matrix[nextY][nextX] = 0;
            queue.push([nextY, nextX]);
          }
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c]) {
        bfs(r, c);
        count++;
      }
    }
  }
  return count;
}

// -------------
// 출력
// -------------
const result1 = [];
const result2 = [];
for (let i = 0; i < T; i++) {
  const [[M, N, K], ...FIELD] = TESTGROUP[i];
  result1.push(solution1(M, N, K, FIELD));
  result2.push(solution2(M, N, K, FIELD));
}
console.log(result1.join('\n'));
console.log(result2.join('\n'));
