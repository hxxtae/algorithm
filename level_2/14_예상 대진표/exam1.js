// 풀이 1.
function solution1(n, a, b) {
  let count = 0;
  
  while(a !== b) {
    count++;
    a = (a % 2 === 0 ? a : a + 1);
    b = (b % 2 === 0 ? b : b + 1);
    a = a / 2;
    b = b / 2;
  }
  return count;
}

// 풀이 2.
function solution2(n, a, b) {
  let count = 0;
  
  while(a !== b) {
    count++;
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
  }
  return count;
}

// 2의 지수 이므로 다음 라운드로 1/2 만큼 라운드수가 줄어든다.
// 다음 라운드에는 절반만큼 참가자가 줄어듬으로, 이전 라운드의 짝수 번째 참가자의 절반이 다음 순서가 된다.