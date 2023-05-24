function solution(maps) {
  const rlen = maps.length;
  const clen = maps[0].length;
  
  const findPoint = (target) => {
    let x, y;
    y = maps.findIndex((str) => (x = [...str].indexOf(target)) !== -1);
    return [x, y];
  }

  const [startX, startY] = findPoint('S');
  let visited = Array.from({length: rlen}, () => Array(clen).fill(0));
  let queue = [[startX, startY, 0]];
  visited[startY][startX] = 1;
  
  const findNext = (x, y, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [x+X[way], y+Y[way]];
  }

  const confirmXY = (x, y) => {
    if(x < 0 || y < 0 || x >= clen || y >= rlen) return true;
    if(maps[y][x] === 'X') return true;
    if(visited[y][x]) return true;
    return false;
  }

  let totalTime = 0;
  let checkLever = false, checkArrive = false;
  while(queue.length) {
    let [x, y, time] = queue.shift();
    // [레버 작동]
    if(maps[y][x] === 'L' && !checkLever) {
      totalTime += time;
      checkLever = true;
      // 상태 초기화
      time = 0;
      queue = [];
      visited = Array.from({length: rlen}, () => Array(clen).fill(0));
      visited[y][x] = 1;
    }
    // [출구 도착]
    if(maps[y][x] === 'E' && checkLever) {
      totalTime += time;
      checkArrive = true;
      // 탐색 종료
      break;
    }
    
    for(let i = 0; i < 4; i++) {
      const [nextX, nextY] = findNext(x, y, i);
      if(confirmXY(nextX, nextY)) continue;
      visited[nextY][nextX] = 1;
      queue.push([nextX, nextY, time+1]);
    }
  }
  return (checkLever && checkArrive) ? totalTime : -1;
}

// NOTE: BFS