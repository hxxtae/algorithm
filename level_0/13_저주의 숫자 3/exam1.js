function solution(n) {
  let num = 0;
  const chkNum3 = (_num) => (_num % 3 === 0) || (_num.toString().includes('3'));
  for(let i = 1; i <= n; i++) {
    num++;
    if(chkNum3(num)) while(chkNum3(num)) num++;
  }
  return num;
}

// NOTE: 문제 구현 능력