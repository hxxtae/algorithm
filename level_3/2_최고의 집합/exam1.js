function solution(n, s) {
  const arr = [];
  const num = Math.floor(s / n);
  const rem = s % n;
  if(!num) return [-1];
  for(let i = 1; i <= n - rem; i++) {
    arr.push(num);
  }
  for(let i = 0; i < rem; i++) {
    arr.push(num + 1);
  }
  return arr;
}

// NOTE: 문제 해결 능력

// [접근]
// 원소의 모든 합이 s 인 n개의 원소 중에서
// 원소의 모든 곱이 최대값을 가지게 하려면 

// (나머지 x)
// s를 s/n 으로 나눈 값(A)을 가능한 최대한 많이 원소로 가지며,

// ----

// (나머지 o)
// s / n 으로 나머지가 발생한 경우 나머지의 개수 만큼 나눈 값(A)를 합하면
// s가 되지 못하기 때문에, n(원소의 개수)에서 나머지 값(B) 만큼 차감하여
// (n - 나머지) 만큼 나눈 값(A)을 원소로 가지게 된다.

// 그리고 나머지 값, 즉 남은 원소의 개수 만큼 나눈 값(A) + 1 의 값을 원소로 가지게 된다.

// ----

// 요약 -> 9를 2개로 나누면 4 + 4 + 1 -> 4 + 5


