function solution(n) {
  const num = Math.sqrt(n);
  return Number.isInteger(num) ? (num + 1) ** 2 : -1;
}

// NOTE: Number.isInteger() 메서드는 주어진 값이 정수인지 아닌지 판별합니다.