function solution(topping) {
  const left = new Map();
  const right = new Map();
  let count = 0;
  for(let item of topping) {
    right.set(item, (right.get(item) || 0) + 1);
  }
  for(let i = 0, len = topping.length; i < len; i++) {
    const item = topping[i];
    left.set(item, (left.get(item) || 0) + 1);
    right.set(item, right.get(item) - 1);
    if(right.get(item) <= 0) right.delete(item);
    if(left.size === right.size) count++;
  }
  return count;
}

// NOTE: 해시
