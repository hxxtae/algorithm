const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, K], ...TRASH] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, k, trash) {
  const visited = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const matrix = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (const [y, x] of trash) {
    matrix[y][x] = 1;
  }

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, size) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 1 && nextX >= 1 && nextY <= n && nextX <= m) {
        if (matrix[nextY][nextX] && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          size = dfs(nextY, nextX, size + 1);
        }
      }
    }
    maxTrashSize = Math.max(maxTrashSize, size);
    return size;
  }

  let maxTrashSize = 0;
  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= m; c++) {
      if (matrix[r][c] && !visited[r][c]) {
        visited[r][c] = 1;
        dfs(r, c, 1);
      }
    }
  }
  return maxTrashSize;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, k, trash) {
  const visited = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const matrix = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (const [y, x] of trash) {
    matrix[y][x] = 1;
  }
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    let size = 1;
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    while (queue.length) {
      const [y, x] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 1 && nextX >= 1 && nextY <= n && nextX <= m) {
          if (matrix[nextY][nextX] && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
            size++;
          }
        }
      }
    }
    maxTrashSize = Math.max(maxTrashSize, size);
  }

  let maxTrashSize = 0;
  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= m; c++) {
      if (matrix[r][c] && !visited[r][c]) {
        bfs(r, c)
      }
    }
  }
  return maxTrashSize;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, K, TRASH);
const result2 = solution2(N, M, K, TRASH);
console.log(result1);
console.log(result2);