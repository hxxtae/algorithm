// 풀이 1.
function solution1(seoul) {
  const idx = seoul.indexOf("Kim");
  const resultStr = (idx) => `김서방은 ${idx}에 있다`;
  return resultStr(idx);
}

// 풀이 2.
function solution2(seoul) {
  const idx = seoul.findIndex((name) => name === "Kim");
  const resultStr = (idx) => `김서방은 ${idx}에 있다`;
  return resultStr(idx);
}
