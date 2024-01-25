const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, Q], ...MATRIX] = input;
const ARR_L = MATRIX.pop();

// -------------
// 풀이 (DFS)
// -------------
function solution(n, q, matrix, arr_l) {
  const LEN = (2 ** n);
  const visited = Array.from({ length: LEN }, () => Array(LEN).fill(0));
  
  // 1. 각 구간을 오른쪽으로 90도 회전
  const onTurn90Deg = (kind, fieldArr) => {
    const kindLen = (2 ** kind);
    const newArr = Array.from({ length: LEN }, () => Array(LEN));
    for (let startY = 0; startY < LEN; startY += kindLen) {
      for (let startX = 0; startX < LEN; startX += kindLen) {
        for (let r = 0; r < kindLen; r++) {
          for (let c = 0; c < kindLen; c++) {
            newArr[startY + c][startX + (kindLen - 1) - r] = fieldArr[startY + r][startX + c];
          }
        }
      }
    }
    return newArr;
  }

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  // 2. 얼음이 3개 이상 접해있지 않은 칸 찾기
  const onIceConfirm = (y, x, fieldArr) => {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < LEN && nextX < LEN) {
        if (fieldArr[nextY][nextX]) {
          cnt++;
        }
      }
    }
    return cnt < 3 ? true : false;
  }

  // 3. 가장 큰 얼음 덩어리 찾기
  const dfs = (y, x, iceCnt) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < LEN && nextX < LEN) {
        if (matrix[nextY][nextX] && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          iceCnt = dfs(nextY, nextX, iceCnt + 1);
        }
      }
    }
    return iceCnt;
  }
  
  // 실행1 : Q번 실행 -> 얼음을 L 간격마다 회전시키고, 얼음 녹이기
  for (let i = 0; i < q; i++) {
    matrix = onTurn90Deg(arr_l[i], matrix);
    const minus = Array.from({ length: LEN }, () => Array(LEN).fill(0));
    for (let r = 0; r < LEN; r++) {
      for (let c = 0; c < LEN; c++) {
        const state = onIceConfirm(r, c, matrix);
        if (state) minus[r][c] = 1;
      }
    }
    
    for (let r = 0; r < LEN; r++) {
      for (let c = 0; c < LEN; c++) {
        if (minus[r][c] && matrix[r][c] > 0) {
          matrix[r][c] -= 1;
        }
      }
    }
  }
  
  // 실행2 : 가장 큰 얼음 덩어리 찾고, 남은 얼음의 합 구하기
  let maxIce = 0,
    totalIce = 0;
  for (let r = 0; r < LEN; r++) {
    for (let c = 0; c < LEN; c++) {
      totalIce += matrix[r][c];
      if (matrix[r][c] && !visited[r][c]) {
        visited[r][c] = 1;
        const iceCount = dfs(r, c, 1);
        maxIce = Math.max(maxIce, iceCount);
      }
    }
  }
  return [totalIce, maxIce].join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, Q, MATRIX, ARR_L);
console.log(result);
