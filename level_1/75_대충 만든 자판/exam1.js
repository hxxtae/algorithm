function solution(keymap, targets) {
  const keyMap = new Map();
  for(let i = 0, rLen = keymap.length; i < rLen; i++) {
    for(let j = 0, cLen = keymap[i].length; j < cLen; j++) {
      const key = keymap[i][j];
      const prevIdx = keyMap.get(key) ?? Infinity;
      keyMap.set(key, Math.min(prevIdx, j+1));
    }
  }
  const result = Array(targets.length).fill(0);
  let n = 0;
  for(const target of targets) {
    for(const key of target) {
      const keynum = keyMap.get(key);
      if(!keynum) {
        result[n] = -1;
        break;
      }
      result[n] += keynum;
    }
    n++;
  }
  return result;
}

// NOTE: Hash
