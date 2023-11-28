const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n');

// -------------
// 풀이 (DFS)
// -------------
function solution(input) {
  const [n, nodeA, nodeB] = input[0].split(' ').map(Number);
  const distanceArr = [];
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [a, b, val] = input[i].split(' ').map(Number);
    graph[a].push([b, val]);
    graph[b].push([a, val]);
  }

  const dfs = (node) => {
    if (node === nodeB) {
      return true;
    }
    for (let i = 0; i < graph[node].length; i++) {
      const [next, val] = graph[node][i];
      if (!visited[next]) {
        visited[next] = 1;
        distanceArr.push(val);
        const end = dfs(next);
        if (end) return true;
        distanceArr.pop();
      }
    }

    return false;
  }

  visited[nodeA] = 1;
  dfs(nodeA);
  
  return nodeA === nodeB ? 0
    : distanceArr.length < 2 ? 0
      : distanceArr.reduce((sum, num) => sum + num, 0) - Math.max(...distanceArr);
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);

// [주의할 점]
// 해당 문제에서 주의해야 할 점은 출력 조건이라 할 수 있다.
// 문제에서 두 로봇의 위치 즉, 두 노드의 위치만 주어지고 둘이 같은 위치에 있을 수 있는지
// 바로 통신이 가능한 위치에 있을 수 있는지 조건이 제시되지 않아 정답을 얻어내는데 어려움을 겪을 수 있다.

// [접근]
// N개의 노드와 N - 1개의 간선으로 이루어저 있으면 트리라 할 수 있다.
// 즉, 두 정점을 연결하는 선은 단 한 가지 경우만 존재한다. (트리가 아니면 여러가지 연결된 경우가 존재할 수 있다.)
// 그럼 두 정점을 잇는 모든 간선을 구하고, 가장 큰 간선의 길이를 모든 간선의 합에서 빼주면
// 두 로봇이 최소한으로 이동하여 통신할 수 있는 거리가 된다.