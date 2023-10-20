const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split(' ').map(Number);
const [A, B, C] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(a, b, c) {
  const visited = Array.from({ length: a + 1 }, () =>
    Array.from({ length: b + 1 }, () =>
      Array(c + 1).fill(0)));
  const result = [];
  
  const dfs = (waterA, waterB, waterC) => {
    if (visited[waterA][waterB][waterC]) return;

    visited[waterA][waterB][waterC] = 1;

    if (waterA === 0) {
      result.push(waterC);
    }
    
    // A -> B
    // 가득차거나 넘치는 경우
    if ((waterA + waterB) >= b)
      dfs((waterA + waterB) - b, b, waterC);
      // 가득차지 않는 경우
    else
      dfs(0, (waterA + waterB), waterC);

    // A -> C
    if ((waterA + waterC) >= c)
      dfs((waterA + waterC) - c, waterB, c);
    else
      dfs(0, waterB, (waterA + waterC));

    // B -> A
    if ((waterB + waterA) >= a)
      dfs(a, (waterB + waterA) - a, waterC);
    else
      dfs((waterA + waterB), 0, waterC);

    // B -> C
    if ((waterB + waterC) >= c)
      dfs(waterA, (waterB + waterC) - c, c);
    else
      dfs(waterA, 0, (waterB + waterC));
    
    // C -> A
    if ((waterC + waterA) >= a)
      dfs(a, waterB, (waterC + waterA) - a);
    else
      dfs((waterC + waterA), waterB, 0);
    
    // C -> B
    if ((waterC + waterB) >= b)
      dfs(waterA, b, (waterC + waterB) - b);
    else
      dfs(waterA, (waterC + waterB), 0);
  }

  dfs(0, 0, c);
  return result.sort((a, b) => a - b).join(' ');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(a, b, c) {
  const visited = Array.from({ length: a + 1 }, () =>
    Array.from({ length: b + 1 }, () =>
      Array(c + 1).fill(0)));
  const result = [];

  const bfs = (_a, _b, _c) => {
    const queue = [[_a, _b, _c]];

    while (queue.length) {
      const [waterA, waterB, waterC] = queue.pop();
      if (visited[waterA][waterB][waterC]) continue;
      visited[waterA][waterB][waterC] = 1;
      
      if (waterA === 0) {
        result.push(waterC);
      }

      // A -> B
      if ((waterA + waterB) >= b) queue.push([(waterA + waterB) - b, b, waterC]);
      else queue.push([0, (waterA + waterB), waterC]);

      // A -> C
      if ((waterA + waterC) >= c) queue.push([(waterA + waterC) - c, waterB, c]);
      else queue.push([0, waterB, (waterA + waterC)]);

      // B -> A
      if ((waterB + waterA) >= a) queue.push([a, (waterA + waterB) - a, waterC]);
      else queue.push([(waterA + waterB), 0, waterC]);

      // B -> C
      if ((waterB + waterC) >= c) queue.push([waterA, (waterB + waterC) - c, c]);
      else queue.push([waterA, 0, (waterB + waterC)]);
      
      // C -> A
      if ((waterC + waterA) >= a) queue.push([a, waterB, (waterA + waterC) - a]);
      else queue.push([(waterA + waterC), waterB, 0]);

      // C -> B
      if ((waterC + waterB) >= b) queue.push([waterA, b, (waterB + waterC) - b]);
      else queue.push([waterA, (waterB + waterC), 0]);
    }
  }

  bfs(0, 0, c);
  return result.sort((a, b) => a - b).join(' ');
}

// -------------
// 출력
// -------------
const result1 = solution1(A, B, C);
const result2 = solution2(A, B, C);
console.log(result1);
console.log(result2);

// [접근]
// 이 문제는 처음 문제를 보고 뜻을 잘 이해해야한다.

// 문제에서 A(8), B(9), C(10) 를 모든 경우의 수로 나타내면
// water[0][0][0]
// water[0][0][1]
// water[0][0][2]
// water[0][0][3]
// ...
// water[8][9][9]
// water[8][9][10]
// 처럼 물의 양을 '순열'로 나타낼 수 있댜.
// --------------------------

// DFS나 BFS를 수행하기 위해 다음 탐색 노드들 즉, 연결 리스트 요소들이 있어야 한다.
// 경우의 수를 탐색하기 위해서는 다음과 같은 탐색 범위를 가진다.
// (matrix 그래프 에서 상하좌우를 탐색하는 경우 처럼)
// A->B : A에서 B로 물을 부을때
// A->C : A에서 C로 물을 부을때
// B->A : B에서 A로 물을 부을때
// B->C : B에서 C로 물을 부을때
// C->A : C에서 A로 물을 부을때
// C->B : C에서 B로 물을 부을때

// 그리고 문제에서 다음과 같이 정의하였다.

// "어떤 물통에 들어있는 물을 다른 물통으로 쏟아 부을 수 있는데,
// 이때에는 한 물통이 비거나, 다른 한 물통이 가득 찰 때까지 물을 부을 수 있다."

// 즉, A라는 물통을 B라는 물통에 부을때, B가 가득찰 때까지 부어야 한다는 것이다.
// 그러면 문제의 조건처럼 (어느 한 통은 비거나) or (어느 한 통은 가득찰) 것이다.

// 그럼 A->B로 부을때 분기는 다음과 같이 두 가지 경우로 나눌 수 있게 된다.
//   1. B가 가득 차거나, 넘친 경우 (B는 가득차고[✔], A는 비거나 남을 수 있다.)
//   2. B가 가득 차지 않을 경우    (B는 가득차지 않지만, A는 무조건 비어있다.[✔])




