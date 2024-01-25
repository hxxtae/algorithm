const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...BOARD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, board) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));

  const findWay = (y, x, way, num) => {
    const X = [num, 0];
    const Y = [0, num];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x) => {
    if (board[y][x] === -1) {
      return true;
    }
    for (let i = 0; i < 2; i++) {
      const [nextY, nextX] = findWay(y, x, i, board[y][x]);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        if (!visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          const end = dfs(nextY, nextX, board[nextY][nextX]);
          if (end) return true;
        }
      }
    }

    return false;
  }

  visited[0][0] = 1;
  const arrive = dfs(0, 0);
  return arrive ? 'HaruHaru' : 'Hing';
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, board) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));

  const findWay = (y, x, way, num) => {
    const X = [num, 0];
    const Y = [0, num];

    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    while (queue.length) {
      const [y, x] = queue.pop();
      if (board[y][x] === -1) {
        return true;
      }

      for (let i = 0; i < 2; i++) {
        const [nextY, nextX] = findWay(y, x, i, board[y][x]);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
          if (!visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
          }
        }
      }
    }

    return false;
  }

  const arrive = bfs(0, 0);
  return arrive ? 'HaruHaru' : 'Hing';
}

// -------------
// 출력
// -------------
const result1 = solution1(N, BOARD);
const result2 = solution2(N, BOARD);
console.log(result1);
console.log(result2);