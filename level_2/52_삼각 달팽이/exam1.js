function solution(n) {
  const data = Array.from({length: n}, (v, i) => [i + 1, [[], []]]);
  const map = new Map(data);
  let result = [];
  let count = 0;
  let deep = 0;
  while(1) {
    if(n === 0) break;
    [count, deep] = downLoop(deep, n, map, count);
    n--;
      
    if(n === 0) break;
    count = rowLoop(deep, n, map, count);
    n--;
      
    if(n === 0) break;
    [count, deep] = upLoop(deep, n, map, count);
    n--;
  }
  for(let [key, arr] of map) {
    result = [...result, ...arr.flat(1)];
  }
  return result;
}

function downLoop(deep, len, map, count) {
  for(let i = 1; i <= len; i++) {
    map.get(++deep)[0].push(++count);
  }
  return [count, deep];
}

function rowLoop(deep, len, map, count) {
  for(let i = 1; i <= len; i++) {
    map.get(deep)[0].push(++count);
  }
  return count;
}

function upLoop(deep, len, map, count) {
  for(let i = 1; i <= len; i++) {
    map.get(--deep)[1].unshift(++count);
  }
  return [count, deep];
}
