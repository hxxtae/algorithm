const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim())
const [N, ...RGB] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, rgb) {
  const visitedA = Array.from({ length: n }, () => Array(n).fill(0)); // Non적록색약
  const visitedB = Array.from({ length: n }, () => Array(n).fill(0)); // 적록색약
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  const dfs = (nowY, nowX, find, kind) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        
        // Non적녹색약
        if (!kind && !visitedA[nextY][nextX] && rgb[nextY][nextX] === find) {
          visitedA[nextY][nextX] = 1;
          dfs(nextY, nextX, find, kind);
          continue;
        }
        // 적녹색약
        if (kind && !visitedB[nextY][nextX] && find.includes(rgb[nextY][nextX])) {
          visitedB[nextY][nextX] = 1;
          dfs(nextY, nextX, find, kind);
          continue;
        }

      }
    }
  }

  let countA = 0; // Non적녹색약
  let countB = 0; // 적녹색약
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // Non적녹색약 탐색
      if (!visitedA[r][c]) {
        visitedA[r][c] = 1;
        countA++;
        dfs(r, c, rgb[r][c], false);
      }
      // 적녹색약 탐색
      if (!visitedB[r][c]) {
        visitedB[r][c] = 1;
        countB++;
        const find = rgb[r][c] === 'B' ? 'B' : 'RG';
        dfs(r, c, find, true);
      }
    }
  }
  
  return [countA, countB];
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, rgb) {
  const visitedA = Array.from({ length: n }, () => Array(n).fill(0)); // Non적녹색약
  const visitedB = Array.from({ length: n }, () => Array(n).fill(0)); // 적녹색약

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, find, kind) => {
    const queue = [[startY, startX]];

    if (kind) visitedB[startY][startX] = 1;
    else visitedA[startY][startX] = 1;
    
    while (queue.length) {
      const [nowY, nowX] = queue.pop();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {

          // Non적녹색약
          if (!kind && !visitedA[nextY][nextX] && rgb[nextY][nextX] === find) {
            queue.push([nextY, nextX]);
            visitedA[nextY][nextX] = 1;
            continue;
          }
          // 적녹색약
          if (kind && !visitedB[nextY][nextX] && find.includes(rgb[nextY][nextX])) {
            queue.push([nextY, nextX]);
            visitedB[nextY][nextX] = 1;
            continue;
          }

        }
      }
    }

  }

  let countA = 0, countB = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // Non적녹색약
      if (!visitedA[r][c]) {
        bfs(r, c, rgb[r][c], false);
        countA++;
      }
      if (!visitedB[r][c]) {
        bfs(r, c, rgb[r][c] === 'B' ? 'B' : 'RG', true);
        countB++;
      }
    }
  }
  return [countA, countB];
}

// -------------
// 출력
// -------------
const result1 = solution1(N, RGB);
const result2 = solution2(N, RGB);
console.log(result1.join(' '))
console.log(result2.join(' '))