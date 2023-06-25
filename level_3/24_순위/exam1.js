function solution(n, results) {
  const matrix = Array
    .from({length: n+1}, (_, i) => Array
      .from({length: n+1}, (_, j) => i === j ? 0 : Infinity));
  for(const [win, lose] of results) {
    matrix[win][lose] = 1;
    matrix[lose][win] = -1;
  }
  for(let k = 1; k <= n; k++) {
    for(let i = 1; i <= n; i++) {
      for(let j = 1; j <= n; j++) {
        // i가 k를 이겼고, k가 j를 이겼을면
        // -> i는 j를 이겼고, j는 i한테 패배했다.
        if(matrix[i][k] === 1 && matrix[k][j] === 1) {
          matrix[i][j] = 1;
          matrix[j][i] = -1;
        }
      }
    }
  }
  return matrix.reduce((count, arr) => count += arr.slice(1).includes(Infinity) ? 0 : 1, 0);
}

// [접근]
// [4, 3] [3, 2]
// 4가 3을 이겼고
// 3은 2를 이겼다면
// -> 4는 2를 이겼다고 할 수 있으며, 2는 4에게 졌다고 할 수 있다.
// DP[4][2] = 1
// DP[2][4] = -1
// 즉, 각 선수(정점)에서 각 선수(정점)들 간의 승패

// NOTE: 플로이드 와샬(유사)
// -> '다익스트라'는 하나의 노드로 부터 각 노드들 까지의 최단 거리를 구하지만
// '플로이드 와샬'의 경우 모든 노드들에 대한 각 노드들 까지의 최단 거리를 구한다.