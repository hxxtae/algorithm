const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...SQUARE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, square) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));

  const findWay = (y, x, way, num) => {
    // [오른쪽, 아래]
    const X = [num, 0];
    const Y = [0, num];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, num) => {
    if (y === (n - 1) && x === (n - 1) && square[y][x] === -1)
      return true;

    for (let i = 0; i < 2; i++) {
      const [nextY, nextX] = findWay(y, x, i, num);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        if (!visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          const end = dfs(nextY, nextX, square[nextY][nextX]);
          if (end) return true;
          visited[nextY][nextX] = 0;
        }
      }
    }

    return false;
  }

  visited[0][0] = 1;
  const result = dfs(0, 0, square[0][0]);

  return (result ? 'HaruHaru' : 'Hing');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, square) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));

  const findWay = (y, x, way, num) => {
    const X = [num, 0];
    const Y = [0, num];

    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, startNum) => {
    const queue = [[startY, startX, startNum]];
    visited[startY][startX] = 1;

    while (queue.length) {
      const [y, x, num] = queue.pop();
      if (y === (n - 1) && x === (n - 1) && square[y][x] === -1)
        return true;

      for (let i = 0; i < 2; i++) {
        const [nextY, nextX] = findWay(y, x, i, num);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
          if (!visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX, square[nextY][nextX]]);
          }
        }
      }
    }

    return false;
  }

  const result = bfs(0, 0, square[0][0]);
  return (result ? 'HaruHaru' : 'Hing');
}

// -------------
// 출력
// -------------
const result1 = solution1(N, SQUARE);
const result2 = solution2(N, SQUARE);
console.log(result1);
console.log(result2);
