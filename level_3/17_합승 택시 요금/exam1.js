function solution(n, s, a, b, fares) {
  const adj = Array
    .from({length: n+1}, (v, i) => Array
      .from({length: n+1}, (k, j) => j === i ? 0 : Infinity));
  for(const [s, e, dist] of fares) {
    adj[s][e] = dist;
    adj[e][s] = dist;
  }
  
  // 1. 거쳐가는 정점
  for(let k = 1; k <= n; k++) {
    // 2. 출발하는 정점
    for(let i = 1; i <= n; i++) {
      // 3. 도착하는 정점
      for(let j = 1; j <= n; j++) {
        if(adj[i][j] > adj[i][k] + adj[k][j]) {
          adj[i][j] = adj[i][k] + adj[k][j];
        }
      }
    }
  }
  let min = Infinity;
  for(let i = 1; i <= n; i++) {
    min = Math.min(min, adj[s][i] + adj[i][a] + adj[i][b]);
  }
  return min;
}

// NOTE: 플로이드 와샬