function solution(s) {
  const len = s.length;
  return (len % 2) ? s[parseInt(len/2)] : s[parseInt(len/2) - 1] + s[parseInt(len/2)];
}
