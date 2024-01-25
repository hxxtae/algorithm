const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [T] = input.shift();

// -------------
// 풀이 (DFS)
// -------------
function solution(n, tree, a, b) {
  const graph = Array.from({ length: n + 1 }, () => []);
  let root = (n * (n + 1)) / 2;
  for (const [parent, child] of tree) {
    graph[parent].push(child);
    root -= child;
  }

  let parentsOfA = [];
  let parentsOfB = [];
  
  const dfs = (parent, visitedParents) => {
    if (parent === a) parentsOfA = [...visitedParents];
    if (parent === b) parentsOfB = [...visitedParents];
    for (const child of graph[parent]) {
      visitedParents.push(child);
      dfs(child, visitedParents);
      visitedParents.pop();
    }
  }

  dfs(root, [root]);
  
  let idx = 0;
  let answer;
  while (parentsOfA[idx] === parentsOfB[idx]) {
    answer = parentsOfA[idx++];
  }
  return answer;
}

// -------------
// 출력
// -------------
for (let i = 0, k = 0; i < T; i++) {
  const [N] = input[k++];
  const TREE = input.slice(k, (k + N) - 1);
  const [A, B] = input[(k + N) - 1];
  k += N;
  const result = solution(N, TREE, A, B);
  console.log(result);
}