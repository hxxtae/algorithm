const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...RELATION] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, relation) {
  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
  for (const [a, b] of relation) {
    graph[a][b] = 1;
  }
  
  for (let k = 1; k <= n; k++) { // 거쳐 가는 노드
    for (let r = 1; r <= n; r++) { // 출발 노드
      for (let c = 1; c <= n; c++) { // 도착 노드
        if (graph[r][c] > graph[r][k] + graph[k][c]) {
          graph[r][c] = graph[r][k] + graph[k][c];
        }
      }
    }
  }

  let result = 0;
  for (let r = 1; r <= n; r++) {
    let cnt = 0;
    for (let c = 1; c <= n; c++) {
      if (graph[r][c] !== Infinity || graph[c][r] !== Infinity) 
        cnt++;
    }
    if (cnt === n - 1)
      result++;
  }
  return result;
}

// -------------
// 출력
// -------------
const result = solution(N, M, RELATION);
console.log(result)

// [접근]
// 헤당 문제에서 각 학생의 키가 다른 학생으로부터 몇 번째인지 정확히 알 수 없다.
// 즉, 문제에서 요구하는 것은 해당 학생의 키가 다른 학생으로부터 상대적으로 몇 번째인지를 알 수 있는지 안다면
// 자신의 키가 몇 번째 인지 알 수 있다고 정의한다.
// -> 만약 1번 학생이 다른 2 ~ 6번 학생으로 부터 상대적인 등수를 모두 알 수 있다면
//    해당 1번 학생은 다른 학생으로 부터 상대적으로 몇 번째인지 알 수 있다.

// 플로이드 와샬 알고리즘을 통해 각 학생으로부터 각 학생과의 상대 등수를 구할 수 있다.

// [예제입력1 예시]
// [
//   [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],

//   [ Infinity, 1번 학생 : 0,        2,        Infinity, 2,        1,        3 ],
//   [ Infinity, 2번 학생 : Infinity, 0,        Infinity, Infinity, Infinity, Infinity ],
//   [ Infinity, 3번 학생 : Infinity, 2,        0,        1,        Infinity, 2 ],
//   [ Infinity, 4번 학생 : Infinity, 1,        Infinity, 0,        Infinity, 1 ],
//   [ Infinity, 5번 학생 : Infinity, 1,        Infinity, 1,        0,        2 ],
//   [ Infinity, 6번 학생 : Infinity, Infinity, Infinity, Infinity, Infinity, 0 ]
// ]

// -> 4번 학생과 1번 학생 비교 : arr[4][1] or arr[1][4] 중 상대 등수가 있으면 true
//    4번 학생과 2번 학생 비교 : arr[4][2] or arr[2][4] 중 상대 등수가 있으면 true
//    4번 학생과 3번 학생 비교 : arr[4][3] or arr[3][4] 중 상대 등수가 있으면 true
//    4번 학생과 4번 학생 비교 : 자기자신과는 비교 X
//    4번 학생과 5번 학생 비교 : arr[4][5] or arr[5][4] 중 상대 등수가 있으면 true
//    4번 학생과 6번 학생 비교 : arr[4][6] or arr[6][4] 중 상대 등수가 있으면 true