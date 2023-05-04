// 풀이1.
function solution(operations) {
  const arr = [];
  for(let i = 0, len = operations.length; i < len; i++) {
      const [order, n] = operations[i].split(' ');
      if(order === "I") arr.push(+n);
      if(order === "D" && n === '1' && arr.length > 0) arr.pop();
      if(order === "D" && n === '-1' && arr.length > 0) arr.shift();
      arr.sort((a, b) => a - b);
  }
  return arr.length === 0 ? [0, 0] : [arr.at(-1), arr[0]];
}

// NOTE: heap / sort