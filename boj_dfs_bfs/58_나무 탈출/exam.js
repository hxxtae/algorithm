const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력 (시간초과로 인해 입력 데이터 가공 최소화)
// -------------
const INPUT = stdin.split('\n');

// -------------
// 풀이 (DFS 1)
// -------------
function solution1(input) {
  const n = +input[0];
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  
  const dfs = (node, deep, leaf) => {
    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];
      if (!visited[next]) {
        leaf = false;
        visited[next] = 1;
        dfs(next, deep + 1, true);
      }
    }
    if (leaf) moveCnt += deep;
  }

  // 1번 노드를 루트 노드라 가정
  let moveCnt = 0;
  visited[1] = 1;
  dfs(1, 0, true);
  return (moveCnt % 2 !== 0) ? 'Yes' : 'No';
}

// -------------
// 풀이 (DFS 2)
// -------------
function solution2(input) {
  const n = +input[0];
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  
  const dfs = (node, parent, deep) => {
    // 리프 노드
    if (graph[node].length === 1 && graph[node][0] === parent) {
      moveCnt += deep;
      return;
    }

    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];
      if (next === parent) continue;
      dfs(next, node, deep + 1);
    }
  }

  // 1번 노드를 루트 노드라 가정
  let moveCnt = 0;
  dfs(1, -1, 0);
  return (moveCnt % 2 !== 0) ? 'Yes' : 'No';
}

// -------------
// 풀이 (BFS)
// -------------
function solution3(input) {
  const n = +input[0];
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  const bfs = (start, deep) => {
    let moveCnt = 0;
    const stack = [[start, deep]]; // [node, deep];
    visited[start] = 1;

    while (stack.length) {
      const [node, deep] = stack.pop();
      if (graph[node].length === 1 && node !== start) {
        moveCnt += deep;
        continue;
      }

      for (const next of graph[node]) {
        if (!visited[next]) {
          visited[next] = 1;
          stack.push([next, deep + 1]);
        }
      }
    }

    return moveCnt;
  }

  const count = bfs(1, 0);
  return (count % 2 !== 0) ? 'Yes' : 'No';
}

// -------------
// 출력
// -------------
const result1 = solution1(INPUT);
const result2 = solution2(INPUT);
const result3 = solution3(INPUT);
console.log(result1);
console.log(result2);
console.log(result3);

// [접근]
// "풀이 (DFS) 2번" 같은 경우 트리의 특성을 이용한 풀이이다.
// 각 정점을 간선으로 연결된 그래프(트리)는 부모와 자식 노드들 간의 간선은 하나의 경로로만 이어져 있다.
// 만약 A 라는 노드를 부모라 가정하면 B라는 자식은 A 부모와 연결된 간선은 반드시 하나 뿐이여야 한다.
// 그럼 B 노드를 지나서 가려면 반드시 A 를 거져야 한다. ✨