const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [N, M] = input.shift();
const [TREE, TWOPOINTS] = input.reduce((arrs, arr) => {
  if (arr.length === 3) arrs[0].push(arr);
  else arrs[1].push(arr);
  return arrs;
}, [[], []]);

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, tree, twopoints) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, v] of tree) {
    graph[a].push([b, v]);
    graph[b].push([a, v]);
  }

  const dfs = (node, end, sum) => {
    if (node === end) return sum;

    for (const [next, val] of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        const distance = dfs(next, end, sum + val);
        visited[next] = 0;
        if (distance) return distance;
      }
    }
  }

  const result = [];
  for (const [start, end] of twopoints) {
    visited[start] = 1;
    result.push(dfs(start, end, 0));
    visited[start] = 0;
  }
  
  return result.join('\n');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, tree, twopoints) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, v] of tree) {
    graph[a].push([b, v]);
    graph[b].push([a, v]);
  }

  const bfs = (start, end, distance) => {
    const queue = [[start, distance]];
    visited[start] = 1;

    while (queue.length) {
      const [node, sum] = queue.shift();
      if (node === end) {
        distance = sum;
        break;
      }

      for (const [next, val] of graph[node]) {
        if (!visited[next]) {
          visited[next] = 1;
          queue.push([next, sum + val]);
        }
      }
    }

    return distance;
  }

  const result = [];
  for (const [start, end] of twopoints) {
    result.push(bfs(start, end, 0));
    visited.fill(0);
  }
  
  return result.join('\n');
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, TREE, TWOPOINTS);
const result2 = solution2(N, M, TREE, TWOPOINTS);
console.log(result1);
console.log(result2);

// [접근]
// 두 정점의 거리 즉, 트리에서 두 노드를 잇는 거리를 구하는 문제이다.
// (만약 트리가 아니라면 두 노드를 잇는 거리는 여러가지 일 것이다.)

// - DFS나 BFS 탐색 알고리즘을 선택하여 트리의 노드들을 탐색하면서 간선의 가중치 값을 함께 더해 간다.
// - 목적지 노드에 도착 시 해당 간선의 가중치 합을 출력값으로 넘겨주면 된다.