const fs = require('fs');
const stdin = fs.readFileSync("./input_1.txt").toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, K] = input[0].split(' ').map(Number);
const BOARD = input.slice(1).map(item => item.split('').map(Number));

// -------------
// 풀이 (DFS)
// -------------
function solution(n, k, board) {
  let visited = Array.from({ length: n }, () => Array(10).fill(0));
  let sameArr = [];
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const onNumToZero = (cnt) => {
    let transCnt = 0;
    if (cnt < k) {
      sameArr = [];
      return transCnt;
    }
    while (sameArr.length) {
      const [y, x] = sameArr.pop();
      board[y][x] = 0;
      transCnt++;
    }
    return transCnt;
  }

  const dfs = (y, x, same, sameCnt) => {
    sameArr.push([y, x]);

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= 10) continue;
      if (board[nextY][nextX] !== same) continue;
      if (visited[nextY][nextX]) continue;
      visited[nextY][nextX] = 1;
      sameCnt = dfs(nextY, nextX, same, sameCnt + 1);
    }

    return sameCnt;
  }

  let loop = 1;
  while (loop > 0) {
    loop = 0;
    // 1. 인접한 동일 숫자의 연결 리스트 탐색 중, k개 이상의 숫자 존재 시 0으로 변환
    for (let r = n - 1; r >= 0; r--) {
      for (let c = 0; c < 10; c++) {
        if (board[r][c] === 0) continue;
        if (visited[r][c]) continue;
        visited[r][c] = 1;
        const count = dfs(r, c, board[r][c], 1);
        const transCnt = onNumToZero(count);
        loop += transCnt;
      }
    }
    if (loop === 0) break;
    visited = Array.from({ length: n }, () => Array(10).fill(0));

    // 2. board의 하단으로 정렬 (중력 방향으로 1이상의 숫자(자연수)를 내려주기)
    for (let c = 0; c < 10; c++) {
      const setNumArr = [];
      for (let r = n - 1; r >= 0; r--) {
        if (board[r][c]) setNumArr.push(board[r][c]);
      }
      for (let r = n - 1, i = 0; r >= 0; r--, i++) {
        if (setNumArr[i]) board[r][c] = setNumArr[i];
        else board[r][c] = 0;
      }
    }
  }

  return board.map(list => list.join('')).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, K, BOARD);
console.log(result);