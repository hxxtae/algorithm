function solution(s) {
  const len = Math.floor(s.length / 2);
  const result = [];
  let map = new Map();
  for(let n = 1; n <= len; n++) {
    let prevStr = s.slice(0, n);
    let twiceChk = false;
    let sameCnt = 1;
    for(let i = n; i < s.length; i += n) {
      const currStr = s.slice(i, i + n);
      if(prevStr === currStr) {
        twiceChk = true;
        sameCnt++;
      }
      else {
        map.set(prevStr, (map.get(prevStr) || 0) + (twiceChk ? n + sameCnt.toString().length : n));
        twiceChk = false;
        sameCnt = 1;
      }
      prevStr = currStr;
      if(i + n === s.length) map.set(currStr, (map.get(currStr) || 0) + (twiceChk ? n + sameCnt.toString().length : n));
      else if(i + n > s.length) map.set(currStr, (map.get(currStr) || 0) + currStr.length);
    }
    let total = 0;
    for(const count of map.values()) total += count;
    result.push(total);
    map = new Map();
  }
  return (s.length === 1) ? 1 : Math.min(...result);
}

// 풀었지만 코드가 더럽고 가독성이 떨어지므로 다시 풀어보자...