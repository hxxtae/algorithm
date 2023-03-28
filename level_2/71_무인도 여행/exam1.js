function solution(maps) {
  const rLen = maps.length;
  const cLen = maps[0].length;
  const OCEAN = 'X';
  const result = [];
  const visited = Array.from({length: rLen}, () => Array(cLen).fill(0));
  const nextPos = (idx) => {
    const x = [1, 0, -1, 0];
    const y = [0, 1, 0, -1];
    return [x[idx], y[idx]];
  }
  
  for(let r = 0; r < rLen; r++) {
    for(let c = 0; c < cLen; c++) {
      const island = maps[r][c];
      if(island === OCEAN) continue;
      if(visited[r][c]) continue;
          
      // BFS
      const queue = [[r, c, island]];
      let stay = 0;
      visited[r][c] = 1;
      
      while(queue.length) {
        const [posY, posX, pos] = queue.shift();
        stay += +pos;
        for(let n = 0; n < 4; n++) {
          const [x, y] = nextPos(n);
          const islandY = posY + y;
          const islandX = posX + x;
          if(islandY >= 0 && islandX >= 0 && islandY < rLen && islandX < cLen) {
            if((maps[islandY][islandX] !== OCEAN) && (visited[islandY][islandX] === 0)) {
              const posNext = [islandY, islandX, maps[islandY][islandX]];
              queue.push(posNext);
              visited[islandY][islandX] = 1;
            }
          }
        }
      }
      result.push(stay);
    }
  }
  return result.length ? result.sort((a, b) => a - b) : [-1];
}

// NOTE: BFS (BFS 반복)