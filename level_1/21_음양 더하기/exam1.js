function solution(absolutes, signs) {
  return absolutes.reduce((sum, num, idx) => (sum += signs[idx] ? num : -num), 0);
}
