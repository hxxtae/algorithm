function solution(queue1, queue2) {
  const queue = [...queue1, ...queue2];
  const findSum = queue.reduce((sum, num) => sum + num, 0) / 2;
  const len = queue.length;
  let sum = queue1.reduce((sum, num) => sum + num, 0);
  let end = queue1.length;
  let count = 0;
  let loopEnd = false;
  
  for(let start = 0; start < len; start++) {        
    while(sum < findSum && end < len) {
      sum += queue[end];
      end += 1;
      count++;
    }
    if(sum === findSum) {
      loopEnd = true;
      break;
    };
    sum -= queue[start];
    count++;
  }
  return loopEnd ? count : -1;
}

// NOTE: 투포인터

// [찾고자 하는 합]
// queue1의 합과 queue2의 합이 같다면
// -> 두 queue의 합을 더한 값은 2n 이므로, 무조건 짝수가 된다.
// -> 그러므로, queue1과 queue2의 합이 같다면 queue1과 queue2의 합은 각각 n이 된다.
// 즉, queue1과 queue2 각각의 합은 n 이 되면 된다.

// [투포인터]
// 이를 투포인터를 활용하면
// [...queue1, ...queue2] 를 통해 start와 end의 포인터 위치를 잡아가면서,
// start와 end의 위치의 사이의 합이 n 이 되면 된다.

// 예)
// start          end
//   ▼             ▼
// [|3|, 2, 7, 2, |4|, 6, 5, 1]
