function solution(s) {
  const len = s.length;
  let max = 0;
  // 팰린드롬 확인 함수
  const evenAndOdd = (left, right, count) => {
    if(s[left] === s[right]) {
      count += 2;
      max = Math.max(max, count);
      return [count, true];
    }
    return [count, false];
  }
  for(let i = 0; i < len; i++) {
    let left = i-1, right = i+1;
    let acount = 0, bcount = 1;
    let a = true, b = true;
    while(left >= 0) {
      // 짝수 팰린드롬
      a && ([acount, a] = evenAndOdd(left, right-1, acount));
      // 홀수 팰린드롬
      b && ([bcount, b] = evenAndOdd(left, right, bcount));
      if(!a && !b) break;
      left--;
      right++;
    }
  }
  return max ? max : 1;
}

// NOTE: 문자열 / 문제 구현 능력

// [접근]
// 팰린드롬을 이루는 부분문자열의 길이가 짝수, 홀수 인 경우를 나누어 탐색

// [주의할 점]
// 팰린드롬이 없는 경우는 팰린드롬이 0이 아닌 1이다.
// 'abcde' 의 경우 기준이 a인 경우 팰린드롬은 a이므로 1이 된다.
// 마찮가지로 다른 알파벳 기준도 동일하다.
// -> 이걸로 40분동안 고민했네...ㅎㅎ