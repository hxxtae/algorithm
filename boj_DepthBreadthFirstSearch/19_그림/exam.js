const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...BOARD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, board) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (nowY, nowX, size) => {
    // 가장 큰 그림 넓이 측정
    imageMaxSize = Math.max(imageMaxSize, size);

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (board[nextY][nextX] && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          size = dfs(nextY, nextX, size + 1);
        }
      }
    }
    return size;
  }
  
  let imageCount = 0;
  let imageMaxSize = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (board[r][c] && !visited[r][c]) {
        // 그림의 개수 카운트
        imageCount++;
        visited[r][c] = 1;
        dfs(r, c, 1);
      }
    }
  }
  
  return [imageCount, imageMaxSize].join('\n');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, board) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, size) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (board[nextY][nextX] && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
            size += 1;
          }
        }
      }
    }
    
    // 가장 큰 그림 넓이 측정
    imageMaxSize = Math.max(imageMaxSize, size);
  }
  let imageCount = 0;
  let imageMaxSize = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (board[r][c] && !visited[r][c]) {
        // 그림의 개수 카운트
        imageCount++;
        bfs(r, c, 1);
      }
    }
  }
  return [imageCount, imageMaxSize].join('\n');
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, BOARD);
const result2 = solution2(N, M, BOARD);
console.log(result1);
console.log(result2);


