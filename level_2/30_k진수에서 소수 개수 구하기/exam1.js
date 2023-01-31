function solution(n, k) {
  const launch = n.toString(k).replace(/0+/g, '0').split('0');
  if(launch.at(-1) === '') launch.pop();
  
  let count = 0;
  for(let num of launch) {
    if(findDecimal(+num)) count++;
  }
  return count;
}

function findDecimal(num) {
  if(num === 1) return false;
  for(let i = 2; i * i <= num; i++) {
    if(num % i === 0) return false;
  }
  return true;
}