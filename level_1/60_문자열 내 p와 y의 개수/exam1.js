// 풀이 1.
function solution1(s){
  const pLen = s.match(/p/gi)?.length ?? 0;
  const yLen = s.match(/y/gi)?.length ?? 0;
  return pLen === yLen;
}

// 풀이 2.
function solution2(s) {
  const str = s.toLowerCase();
  return str.replaceAll('p','').length === str.replaceAll('y','').length;
}