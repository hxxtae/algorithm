const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n').map(item => item.trim().split(' '));

// -------------
// 풀이 (DFS)
// -------------
function solution(input) {
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, deep, num) => {
    if (deep === 6) {
      result.add(num);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < 5 && nextX < 5) {
        dfs(nextY, nextX, deep + 1, num + input[nextY][nextX]);
      }
    }
  }

  const result = new Set();
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      dfs(r, c, 1, input[r][c]);
    }
  }
  return result.size;
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);

// [접근]
// 모든 DFS를 visited없이(방문한 정점 다시 방문 가능) 방문하여 깊이 우선 탐색을 수행한다.
// 6번째 노드를 방문 시 방문한 노드들을 기록한다.
// 단, 중복된 6자리 숫자는 기록하지 않는다.

// ---

// DFS탐색을 하면서 visited 없이 탐색이 이루어지면 '무한 루프'를 돌것이라고 생각할 수 있다.
// (문제에서는 무한루프가 돌 수 없게 입력값이 주어졌다.)
// - graph 방식 입력의 경우로 정점의 DFS(재귀-호출방식) 탐색이 이루어 지는 경우 무한 루프를 돌 수 있지만,
// - matrix 방식 입력과 4개의 방향의 DFS(재귀-호출방식) 탐색이 이루어 지면 재귀 함수가 기억하고있는 4개의 반복만 수행된다.