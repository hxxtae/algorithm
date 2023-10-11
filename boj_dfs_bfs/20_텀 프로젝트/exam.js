const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [T] = input.shift();

// -------------
// 풀이 (DFS)
// -------------
function solution(n, students) {
  const visited = Array(n + 1).fill(0); // 초기 방문 확인
  const cycleCheckAndFinished = Array(n + 1).fill(0); // 이전 탐색 확인

  const dfs = (student) => {
    let next = students[student];
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next);
    } else {
      if (!cycleCheckAndFinished[next]) {
        count--;
        while (next !== student) {
          next = students[next];
          count--;
        }
      }
    }
    cycleCheckAndFinished[student] = 1;
  }

  let count = n;
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      dfs(i);
    }
  }
  return count;
}

// -------------
// 출력
// -------------
for (let i = 0; i < input.length; i+=2) {
  const [N] = input[i];
  const STUDENTS = input[i + 1];
  STUDENTS.unshift(0);
  const result = solution(N, STUDENTS);
  console.log(result);
}

// [접근]
// 팀을 구성하든, 구성하지 못하든 "마지막 순서의 노드는 순환을 이룸"
// (순환을 이루고 탐색(DFS)을 삐져나온다.)

// ex 1) 예제 입력 1에서, 2 → 1 → 3 → 3 (2, 1 은 팀을 못이루지만, 3은 혼자 팀을 이룸)
// ex 2) 예제 입력 1에서, 4 → 7 → 6 → 4 (4, 7, 6 이 팀을 이룸)
// => 링크를 따라 확인하면서, 순환을 이루는 학생들만 카운트 하기

// ---

// [변수 설명]
// ✨visited 
//   -> dfs 탐색 시 초기 방문 확인으로, 중복 방문 방지.
// ✨cycleCheckAndFinished 
//   -> 이미 이전에 dfs 탐색을 끝낸 경우, 즉 dfs을 모두 빠져 나가고 다시 dfs를 통한 탐색 시 재방문 방지.