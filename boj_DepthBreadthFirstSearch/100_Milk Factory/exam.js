const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...TREE] = input;

// -------------
// 입력
// -------------
function solution(n, tree) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of tree) {
    graph[b].push(a); // NOTE: b -> a 방향 (문제와 반대로)
  }

  const dfs = (node, cnt) => {
    for (const next of graph[node]) {
      cnt = dfs(next, cnt + 1);
    }

    return cnt;
  }

  for (let i = 1; i <= n; i++) {
    const count = dfs(i, 1);
    if (count === n) return i;
  }

  return -1;
}

// -------------
// 입력
// -------------
const result = solution(N, TREE);
console.log(result);

// [접근]
// ### 설명
// 문제의 결론을 이야기 하자면, 임의의 정점 "i" 에서 출발하여, 자신을 제외한 모든 정점에 방문할 수 있는 i를 출력하는 문제다.

// ### 방법
// 모든 스테이션(정점)으로 부터 i 스테이션에 도달할 수 있는지 각 스테이션을 탐색하여 문제를 풀 수도 있지만,
// 반대로 스테이션 i로 부터 모든 스테이션에 방문할 있으면, 모든 스테이션으로 부터 스테이션 i로 도달할 수 있다는 의미와 같다.

// 문제 입력에서 a에서 b의 방향으로 주어진 두 정점간의 단뱡향 간선의 방향을 반대로 수정하여 위에서 말한 방식으로 DFS 탐색을 수행한다.