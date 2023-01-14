function solution(s) {
  return s.split(' ')
    .map((text) => text?.toLowerCase().replace(/^[a-z]/, (c) => c.toUpperCase()))
    .join(' ');
}

// NOTE: 정규표현식 사용