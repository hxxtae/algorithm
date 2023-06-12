function solution(n, m, section) {
  let count = 0;
  const walls = Array(n + 1).fill(0);
  section.forEach((item) => walls[item] = 1);
  
  const wallPainting = (start, end) => {
    if(end > n) end = n + 1;
    for(let i = start; i < end; i++) 
      walls[i] = 0;
  }
  
  for(let i = 1; i <= n; i++) {
    if(walls[i] === 1) {
      wallPainting(i, i + m);
      count++;
    }
  }
  return count;
}