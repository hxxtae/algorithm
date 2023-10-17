const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], POPULATION, ...SECTION] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, population, section) {
  const visited = Array(n + 1);
  const area = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, (_, i) => i > 0 ? section[i - 1].slice(1) : []);
  let minDiff = Infinity;

  // 2. 지정 구역 탐색 (연결 리스트 탐색)
  const bfs = (start, areaNum) => {
    const queue = [start];
    visited[start] = 1;

    while (queue.length) {
      const nowArea = queue.shift();
      for (const nextArea of graph[nowArea]) {
        if (!visited[nextArea] && (area[nextArea] === areaNum)) {
          visited[nextArea] = 1;
          queue.push(nextArea);
        }
      }
    }
  }

  // 1. 조합 DFS
  const dfs = (node) => {
    if (node === n + 1) {
      let link = 0;
      visited.fill(0);
      for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
          link++;
          bfs(i, area[i]);
        }
      }

      if (link === 2) {
        // 3. 구역별 인구수 구하기
        let area1 = 0;
        let area2 = 0;
        for (let i = 1; i <= n; i++) {
          if (area[i] === 1) area1 += population[i - 1];
          else if (area[i] === 2) area2 += population[i - 1];
        }
        minDiff = Math.min(minDiff, Math.abs(area1 - area2));
      }
      return;
    }

    // A구역 지정
    area[node] = 1;
    dfs(node + 1);

    if (area[1] === 2) return; // 같은 조합 종료

    // B구역 지정
    area[node] = 2;
    dfs(node + 1);
  }

  dfs(1);
  return minDiff !== Infinity ? minDiff : -1;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, POPULATION, SECTION);
console.log(result1);

// [접근]
// 1. DFS를 통해 노드의 모든 조합을 구한다. (예제 노드 길이: 6)
// 2. DFS을 통해 길이에 맞는 조합이 만들어 졌으면 해당 조합이 2개의 구역으로 나뉘는지 새로운 DFS나 BFS를 통해
//    연결 리스트의 개수를 카운트하는 함수를 구현하여 실행한다.
// 3. 해당 카운트가 2개이면 참 (2개의 구역으로 나뉘기 때문에) / 아니면 거짓을 판별하여
//    참인 경우 두 구역의 인구수 차이의 최솟값을 구한다.

// 즉, 조합 -> 2개 구역 판별 -> 참: 인구수 최솟값 판별 / 거짓: 다음 조합 반복