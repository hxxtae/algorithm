const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const [[N], ...ISLAND] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, island) {
  const graph = Array.from({ length: n + 1 }, () => []); // tree
  const islandInfo = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < island.length; i++) {
    const [t, a, p] = island[i];
    islandInfo[i + 2] = [t, a];
    graph[p].push(i + 2); // -> parent.push(child)
  }
  
  const dfs = (node, sum) => {
    for (const child of graph[node]) {
      sum += dfs(child, 0)
    }
    if (node === 1) return sum;
    const [t, a] = islandInfo[node];
    return (t === 'S') ? (sum + +a) : (sum - +a) < 0 ? 0 : (sum - +a);
  }

  return dfs(1, 0);
}

// -------------
// 출력
// -------------
const result = solution(+N, ISLAND);
console.log(result);

// [접근]
// 어떤 문제든 깊게 생각하면 아렵고 복잡해지기 마련이다.
// DFS를 탐색 시 리프노드까지 내려간 다음에 다시 위로 올라가면서 양의 개수를 반환해 주면 된다.
// 단 늑대의 개수에 따라 양의 개수를 감소 시켜주어야 한다.

// 가장 먼저 리프노드로 내려간 다음에 생각해보면 된다.
// - 리프노드가 양이면 그대로 부모 노드에 양의 누적 합을 반환해 주면 된다.
// - 리프노드가 늑대이면 늑대의 수 만큼 양의 누접 합에서 차감하여 부모 노드에 반환해 준다.
//   (단, 차감된 누적 합이 음수가 된 경우에 0을 반환해 준다.)

// 탐색과 재귀, 즉 DFS 알고리즘의 재귀적 특성을 활용하여 풀어내는 방식이다.
// 그리고 추가로 백트레킹 문제가 아닐까 싶다.