function solution1(priorities, location) {
  const result = [];
  const map = new Map();
  const len = priorities.length;
  for(let i = 0; i < len; i++) {
    const level = priorities[i];
    map.set(i, level);
  }
  const arr = [...map];
  for(let n of map) {
    while(1) {
      const [idx, level] = arr.shift();
      if(arr.find(([key, val]) => level < val)) arr.push([idx, level]);
      else {
        result.push(idx);
        break;
      }
    }
  }
  return result.indexOf(location) + 1;
}

// NOTE: 스택 / 힙 / 해시