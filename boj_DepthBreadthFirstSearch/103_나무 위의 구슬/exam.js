const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[ N ], ...BINARY_TREE] = input;
const [ K ] = BINARY_TREE.pop();

// -------------
// 풀이 (DFS)
// -------------
function solution(n, binary_tree, k) {
  const tree = [[0, 0], ...binary_tree];

  const kOfNextDeepNode = (nodeK) => {
    const halfOfK = Math.floor(nodeK / 2);
    // k번째 넣은 구슬이 홀수 번째 일 때, 왼쪽 노드로 이동
    if (nodeK % 2 !== 0) {
      return [0, halfOfK + 1];
    }
    // k번째 넣은 구슬이 짝수 번째 일 때, 오른쪽 노드로 이동
    return [1, halfOfK];
  } // [ 자식 노드의 위치, 자식 노드의 K ]

  const dfs = (node, nodeK) => {
    const [left, right] = tree[node];
    if (left === -1 && right !== -1) {
      return dfs(right, nodeK);
    }
    if (left !== -1 && right === -1) {
      return dfs(left, nodeK);
    }
    if (left === -1 && right === -1) {
      return node;
    }
    const [pos, nextK] = kOfNextDeepNode(nodeK);
    const next = tree[node][pos];

    return dfs(next, nextK);
  }

  return dfs(1, k);
}

// -------------
// 출력
// -------------
const result = solution(N, BINARY_TREE, K);
console.log(result);

// [접근]
// ### 제출 문제
// 2%에서 계속 틀림...

// ### 방법
// binary tree의 루트에 구슬을 넣을때 K번째 넣은 구슬이 어느 리프 노드에 위치해야 하는지를 구해야한다.
// 해당 문제는 트이 DFS 구현 문제로, 이러한 문제는 지문에서 제시한 규칙을 잘 따라서 구현해주면 된다.

// 문제에서 주어진 규칙성을 바탕으로 크게 왼쪽, 오른쪽 자식 트리가 있고 구슬이 무제한으로 들어간다고 생각하자.
// 그러면 K가 홀수일 때는 항상 왼쪽 트리로 갈 것이고, K가 짝수일 때는 오른쪽 트리로 갈 것이다.
// (각 노드마다 구슬이 들어오면 왼쪽, 오른쪽, 왼쪽, 오른쪽 게속 반복하게 된다. 루트의 자식 노드만 봐도 그렇다.)

// 그럼 이제 재귀 방식으로 한 단계 더 밑으로 들어가기 위해서는 K값을 다음과 같이 연산해줘야 한다.
// - 홀수여서 왼쪽 노드로 이동한 경우 : K = (K / 2) + 1 로 연산해 주어야 한다.
// - 짝수여서 오른쪽 노드로 이동한 경우 : K = K / 2 로 연산해 주어야 한다.
