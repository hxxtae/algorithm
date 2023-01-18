function solution(s) {
  const stack = [];
  let prev = '';
  for(let i = 0, len = s.length; i < len; i++) {
    const c = s[i];
    if(c === prev) {
      stack.pop();
      prev = stack.at(-1);
      continue;
    }
    stack.push(c);
    prev = c;
  }
  return stack.length ? 0 : 1;
}

// NOTE: 스택 사용