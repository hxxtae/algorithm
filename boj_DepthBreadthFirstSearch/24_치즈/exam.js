const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...CHEESE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, cheese) {
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  // DFS: 외부 공기와 내부 공기 구분
  const dfs = (y, x) => {
    if (cheese[y][x] === 0) cheese[y][x] = -1;
    else return;

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        dfs(nextY, nextX);
      }
    }
  }
  
  // main
  let time = 0;
  dfs(0, 0); // 외부공기(-1)와 내부공기(0) 구분하기
  while (1) {
    // [녹는 치즈 찾기]
    // - 치즈 찾기(1)
    // - 그 중 녹는 치즈를 찾아 stack에 저장
    const stack = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (cheese[r][c] !== 1) continue;

        let air = 0;
        for (let i = 0; i < 4; i++) {
          const [nextY, nextX] = findWay(r, c, i);
          if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
            if (cheese[nextY][nextX] === -1)
              air++;
          }
        }
        if (air >= 2)
          stack.push([r, c]);
      }
    }
    
    if (!stack.length) break;

    // [외부 공기로 변환]
    // - 녹는 치즈를 외부공기(-1)로 변환
    // - 외부공기로 변환되는 내부공기(0)를 외부공기(-1)로 변환
    while (stack.length) {
      const [y, x] = stack.pop();
      cheese[y][x] = -1;

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (cheese[nextY][nextX] === 0)
            dfs(nextY, nextX);
        }
      }
    }
    time++;
  }
  return time;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, CHEESE);
console.log(result1)

// [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 0, 0, 0, 0],
//   [0, 0, 0, 2, 2, 0, 1, 1, 0],
//   [0, 0, 1, 3, 4, 3, 2, 1, 0],
//   [0, 0, 2, 3, 4, 3, 2, 0, 0],
//   [0, 0, 1, 1, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

// [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 0, 0, 0, 2, 2, 0],
//   [0, 1, 0, 3, 4, 3, 0, 2, 0],
//   [0, 1, 0, 0, 3, 0, 0, 2, 0],
//   [0, 1, 0, 3, 5, 3, 0, 2, 0],
//   [0, 1, 1, 0, 0, 0, 2, 2, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]