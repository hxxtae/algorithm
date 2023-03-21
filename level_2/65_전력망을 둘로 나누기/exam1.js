function solution(n, wires) {
  const matrix = Array.from({length: n + 1}, () => []);
  wires.forEach(([r, c]) => {
    matrix[r].push(c);
    matrix[c].push(r);
  });
  const visited = Array(n + 1).fill(0);
  let count = 0;
  let minInterval = Infinity;
  
  const dfs = (row) => {
    count++;
    for(const col of matrix[row]) {
      if(visited[col]) continue;
      
      visited[col] = 1;
      dfs(col);
      visited[col] = 0;
    }
  }

  for(let i = 1; i <= n; i++) {
    visited[i] = 1;
    for(const col of matrix[i]) {
      visited[col] = 1;
      dfs(col);
      visited[col] = 0;
      
      // 차이의 최솟값
      minInterval = Math.min(minInterval, Math.abs(count - (n - count)));
      count = 0;
    }
    visited[i] = 0;
  }
  return minInterval;
}

// NOTE: DFS

// [접근]
// DFS의 시작 노드를 모든 노드가 한 번 씩 수행하며,
// 시작 노드로 부터 뻗어 나가는 노드의 총 개수가 n의 수와 비교하여
// 차이가 가장 적은(최솟값)수를 반환한다.

// 시작 노드: [1]
// 3, 2, 4, 6, 7, 5, 9, 8 (총 8개)

// 시작 노드: [2]
// 3, 1, 4, 6, 7, 5, 9, 8 (총 8개)

// 시작 노드: [3]
// 1 (총 1개)
// 2 (총 1개)
// 4, 6, 7, 5, 9, 8 (총 6개)

// 시작 노드: [4]
// 3, 1, 2 (총 3개)
// 6 (총 1개)
// 7, 9, 8 (총 3개)
// 5 (총 1개)

// 시작 노드: [5]
// 4, 3, 1, 2, 6, 7, 9, 8 (총 8개)

// 시작 노드: [6]
// 4, 3, 1, 2, 5, 7, 9, 8 (총 8개)

// 시작 노드: [7]
// 4, 3, 1, 2, 6, 5 (총 6개)
// 9 (총 1개)
// 8 (총 1개)

// 시작 노드: [8]
// 7, 4, 3, 1, 2, 6, 5, 9 (총 8개)

// 시작 노드: [9]
// 7, 4, 3, 1, 2, 6, 5, 8 (총 8개)

// count : 노드 개수
// n - count : 나머지 노드 개수
// 개수 차이 : Math.abs(count - (n - count))
// 개수 차이 최솟값 : Math.min(개수 차이)