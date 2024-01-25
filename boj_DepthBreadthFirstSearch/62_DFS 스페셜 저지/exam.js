const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...TREE] = input;
const ANSWER = TREE.pop();

// -------------
// 풀이 (DFS)
// -------------
function solution(n, tree, answer) {
  const order = Array(n + 1);
  const resultArr = [];
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of tree) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // 각 노드마다 순서를 지정해준다.
  for (const [key, node] of answer.entries()) {
    order[node] = key;
  }
  
  // 지정된 노드의 순서대로 연결리스트 노드들의 순서를 정렬해준다.
  for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => order[a] - order[b]);
  }

  const dfs = (node) => {
    resultArr.push(node);
    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(next);
      }
    }
  }

  visited[1] = 1;
  dfs(1);
  
  return +resultArr.every((num, idx) => num === answer[idx]);
}

// -------------
// 출력
// -------------
const result = solution(N, TREE, ANSWER);
console.log(result);

// [접근]
// 4
// 1 2
// 1 3
// 2 4
// 1 3 2 4
// 입력이 이렇게 주어졌을 때
// DFS로 탐색할 때 1번 노드에서 출발하면, 2번 3번 중 방문 순서를 선택해야 한다.
// 2번을 먼저 방문하기로 선택하면 1 2 4 3 이렇게 탐색하고
// 3번을 먼저 선택하면 1 3 2 4 순서로 탐색하게 된다.

// 그럼 2번 노드와 3번 노드 중 어떤 걸 먼저 탐색하게 해야 할까?
// 보통 일반적인 DFS나 BFS문제에서는 어떤 노드를 먼저 탐색하게끔 문제를 만들지 않는다.
// 결과적으로 전부 탐색한 뒤 어떤 결과값을 갖는지를 많이 물어본다.
// 하지만 이 문제에서는 어떤 노드를 먼저 탐색할지 정해주는 과정이 필수적이다.

// 문제 입력 마지막 줄에 예상 DFS탐색 순서가 주어진다.
// 만약 위처럼 1 3 2 4 이렇게 주어졌다면, 풀이의 DFS를 수행할 때 3번 노드를 2번 노드 보다 먼저 택해야 한다.

// 즉, 마지막 예상 DFS탐색 순서를 바탕으로 어떤 노드를 먼저 탐색해야할지 정해주고,
// 정해진 노드 탐색 순서를 바탕으로 DFS를 수행했을 때 예상 DFS 탐색 순서와 일치하는지 확인하는 문제이다.

// [해결]
// 마지막 행의 결과 순서가 1, 3, 2, 4 인 경우
// 항상 탐색 순서는 1번 노드가 첫번째, 3번 노드가 두번째, 2번 노드가 세번째, 4번 노드가 네번째로 돌아야한다.
// 이를 위해 N개의 길이를 가지는 order 배열에 순서에 해당하는 노드를 저장해준다.
// order[2] = 3 이면 2번 노드가 3번째 순서라는 뜻이다.
// -> order[node] = num

// 그리고 이런 우선순위를 바탕으로 인접리스트(graph)의 노드들을 정렬해준다.
