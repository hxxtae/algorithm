function solution(key, lock) {
  const N = lock.length;
  const M = key.length;

  // 2차원 배열 시계방향 90도 회전 함수
  const deg90Key = (key) => {
    const newKey = Array.from({length: M}, () => []);
    for(let col = 0; col < M; col++) {
      for(let row = M-1; row >= 0; row--) {
        newKey[col].push(key[row][col]);
      }
    }
    return newKey;
  }
  const dis = M - 1; // 상하좌우로 확장할 길이
  const len = N + (dis * 2); // 상하좌우로 확장할 2차원 배열 lock의 길이
  const matchCount = lock.reduce((sum, arr) => sum += arr.filter((item) => item === 0).length, 0);
  const newLock = [];

  // 확장된 2차원 배열을 탐색하면서 key의 매칭 확인 함수
  const findMatch = (r, c) => {
    let count = 0;
    for(let row = r, i = 0; i < M; row++, i++) {
      for(let col = c, j = 0; j < M; col++, j++) {
        if(newLock[row][col] === 1 && key[i][j] === 1) return false;
        if(newLock[row][col] === 0 && key[i][j] === 1) count++;
      }
    }
    if(count === matchCount) return true;
    return false;
  }
  
  // 확장된 2차원 배열 생성 -> newLock
  for(let row = 0; row < len; row++) {
    newLock[row] = [];
    for(let col = 0; col < len; col++) {
      if(row >= dis && col >= dis && row < dis+N && col < dis+N) {
        newLock[row].push(lock[row-dis][col-dis]);
      } else newLock[row].push(-1);
    }
  }
  let finish = false;
  // key를 90도 회전하면서 확장된 2차원 배열 lock 탐색
  for(let cnt = 0; cnt < 4; cnt++) {
    for(let row = 0; row < len-dis; row++) {
      for(let col = 0; col < len-dis; col++) {
        finish = findMatch(row, col);
        if(finish) break;
      }
      if(finish) break;
    }
    if(finish) break;
    key = deg90Key(key);
  }
  return finish;
}

// NOTE: 슬라이딩 윈도우 or 2차원 배열과 2차원 배열 비교 탐색

// [접근]
// 2차원 배열 Lock
// [
//   [1, 1, 1], 
//   [1, 1, 0], 
//   [1, 0, 1]
// ]

// 확장된 2차원 배열 Lock
// [
//   [-1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1],
//   [-1, -1,  1,  1,  1, -1, -1],
//   [-1, -1,  1,  1,  0, -1, -1],
//   [-1, -1,  1,  0,  1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1]
// ]
// -> 확장된 lock과 key를 비교 탐색

