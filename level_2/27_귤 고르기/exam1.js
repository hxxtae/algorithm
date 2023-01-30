function solution(k, tangerine) {
  const map = new Map();
  for(let i = 0, len = tangerine.length; i < len; i++) {
    const size = tangerine[i];
    map.set(size, (map.get(size) || 0) + 1);
  }
  
  const sizeArr = [...map.values()].sort((a, b) => b - a);
  let total = 0,
      count = 0;
  for(let n = 0, len = sizeArr.length; n < len; n++) {
    count++;
    total += sizeArr[n];
    if(total >= k) break;
  }
  return count;
}

// NOTE: 탐색 / 해시