const fs = require('fs');
const stdin = fs.readFileSync('./input_7.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], TREE, [REMOVE_NODE]] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, tree, remove_node) {
  const graph = Array.from({ length: n }, () => []);
  let root = 0;
  for (let i = 0; i < n; i++) {
    // 루트(root) 노드 찾기
    if (tree[i] === -1) {
      root = i;
      continue;
    }
    // 삭제될 노드(remove_node) 미리 지우기
    if (remove_node === i) continue;

    const parent = tree[i];
    graph[parent].push(i);
  }

  const dfs = (node) => {
    if (graph[node].length === 0) {
      count++;
      return;
    }
    for (const child of graph[node]) {
      dfs(child);
    }
  }

  let count = 0;
  remove_node === root || dfs(root);
  return count;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, TREE, REMOVE_NODE);
console.log(result1);

// [접근]
// 반례:
// - 루트의 경우 `-1`로 입력값의 주어지며 해당 인덱스가 루트 노드이다.
// - 루트노드가 0, 해당 자식이 1 이 존재하며, remove_node 가 1인 경우 루트 노드만 존재하게 된다.
//   -> 루트노드 자체가 리프 노드가 된다.
