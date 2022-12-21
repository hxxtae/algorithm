function solution(babbling) {
  const regexp1 = /^(woo|ma|aya|ye)+$/;
  const regexp2 = /(woo|ma|aya|ye)\1+/;

  return babbling.reduce((prev, curr) => (
    prev + regexp1.test(curr) && !regexp2.text(curr) ? 1 : 0
  ), 0);
}

// NOTE: 정규표현식 이용

/*
---------------------
Description
---------------------
- 해당 문자열 전체에 조건 문자열 모두 부합 : /^(woo|ye|aya|ma)+$/
- 해당 문자열 안에서 조건 문자열 중 같은 문자열 연속됨 : /(woo|ye|aya|ma)\1+/
  -> 연속된 문장열 검증 방법

※ flag: g(global)가 없으면 제일 먼저 참인 문자열을 탐색하며,
있으면 참인 문자열을 모두 찾는다.
*/