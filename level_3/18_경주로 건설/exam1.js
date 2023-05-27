function solution(board) {
  const len = board.length;
  const visited = Array
    .from({length: len}, () => Array
      .from({length: len}, () => Array
        .from({length: 4}, () => Infinity)));
  const findWay = (x, y, idx) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [x+X[idx], y+Y[idx]];
  }
  const checkRange = (x, y) => {
    if(x < 0 || y < 0 || x >= len || y >= len) return false;
    return true;
  }
  let result = Infinity;
  const queue = [[0, 0, 0, -1]];
  
  while(queue.length) {
    const [x, y, pay, pos] = queue.shift();
    if(x === len - 1 && y === len - 1) {
      result = Math.min(result, pay);
      continue;
    }
      
    for(let i = 0; i < 4; i++) {
      const [nextX, nextY] = findWay(x, y, i);
      if(!checkRange(nextX, nextY)) continue;
      if(board[nextY][nextX]) continue;
      let nextPay = pay + 100;
      nextPay += (pos === i || pos === -1 ? 0 : 500);
      if(nextPay < visited[y][x][i]) {
        visited[y][x][i] = nextPay;
        queue.push([nextX, nextY, nextPay, i]);
      }
    }
  }
  return result;
}

// NOTE: BFS (visited를 최소 가중치 DP로 사용)

// [접근]
// BFS를 통해 여러 노드를 탐색하게 되는데,
// 중복이 허용되지 않으면 각 노드에 처음 들어오는 비용이 최소 비용임을 보장할 수 없다.
// 그러므로 방문 체크 여부를 통한 중복 체크가 아닌 각 노드에 중복된 방문이 발생하더라도
// 해당 노드의 비용보다 더 낮은 비용일 때만 중복된 노드를 추가해 준다. -> queue.push

// 기존 BFS의 visited -> 노드 방문 여부
// 해당 BFS의 visited -> 최소 가중치 즉, DP/메모이제이션
