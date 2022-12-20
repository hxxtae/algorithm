function solution(a, b, n) {
  let count = 0;
  
  function rotation(total) {
      const returnCola = Math.floor(total / a) * b;
      const anyCola = (total % a);
      const totalCola = returnCola + anyCola;
      count += returnCola;
      
      if(a > totalCola)  return count;
      rotation(returnCola + anyCola);
  }
  
  rotation(n);
  return count;
}

// NOTE: 수학 , 재귀함수 사용
