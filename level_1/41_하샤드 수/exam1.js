function solution(x) {
  const positionSum = [...x.toString()].reduce((sum, num) => +sum + +num);
  return (x % positionSum === 0) ? true : false;
}
