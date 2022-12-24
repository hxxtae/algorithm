function solution(a, b) {
  return a.reduce((sum, num, idx) => (sum += num * b[idx]), 0);
}
