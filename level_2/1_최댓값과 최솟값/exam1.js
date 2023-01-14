function solution(s) {
  const strArr = s.split(' ').map(Number);
  return `${Math.min(...strArr)} ${Math.max(...strArr)}`
}
