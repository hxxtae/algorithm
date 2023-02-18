// 풀이 1.
function solution1(maps) {
  const xLen = maps[0].length,
        yLen = maps.length;
  const [targetX, targetY] = [xLen - 1, yLen - 1];
  let min = Infinity;
  let count = 1;
  let findTarget = false;
    
  const dfs = (x, y) => {
    if(x === targetX && y === targetY) {
      findTarget = true;
      min = Math.min(min, count);
      return;
    }
    for(let n = 0; n < 4; n++) {
      const [findX, findY] = findWay(x, y, n);
      if(findX < 0 || findX >= xLen || findY < 0 || findY >= yLen) continue;
      if(maps[findY][findX] !== 1) continue;
            
      maps[findY][findX] = 2;
      count++;
            
      dfs(findX, findY);            

      maps[findY][findX] = 1;
      count--;
    }
  }
  dfs(0, 0);
  return findTarget ? min : -1;
}

function findWay(x, y, n) {
  const wayX = [1, 0, -1, 0];
  const wayY = [0, -1, 0, 1];
  return [x + wayX[n], y + wayY[n]];
}

// NOTE: DFS
// 효율성 테스트: 시간 초과

// 풀이 2.
function solution2(maps) {
  const [xLen, yLen] = [maps[0].length, maps.length];
  const [targetX, targetY] = [xLen - 1, yLen - 1];
  const queue = [[0, 0, 1]]; // [x, y, count];
  let result = -1;           // result min count (not count: -1)
  while(queue.length) {
    const [x, y, count] = queue.shift();
    if(x === targetX && y === targetY) {
      result = count;
      break;
    }
    for(let n = 0; n < 4; n++) {
      const [nextX, nextY] = nextWay(x, y, n);
      if(nextX < 0 || nextX >= xLen || nextY < 0 || nextY >= yLen) continue;
      if(maps[nextY][nextX] !== 1) continue;
      maps[nextY][nextX] = 2;
      queue.push([nextX, nextY, count + 1]);
    }
  }
  return result;
}

function nextWay(x, y, n) {
  const wayX = [1, 0, -1, 0];
  const wayY = [0, -1, 0, 1];
  return [x + wayX[n], y + wayY[n]];
}

// NOTE: BFS
// 효율성 테스트: 통과