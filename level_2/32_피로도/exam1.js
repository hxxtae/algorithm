function solution(k, dungeons) {
  const visited = Array.from({length: dungeons.length}, () => 0);
  let count = 0;
  
  const dfs = (deep, len, k) => {
    if(deep === len || count === len) {
      count = len;
      return;
    }
    for(let n = 0; n < len; n++) {            
      if(visited[n]) continue;
      const [door, minus] = dungeons[n];
      // 최소 필요 피로도(부족)
      if(k < door) {
        count = Math.max(count, deep);
        continue;
      }
      // 최소 필요 피로도(여유)
      visited[n] = 1;
      dfs(deep + 1, len, k - minus);
      visited[n] = 0;
    }
  }
  
  dfs(0, dungeons.length, k);
  return count;
}

// NOTE: 완전탐색 / DFS