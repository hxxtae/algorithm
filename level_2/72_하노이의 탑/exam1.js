function solution(n) {
  const result = [];
  const way = (N, start, to, vio) => {
    if(N === 1) result.push([start, to]);
    else {
      way(N-1, start, vio, to); // A탑에서 B탑으로 원판 이동
      result.push([start, to]); // A탑 마지막 원판 C탑으로 이동
      way(N-1, vio, to, start); // B탑에서 C탑으로 원판 이동
      // (규칙성 반복)
    }
  }
  way(n, 1, 3, 2);
  return result;
}

// NOTE: 재귀 / 하노이탑의 수학적 규칙성 문제

// [접근]
// ref: https://shoark7.github.io/programming/algorithm/tower-of-hanoi