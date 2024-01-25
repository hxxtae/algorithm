const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...CAMPUS] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, campus) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x) => {
    if (campus[y][x] === 'P') count++;

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (campus[nextY][nextX] !== 'X' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX);
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (campus[r][c] === 'I') {
        visited[r][c] = 1;
        dfs(r, c);
      }
    }
  }
  
  return count || 'TT';
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, campus) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    let cnt = 0;
    while (queue.length) {
      const [y, x] = queue.pop();
      if (campus[y][x] === 'P') cnt++;

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (campus[nextY][nextX] !== 'X' && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
          }
        }
      }
    }

    return cnt;
  }

  let count;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (campus[r][c] === 'I') {
        visited[r][c] = 1;
        count = bfs(r, c);
      }
    }
  }

  return count || 'TT';
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, CAMPUS);
const result2 = solution2(N, M, CAMPUS);
console.log(result1);
console.log(result2);
