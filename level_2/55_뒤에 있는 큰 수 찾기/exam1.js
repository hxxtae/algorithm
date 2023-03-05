function solution(numbers) {
  const result = Array(numbers.length).fill(-1);
  const stack = [];
  for(let i = 0, len = numbers.length; i < len; i++) {
    const num = numbers[i];
    // 오르막길
    while(stack.length && numbers[stack.at(-1)] < num) {
      result[stack.pop()] = num;
    }
    // 내리막길
    stack.push(i);
  }
  return result;
}

// NOTE: 스택

// [접근]
// 10 
//   9
//    8       10
//     7     9  4
//      6   8    2
//       5 7
//        4
// - 내리막에서는 stack에 index를 push 해준다.
// - 오르막에서는 stack의 마지막 index를 가지는 numbers에 오르막 number의 값으로 변경해 준다.
//   -> numbers[stack.pop()] = number;
// - 위 과정을 반복하고, 변경되지 않는 number는 -1로 변경해 주면 된다.

// [유사한 문제]
// - 백준 : 오큰수 (https://www.acmicpc.net/problem/17298)
// - 프로그래머스 : 주식가격
