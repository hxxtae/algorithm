// 풀이 1.
function solution1(s) {
  const regexp = /^\d+$/,
        len = s.length;
  return regexp.test(s) && (len === 4 || len === 6);
}

// 풀이 2.
function solution2(s) {
  const regexp = /^\d{4}$|^\d{6}$/;
  return regexp.test(s);
}

// NOTE: 정규표현식 사용