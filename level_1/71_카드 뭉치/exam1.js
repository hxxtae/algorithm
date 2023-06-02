function solution(cards1, cards2, goal) {
  let result = "Yes";
  for(const word of goal) {
    if(cards1[0] === word) {
      cards1.shift();
      continue;
    }
    if(cards2[0] === word) {
      cards2.shift();
      continue;
    }
    result = 'No';
    break;
  }
  return result;
}