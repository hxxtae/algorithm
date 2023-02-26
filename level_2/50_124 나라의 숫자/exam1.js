// 참고 풀이: 3진법을 알고리즘으로 구현한 방법
function refSolution(n) {
  const arr = ['0', '1', '2'];
  const recursive = (result, n) => {
    result = arr[n % 3] + result;
    if(parseInt(n / 3) === 0) return result;
    return recursive(result, parseInt(n / 3));
  }
  
  const num = 15;
  console.log(recursive('', 15)); // argument: result, n
  console.log(num.toString(3));
}

// 3진법
// [0, 1, 2]

// 0 => 0
// 1 => 1
// 2 => 2
// 3 => 10
// ...

// -------------------------

// 풀이
function solution(n) {
  const arr = ['1', '2', '4'];
  const recursive = (result, n) => {
    result = arr[n % 3] + result;
    if(parseInt(n / 3) === 0) return result;
    return recursive(result, parseInt(n / 3) - 1); // n -= 1
  }
  n -= 1;
  return recursive('', n);
}

// 3진법 매커니즘
// [1, 2, 4]

// ※ - 문제 에서는 0이 없으므로 1부터
//      (index를 맞춰주기 위해 n의 진법 계산은 n = n - 1로 시작한다.)
//      (3진법 : n = 1 이면 3진법 [0, 1, 2] 에서 1 % 3 = 1 이므로 index = 1 -> arr[1] = 1)
//      (124나라 진법 : n = 1 이면 3진법 [1, 2, 4] 에서 1 % 3 = 1 이므로 index = 1 -> arr[2] = 2)
//      --> 1은 2가 아니라 1이 나와야 한다. 그래서 n -= 1 수행.
// 0 => 1  -->  1(0) => 1
// 1 => 2  -->  2(1) => 2
// 2 => 4  -->  3(2) => 4
// 3 => 21 -->  4(3) => 11
// ...
