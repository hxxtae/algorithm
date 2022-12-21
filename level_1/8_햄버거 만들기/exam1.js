function solution(ingredient) {
  const stack = [];
  const len = ingredient.length;
  let result = 0;
  for(let i = 0; i < len; i++) {
      stack.push(ingredient[i]);
      if(i < 3) continue;
      const stackStr = stack.slice(-4).join('');
      if(stackStr === '1231') {
          result++;
          stack.pop();
          stack.pop();
          stack.pop();
          stack.pop();
      }
  }
  return result;
}

// NOTE: 스택 이용
