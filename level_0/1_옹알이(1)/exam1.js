function solution(babbling) {
  const regexp = /^(aya|ye|woo|ma)+$/;
  return babbling.reduce((count, str) => count + (regexp.test(str) ? 1 : 0), 0);
}

// NOTE: 문자열