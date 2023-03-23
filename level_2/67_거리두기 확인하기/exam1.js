function checkOfDistance(place, queue, visited, row, col, deep, rLen, cLen) {
  const x = [1, 0, -1, 0];
  const y = [0, 1, 0, -1];
  for(let n = 0; n < 4; n++) {
    // 맨해튼 거리가 2를 넘기면, 이 사람은(P) 거리두기를 지킴
    if((deep + 1) > 2) break;
      
    const [nextR, nextC] = [row + x[n], col + y[n]];
    if(nextR < 0 || nextC < 0 || nextR >= rLen || nextC >= cLen) continue;
    if(visited[nextR][nextC]) continue;
    const next = place[nextR][nextC];
    if(next === 'X') continue;
      
    visited[nextR][nextC] = 1;
    queue.push([nextR, nextC, deep + 1]);
  }
}

function findResult(place, queue, visited) {
  for(let r = 0, rLen = place.length; r < rLen; r++) {
    for(let c = 0, cLen = place[r].length; c < cLen; c++) {
      const stuff = place[r][c];
      if(stuff !== 'P') continue;
      if(visited[r][c]) continue;
          
      queue.push([r, c, 0]);
      visited[r][c] = 1;
      while(queue.length) {
        const [row, col, deep] = queue.shift();
        
        checkOfDistance(place, queue, visited, row, col, deep, rLen, cLen);
        
        // 맨해튼 거리가 2이하 이면, 이 사람은(P) 거리두기를 지키지 않음
        if(place[row][col] === 'P' && deep > 0 && deep <= 2) return 0;
      }
      visited = Array.from({length: place.length}, () => Array(place[0].length).fill(0));
    }
  }
  return 1;
}

function solution(places) {
  const result = [];
  for(const place of places) {
    const queue = [];
    const visited = Array.from({length: place.length}, () => Array(place[0].length).fill(0));
    result.push(findResult(place, queue, visited));
  }
  return result;
}

// NOTE: DFS or BFS

// [접근]
// 최소 맨해튼 거리 즉, 2이하의 거리 안에서 사람(P)이 존재하면
// 그 사람은 거리두기를 지키지 않은 것으로 판단. -> result.push(0)

// 2를 초과한 거리 부터는 사람(P)이 존재하여도
// 그 사람은 거리두기를 지킨 것으로 판단 -> result.push(1)