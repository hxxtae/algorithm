function solution(begin, end) {
  const findBoard = (n) => {
    if(n === 1) return 0;
    let nums = 1;
    for(let j = 2; j <= Math.sqrt(n); j++) {
      if(n % j === 0) {
        if(n / j > 10_000_000) nums = j;
        else return (n / j); 
        // j는 작은 수 부터 증가하기 때문에
        // 약수의 큰 수 부터 먼저 반환된다.
      }
    }
    return nums * 1;
  }
  const result = [];
  for(let i = begin; i <= end; i++) {
    result.push(findBoard(i));
  }
  return result;
}

// NOTE: 문제 해결 능력

// [접근]
// begin <= n <= end
// n = 1 -> 0
// n = 소수 -> 1
// n = 위 두 n을 제외한 10^7 이하 수 -> 자기자신(n)을 제외한 가장 큰 약수

// 단 10_000_000 이하만 블록을 깔기 때문에 그 이상은
// 10_000_000 이하가 되도록 나누어 이하의 수가 되면, 해당 수 약수의 가장 큰 값만 블럭으로 판단한다.