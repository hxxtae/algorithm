const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[M, N], ...BANNER] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, banner) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x) => {
    for (let i = 0; i < 8; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
        if (banner[nextY][nextX] && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX);
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (banner[r][c] && !visited[r][c]) {
        visited[r][c] = 1;
        dfs(r, c);
        count += 1;
      }
    }
  }

  return count;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(m, n, banner) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];

    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    while (queue.length) {
      const [y, x] = queue.pop();
      for (let i = 0; i < 8; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
          if (banner[nextY][nextX] && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
          }
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (banner[r][c] && !visited[r][c]) {
        bfs(r, c);
        count += 1;
      }
    }
  }

  return count;
}

// -------------
// 출력
// -------------
const result1 = solution1(M, N, BANNER);
const result2 = solution2(M, N, BANNER);
console.log(result1);
console.log(result2);
