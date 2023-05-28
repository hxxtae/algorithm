function solution(n, times) {
  let min = Math.min(...times);
  let max = min * n;
  while(max !== min) {
    const mid = Math.floor((max + min) / 2);
    let time = 0;
    for(let i = 0; i < times.length; i++) {
      time += Math.floor(mid / times[i]);
    }
    if(time >= n) 
      max = mid;
    else 
      min = mid + 1;
  }
  return max;
}

// 풀이에 대한 접근 자체가 어렵다.
// 아이디어가 정말 중요한 문제.. 일단 동작 과정 즉, 알고리즘 자체를 외우자