// 풀이 1.
function solution1(n) {
  const lenOfOne = n.toString(2).match(/1/g).length;
  do ++n;
  while(lenOfOne !== n.toString(2).match(/1/g).length);
  return n;
}

// 풀이 2.
function solution2(n) {
  const lenOfOne = n.toString(2).match(/1/g).length;
  while(n++) if(lenOfOne === n.toString(2).match(/1/g).length) return n;
}