// 풀이 1.
function solution1(n) {
  let thisNum = 1, 
      count = 0;
  while(thisNum <= n) if(decimal(thisNum++)) count++;
  return count;
}

function decimal(num) {
  if(num === 1) return false;
  for(let i = 2; i * i <= num; i++) {
    if(num % i === 0) return false;
  }
  return true;
}

// 풀이 2. Set
function solution2(n) {
  const set = new Set();
  // 소수 중 가장 작은 수는 2이고, 소수 중 짝수는 2뿐이다.
  // 즉, 2를 제외하고 소수는 홀수로 존재한다.
  for(let i = 1; i <= n; i += 2) {
    set.add(i);
  }
  set.delete(1);
  set.add(2);
  
  set.forEach((num) => {
    if(!decimal(num)) set.delete(num);
  });
  return set.size;
}

function decimal(num) {
  if(num === 1) return false;
  // 홀수만 판별하여 시간 단축
  for(let i = 3; i * i <= num; i += 2) {
    if(num % i === 0) return false;
  }
  return true;
}
