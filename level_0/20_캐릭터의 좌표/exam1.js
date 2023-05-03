function solution(keyinput, board) {
  const way = [['left', [-1, 0]], ['right', [1, 0]], ['up', [0, 1]], ['down', [0, -1]]];
  const map = new Map(way);
  const maxX = (board[0] - 1) / 2, 
        maxY = (board[1] - 1) / 2;
  const result = [0, 0];
  keyinput.forEach((key) => {
    const [x, y] = map.get(key);
    if(Math.abs(result[0] + x) <= maxX) result[0] += x;
    if(Math.abs(result[1] + y) <= maxY) result[1] += y;
  });
  return result;
}

// NOTE: 문제 구현 능력