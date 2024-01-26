const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
let i = 0;
while (1) {
  const N = +input[i];
  if (N === 0) break;
  i += 1;
  const ROOMS = input.slice(i, i + N).map(item => item.split(' ').slice(0, -1));
  i += N;
  const result = solution(N, ROOMS);
  console.log(result);
}

// -------------
// 플이 (DFS)
// -------------
function solution(n, rooms) {
  const roomMap = Array(n + 1).fill(null);
  const visited = Array(n + 1).fill(0);
  const graph = Array(n + 1).fill(null);
  for (let i = 0; i < rooms.length; i++) {
    const [kind, pay, ...nexts] = rooms[i];
    roomMap[i + 1] = ({ kind, pay });
    graph[i + 1] = nexts.map(Number);
  }

  const roomInfo = (room, money) => {
    const { kind, pay } = roomMap[room];
    let go = true;
    if (kind === 'L' && money < pay) {
      money = pay;
    }
    if (kind === 'T') {
      if (money >= pay) {
        money =- pay;
        go = true;
      }
      else go = false;
    }

    return [money, go];
  }

  const dfs = (node, money) => {
    if (node === n) return true;

    for (const next of graph[node]) {
      const [nextMoney, go] = roomInfo(next, money);
      if (visited[next]) continue;
      if (!go) continue;

      visited[next] = 1;
      money = nextMoney;
      const end = dfs(next, money);
      if (end) return true;
      visited[next] = 0;
    }

    return false;
  }

  visited[1] = 1;
  const arrive = dfs(1, 0);
  
  return arrive ? 'Yes' : 'No';
}

// [접근]
// ### 방법
// 문제에서 조건은
// '레프리콘(L)'일 경우의 지정된 일정량의 금액 까지만 소지금을 충전시켜 준다.
// '트롤(T)'의 경우에는 지정된 금액만큼 소지금에서 차감된다.
// 만약 다음 방이 트롤인 경우에 소지금이 음수가 된다면, 해당 방으로 이동할 수 없다.

// - DFS탐색을 통해 각 방을 탐색하면서 조건에 부합하는지를 따지면서 탐색한다.
// - 탐색을 하면서 이미 지나온 방을 체크 한다. 재귀 탐색이므로 다시 이전 방으로 되돌아 갈 때에는 체크 이력을 되돌린다.
// - 만약 N번 방에 갈 수 있다면 함수를 종료시킨다.

// ### 의문점
// 중복된 방을 가는 경우에는 무한 반복으로 시간초과가 발생할 수 있다. 
// 그러나 중복된 방을 제외하고 탐색하여 N번 방에 도달할 수 없는 경우일 때, 
// 중복된 방을 허용하여 N번 방에 도달할 수 있는 테스트 케이스가 있을 수도 있다.