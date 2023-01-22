// 풀이 1.
function solution1(citations) {
  citations.sort((a, b) => b - a);
  const len = citations.length;
  let no = 0;
  while(++no) {
    if(no > citations[no - 1]) break;
    if(no > len) return len;
  };
  return --no;
}

// 풀이 2.
function solution2(citations) {
  citations.sort((a, b) => b - a);
  let h = 0;
  while (h + 1 <= citations[h]) {
    h += 1;
  }
  return h;
}

// 문제 설명 참고 (위키백과) : https://en.wikipedia.org/wiki/H-index
