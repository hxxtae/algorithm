const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[M, N, K], ...BOARD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, k, board) {
  const matrix = Array.from({ length: m }, () => Array(n).fill(1));
  for (const [x1, y1, x2, y2] of board) {
    for (let r = y1; r < y2; r++) {
      for (let c = x1; c < x2; c++) {
        matrix[r][c] = 0;
      }
    }
  }

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  
  const dfs = (nowY, nowX, count) => {
    let cnt = ++count;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
        if (matrix[nextY][nextX]) {
          matrix[nextY][nextX] = 0;
          cnt = dfs(nextY, nextX, cnt);
        }
      }
    }
    return cnt;
  }

  let sectionCnt = 0;
  const sectionCntArr = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c]) {
        matrix[r][c] = 0;
        let count = dfs(r, c, 0);
        sectionCntArr.push(count);
        sectionCnt++;
      }
    }
  }
  sectionCntArr.sort((a, b) => a - b);
  return [sectionCnt, sectionCntArr];
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(m, n, k, board) {
  const matrix = Array.from({ length: m }, () => Array(n).fill(1));
  const Y = m - 1;
  for (const [x1, y1, x2, y2] of board) {
    for (let r = Y - y1; r > Y - y2; r--) {
      for (let c = x1; c < x2; c++) {
        matrix[r][c] = 0;
      }
    }
  }

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  
  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    matrix[startY][startX] = 0;
    
    let count = 0;
    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      count++;
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
          if (matrix[nextY][nextX]) {
            queue.push([nextY, nextX]);
            matrix[nextY][nextX] = 0;
          }
        }
      }
    }
    return count;
  }
  
  const countArr = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c]) {
        countArr.push(bfs(r, c));
      }
    }
  }
  countArr.sort((a, b) => a - b)
  return [countArr.length, countArr];
}

// -------------
// 출력
// -------------
const result1 = solution1(M, N, K, BOARD);
const result2 = solution2(M, N, K, BOARD);
console.log(result1[0]);
console.log(result1[1].join(' '));
console.log(result2[0]);
console.log(result2[1].join(' '));

// [접근]
// - 좌표를 그래프로 나타내기 -
// 두 번째 입력값 x1, y1, x2, y2 는 직사각형의 왼쪽하단 꼭지점과 오른쪽 상단 꼭지점의 좌표를 의미한다.
// 이를 그래프의 인덱스 좌표에 그려낸다면 (idx >= x1, idx < x2) / (idx >= y1, idx < y2) 으로
// matrix 그래프 좌표 평면에 색칠한 도형을 담을 수 있다.

// matrix로 그리면 빗금친 직사각형은 0으로 표시되지만 상-하 반전이 되어 그려진다.
// (구현에 지장은 없다)
// [
//   [1, 1, 1, 1, 0, 0, 1],
//   [1, 0, 1, 1, 0, 0, 1],
//   [0, 0, 0, 0, 1, 1, 1],
//   [0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 1, 1, 1, 1, 1]
// ]

