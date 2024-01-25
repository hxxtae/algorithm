const fs = require('fs');
const stdin = fs.readFileSync('./input_2.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const N = +input[0];
const ENERGE = input.slice(1, N + 1).map(Number);
const ROOMS = input.slice(N + 1).map(list => list.split(' ').map(Number));

// -------------
// 풀이 (DFS)
// -------------
function solution(n, energe, rooms) {
  const table = Array.from({ length: 16 }, () => Array.from({ length: n + 1 }, () => ({})));
  const resultArr = Array(n).fill(1);
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, val] of rooms) {
    graph[a].push([b, val]);
    graph[b].push([a, val]);
  }
  
  // 과정 1 - 주어진 데이터를 통해 연결리스트 그래프 만들기
  const dfs = (node) => {
    for (const [next, val] of graph[node]) {
      if (!visited[next]) {
        visited[next] = 1;
        // 희소배열(sparse table) 데이터 생성: 노드가 1칸 이동 시 다음 노드의 위치
        table[0][next] = { parent: node, total: val };
        dfs(next);
      }
    }
  }

  visited[1] = 1;
  table[0][1] = { parent: 1, total: 0 }
  dfs(1);

  // 과정 2 - 연결리스트를 활용하여 희소배열(sparse table) 탐색을 위한 데이터 생성
  for (let i = 1; i <= 15; i++) {
    for (let node = 1; node <= n; node++) {
      table[i][node].parent = table[i - 1][table[i - 1][node].parent].parent;
      table[i][node].total = table[i - 1][table[i - 1][node].parent].total + table[i - 1][node].total;
    }
  }
  
  // 과정 3 - 희소배열(sparse table)을 통해 N * O(logN) 의 시간복잡도를 갖도록하여
  //          각 노드가 이동할 수 있는 최대 노드를 구한다.
  const onMoveRoom = (room) => {
    let target = room;
    for (let i = 15; i >= 0; i--) {
      if (table[i][target].parent !== 0 && table[i][target].total <= energe[room - 1]) {
        energe[room - 1] -= table[i][target].total;
        target = table[i][target].parent;
        if (target === 1) return target;
      }
    }

    return target;
  }

  for (let node = 1; node <= n; node++) {
    const arriveRoom = onMoveRoom(node);
    resultArr[node - 1] = arriveRoom;
  }
  
  return resultArr.join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, ENERGE, ROOMS);
console.log(result);

// [접근]
// ### 설명1
// 희소배열의 크기를 정하는 기준 -> 현재 문제에서는 15가지(길이는 16) 이다.
// 즉, 노드가 이동할 수 있는 모든 거리가 노드의 개수와 같거나 크면 된다.(큰사치 값)

// 현재 문제에서 최대 100,000 개의 노드가 주어진다.
// 그럼 각 노드가 이동할 수 있는 거리를 2진법(제곱근) 으로 나타내면
// 1(0), 2(1), 4(2), 8(3), 16(4), ... , 65536(15), 131072(16) 가 되며
// 100,000개 보다 크거나 작은 경우는 15(길이는 16), 16(길이는 17) 이 되며
// 둘 중 하나를 선택하여 희소배열의 크기를 정하면 된다.

// ### 설명2
// 과정2에서 i와 과정3 onMoveRoom 함수에서 i의 의미
// - i = 0: 각 노드(room)에서 위로 1 칸 이동 시 위치할 수 있는 노드
// - i = 1: 각 노드(room)에서 위로 2 칸 이동 시 위치할 수 있는 노드
// - i = 2: 각 노드(room)에서 위로 4 칸 이동 시 위치할 수 있는 노드
// - i = 3: 각 노드(room)에서 위로 8 칸 이동 시 위치할 수 있는 노드
//   ...
// - i = 17: 각 노드(room)에서 위로 131072 칸 이동 시 위치할 수 있는 노드

// -> 2진법의 비트를 활용하여 노드가 이동할 수 있는 칸을 찾는다.
//    ex) 만약 5칸을 이동할 수 있다면 i = 17 부터 탐색을 시작하여 i = 2, i = 0 인 경우를 탐색하게 된다.

// [참고]
// ref: https://hello-capo.netlify.app/algorithm-sparse-table/
// ref: https://velog.io/@rootachieve/%EB%B0%B1%EC%A4%80-14942-%EA%B0%9C%EB%AF%B8