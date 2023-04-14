function solution(board) {
  const visited = board.map((str) => Array.from(str, () => 0));
  const rLen = board.length;
  const cLen = board[0].length;
  const queue = [[]]; // [row, col, deep]
  queue[0][0] = board.findIndex((str) => (str.indexOf('R') !== -1 && (queue[0][1] = str.indexOf('R'))));
  queue[0][2] = 0;
  visited[queue[0][0]][queue[0][1]] = 1;
  
  const stopCheck = (r, c) => {
    if(r >= rLen || c >= cLen || r < 0 || c < 0) return true;
    if(board[r][c] === 'D') return true;
    return false;
  }
  const nextPos = (way) => {
    const x = [1, 0, -1, 0];
    const y = [0, 1, 0, -1];
    return [y[way], x[way]];
  }
  const straightPos = (r, c, way) => {
    while(1) {
      const [R, C] = nextPos(way);
      if(stopCheck(r + R, c + C)) break;
      r += R;
      c += C;
    }
    return [r, c];
  }
  while(queue.length) {
    const [r, c, deep] = queue.shift();
    if(board[r][c] === "G") return deep;
    for(let i = 0; i < 4; i++) {
      const [posY, posX] = straightPos(r, c, i);
      if(visited[posY][posX]) continue;
      visited[posY][posX] = 1;
      queue.push([posY, posX, deep + 1]);
    }
  }
  return -1;
}

// NOTE: BFS