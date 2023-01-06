// 풀이 1.
function solution1(a, b) {
  let result = 0;
  const [min, max] = (a >= b ? [b, a] : [a, b]);
  for(let i = min; i <= max; i++) result += i;
  return result;
}


// 풀이 2.
function solution2(a, b) {
  return (a + b) * (Math.abs(b - a) + 1) * 0.5;
}

// NOTE: 가우스의 덧셈 공식
// -> (a + b) * (b - a + 1) * 0.5;