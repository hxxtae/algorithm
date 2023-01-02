function solution(n) {
  return +[...(n.toString())].sort((a, b) => b - a).join('');
}
