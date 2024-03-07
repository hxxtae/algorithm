const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...U] = stdin.split('\n').map(item => +item.trim());

// -------------
// 풀이
// -------------
function solution(n, u) {
  const numSet = new Set(u);
  u.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      numSet.add(u[i] + u[j]);
    }
  }
  // -> O(NlogN)
  
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j >= 0; j--) {
      if (numSet.has(u[i] - u[j])) {
        return u[i];
      }
    }
  }
  // -> O(NlogN)
}

// -------------
// 출력
// -------------
const result = solution(N, U);
console.log(result);

// [접근]
// U[x] + U[y] + U[z] = U[k]를 통해 3개의 값을 구하는 방법보다
// U[x] + U[y] = U[k] - U[z]의 식으로 이항하여 알고리즘 풀이 방법에 적용하면 더 간단해 진다.

// U[x] + U[y] 의 값은 자료구조 Set에 넣어두고
// U의 집합 원소를 정렬한 뒤 가장 큰 값부터 위에서 정의한 식을 활용하여 답을 반환한다.
// - U[k] - U[z] = set.has(U[x] + U[y])
