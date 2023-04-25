// 풀이 1.
function solution1(A, B) {
  let count = 0;
  const str = [...A];
  for(var i = 0, len = A.length; i < len; i++) {
      if(str.join('') === B) break;
      str.unshift(str.pop());
      count++;
  }
  return (i === len) ? -1 : count;
}

// 풀이 2.
function solution2(A, B) {
  return (B+B).indexOf(A);
}

// NOTE: 문자열(문자열 다루기)