function solution(n) {
  return [...n.toString()].reduce((sum, num) => sum + +num, 0);
}
