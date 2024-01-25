const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], TREE, ...PRAISE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, tree, praise) {
  praise = praise.slice(0, m); // ⚠ m으로 praise 범위 무조건 지정해 주어야 됨(해당 문제에서 입력에 문제가 있음)

  const praiseArr = Array(n + 1).fill(0); // 칭찬 DP
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let child = 0; child < n; child++) {
    const parent = tree[child];
    if (parent === -1) continue;
    graph[parent].push(child + 1);
  }
  
  for (const [node, val] of praise) {
    praiseArr[node] += val;
  }
  
  const dfs = (node, sum) => {
    for (const next of graph[node]) {
      praiseArr[next] += sum; // 칭찬 DP (praiseArr)
      dfs(next, praiseArr[next]);
    }
  }

  dfs(1, 0);
  
  return praiseArr.slice(1).join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, M, TREE, PRAISE);
console.log(result);

// [접근]
// 상사가 부하직원을 칭찬(val)하면, 칭찬받은 직원의 부하직원들도 동일하게 칭찬(val)을 받는다.

// 만약에 각 칭찬마다 탐색을 수행하게 된다면 시간초과(1000 x 100,000)가 발생할 것이다.
// 그렇기 때문에 먼저 DP 배열로 직원들의 칭찬 값을 저장해 놓고,
// 탐색을 하면서 창찬받은 직원이 있다면, 그 칭찬값을 다음 부하직원의 칭찬 정도에 누적시켜 준다.

