const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [MN, ...FIBER] = input;
const [M, N] = MN.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, fiber) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }
  
  const dfs = (y, x) => {
    if (y === (m - 1)) return true;

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
        if (fiber[nextY][nextX] === '0' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          const result = dfs(nextY, nextX);
          if (result) return true;
        }
      }
    }

    return false;
  }

  for (let c = 0, r = 0; c < n; c++) {
    if (fiber[r][c] === '0' && !visited[r][c]) {
      visited[r][c] = 1;
      const result = dfs(r, c);
      if (result) return 'YES';
    }
  }

  return 'NO';
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(m, n, fiber) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;
    
    while (queue.length) {
      const [y, x] = queue.pop();
      if (y === (m - 1)) return true;

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
          if (fiber[nextY][nextX] === '0' && !visited[nextY][nextX]) {
            queue.push([nextY, nextX]);
            visited[nextY][nextX] = 1;
          }
        }
      }
    }

    return false;
  }

  for (let c = 0, r = 0; c < n; c++) {
    if (fiber[r][c] === '0' && !visited[r][c]) {
      const result = bfs(r, c);
      if (result) return 'YES';
    }
  }

  return 'NO';
}

// -------------
// 출력
// -------------
const result1 = solution1(M, N, FIBER);
const result2 = solution2(M, N, FIBER);
console.log(result1);
console.log(result2);