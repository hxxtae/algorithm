const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [N, M, V] = input[0];
const LIST = input.slice(1);

// -------------
// 풀이
// -------------
function solution(N, M, V, list) {
  const matrix = Array.from({ length: N }, () => []);
  for (const [start, end] of list) {
    matrix[start - 1][end - 1] = 1;
    matrix[end - 1][start - 1] = 1;
  }
  const visited1 = Array(N).fill(0);
  const dfsResult = [];
  
  // DFS
  const dfs = (deep, node) => {
    if (deep === N) {
      return true;
    }
    for (let i = 0; i < N; i++) {
      if (visited1[i]) continue;
      if (!matrix[node][i]) continue;
      visited1[i] = 1;
      dfsResult.push(i + 1);
      const loop = dfs(deep + 1, i);
      if (loop) return true;
    }
  }

  // BFS
  const bfs = () => {
    const queue = [V-1];
    const bfsResult = [V];
    const visited2 = Array(N).fill(0);
    visited2[V - 1] = 1;
    
    while (queue.length) {
      const node = queue.shift();
      if (bfsResult.length === N) break;
      for (let i = 0; i < N; i++) {
        if (visited2[i]) continue;
        if (!matrix[node][i]) continue;
        visited2[i] = 1;
        queue.push(i);
        bfsResult.push(i + 1);
      }
    }
    return bfsResult;
  }

  visited1[V - 1] = 1;
  dfsResult.push(V);
  dfs(1, V - 1);
  return [dfsResult.join(' '), bfs().join(' ')];
}

// -------------
// 출력
// -------------
const [dfs, bfs] = solution(N, M, V, LIST);
console.log(`${dfs}\n${bfs}`);

// NOTE: 그래프 + (DFS, BFS)

// [접근]
// 일반적인 순열, 조합의 DFS, BFS가 아닌 그래프 즉, 정점과 간선으로 이어진 그래프에서의 DFS, BFS 문제 이다.
// - 일반적인 DFS, BFS의 경우 일차원 배열에서 각 인덱스의 순열 & 조합으로 경우의 수를 출력하지만,
// - 그래프로 주어진 DFS, BFS의 경우 이차원 배열에서 각 정점의 간선을 통해 경우의 수를 출력한다.

// 해당 문제는 간선으로 이어진 정점을 통해 V 정점을 시작으로 DFS와 BFS로 순회하면서,
// 해당 정점으로 부터 간선으로 이어진 다른 정점을 작은 정점부터 결과 배열에 담아가면 된다.