function solution(board) {
  const len = board.length;
  const aroundZone = (idx, x, y) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];
    return [X[idx] + x, Y[idx] + y];
  }
  const findNotSafeZone = (row, col, arr) => {
    for(let n = 0; n < 8; n++) {
      const [x, y] = aroundZone(n, col, row);
      if(x >= 0 && y >= 0 && x < len && y < len) {
        const around = arr[y][x];
        if(around === 0) arr[y][x] = 2;
      }
    }
  }
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c++) {
      const state = board[r][c];
      if(state === 1) {
        findNotSafeZone(r, c, board)
      }
    }
  }
  return board.flat(1).filter((state) => state === 0).length;
}

// NOTE: 완전 탐색