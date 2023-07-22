function solution(ability) {
  const rowLen = ability.length;
  const colLen = ability[0].length;
  const visited = Array(colLen).fill(0);
  let max = 0;
  const dfs = (deep, sum) => {
    if(deep === colLen) {
      max = Math.max(max, sum);
      return;
    }
    for(let i = 0; i < rowLen; i++) {
      if(visited[i]) continue;
      visited[i] = 1;
      sum += ability[i][deep];
      dfs(deep+1, sum);
      sum -= ability[i][deep];
      visited[i] = 0;
    }
  }
  dfs(0, 0);
  return max;
}

// NOTE: DFS