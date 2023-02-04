function solution(n, t, m, p) {    
  const result = [];
  let arr = [];
  let num = 0;
  while(1) {
    if(result.length >= t) break;
    const list = num.toString(n);
    for(let c of list) {
      c = c.toUpperCase();
      arr.push(c);            
      if(arr.length === p) result.push(c);
      if(arr.length % m === 0) arr = [];
    }
    num++;
  }
  result.splice(t);
  return result.join('');
}

// NOTE: 스택

// [접근]
// 1부터 시작되는 자연수를 2 ~ 16진법으로 변환 한 다음,
// 해당 진수의 각 숫자를 앞에서부터 하나씩 카운트하여
// 튜브가 말해야하는 카운트에 해당하는 수(혹은 A~F) 를 t 개 기록하면 된다.