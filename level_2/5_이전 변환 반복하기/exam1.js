function solution(s) {
  let zeroCount = 0;
  let loopCount = 0;
  while(s > 1) {
      zeroCount += s.match(/0/g)?.length ?? 0;
      s = s.replace(/0+/g, '').length.toString(2);
      loopCount++;
  }
  return [loopCount, zeroCount];
}