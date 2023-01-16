// 풀이 1.
function solution1(s){
  let stack = []; // 대칭 여부 확인
  if(s.length < 2) return false;
  
  for(let i = 0, len = s.length; i < len; i++) {
    if(s[i] === ')') {
      if(stack.at(-1) === '(') stack.pop();
      else return false;
    } else stack.push('(');
  }
  return stack.length === 0 ? true : false;
}

// NOTE: 스택 사용

// 풀이 2.
function solution2(s){
  let stack = 0;
  if(s.length === 1) return false;
  else if(s[0] === ")") return false;
  else if(s.at(-1) === "(") return false;
  
  for(let i = 0, len = s.length; i < len; i++) {
    if(stack < 0) return false;
    s[i] === '(' ? stack++ : stack--;
  }
  return stack === 0 ? true : false;
}

// NOTE: 효율성이 좋은 코드

// 풀이 3.
function solution3(s) {
  if(s.length === 1) return false;
  else if(s[0] === ')') return false;
  else if(s.at(-1) === '(') return false;
  
  while(/\(\)/.test(s)) s = s.replace(/\(\)/g, '');
  return s.length ? false : true;
}
// NOTE: 코드는 심플하지만 효율적이지 못하다. ( "())(((((((()))))))"  인 경우 )