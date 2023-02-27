// 풀이 1. (코드 실행 통과 but, 제출 시 시간초과)
function solution1(number, k) {
  const len = number.length;
  const numberState = new Map([...number].map((num, idx) => [idx, {num, state: true}]));
  let max = 0;
  const repeat = (start, deep) => {
    if(deep === k) {
      let nums = '';
      for(let [key, obj] of numberState) {
        nums += (obj.state ? obj.num : '');
      }
      max = Math.max(max, +nums);
      return;
    }
    for(let i = start; i <= (len - k) + deep; i++) {
      numberState.get(i).state = false;
      repeat(i + 1, deep + 1);
      numberState.get(i).state = true;
    }
  }
  repeat(0, 0);
  return max.toString();
}

// NOTE: 재귀

// 재귀로 풀면 테스트 케이스는 통과하지만
// 제출 후 체점하면 1, 11, 12 를 제외하고 시간 초과가 발생한다.

// 풀이 2
function solution2(number, k) {
  let stack = [];
  for(let num of number) {
    while(stack.length && stack.at(-1) < num && k > 0) {
      k -= 1;
      stack.pop();
    }
    stack.push(num);
  }
  if(k !== 0) stack = stack.slice(0, -k);
  return stack.join('');
}

// NOTE: 스택
