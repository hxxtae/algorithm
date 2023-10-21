const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [R, C] = input[0].split(' ').map(Number);
const PIPELINE = input.slice(1);

// -------------
// 풀이 (DFS)
// -------------
function solution(r, c, pipeline) {
  let cnt = 0;
  const visited = Array.from({ length: r }, () => Array(c).fill(0));

  const findPipeWay = (y, x, way) => {
    const X = [1, 1, 1];
    const Y = [-1, 0, 1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, arrive) => {
    if (x === c - 1) {
      cnt++;
      return arrive = true;
    }
    for (let i = 0; i < 3; i++) {
      const [nextY, nextX] = findPipeWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
        if (pipeline[nextY][nextX] !== 'x' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          arrive = dfs(nextY, nextX);
          if (arrive) return true;
        }
      }
    }
  }

  for (let i = 0; i < r; i++) {
    if (pipeline[i][0] !== 'x') {
      visited[i][0] = 1;
      dfs(i, 0, false);
    }
  }
  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(R, C, PIPELINE);
console.log(result);

// [접근]
// 하나의 지점에서 시작해서 도달할 수 있는 경로가 여러개 있다면 반드시 최대한 위로 붙어서 가는 경로를 선택하는 게 유리합니다.
// 3가지 값중 위가 가장 좋은 이유는 0행(위)부터 R-1행(아래) 순서로 탐색을 진행하기 때문입니다.
// 위로 갈 수 있는데 다른 길을 선택하면 다음 출발주자의 도달 가능성을 해치게 됩니다.
// 즉, 위로 붙어서 가는 선택이 유리하다는 그리디(Greedy)한 선택을 해야 합니다.
