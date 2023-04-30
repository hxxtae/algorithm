function solution(chicken) {
  let count = 0;
  while(chicken >= 1) {
    chicken = (chicken / 10);
    count += chicken;
  }
  return parseInt(count);
}

// NOTE: 문제 구현 능력