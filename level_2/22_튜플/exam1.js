function solution(s) {
  const map = new Map();
  const arr = s.match(/\d+/g);
  const len = arr.length;    
  for(let i = 0; i < len; i++) {
    const num = arr[i];
    map.set(num, (map.get(num) || 0) + 1);
  }
  return [...map].sort(([a_key, a_val], [b_key, b_val]) => b_val - a_val).map(([key, val]) => +key);
}

// NOTE: 해시
