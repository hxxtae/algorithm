// 1. replaceAll
function solution(s) {
  const data = [['zero', 0], ['one', 1], ['two', 2], ['three', 3], ['four', 4], 
                ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]];
  const map = new Map(data);
  let result = s;
  for(let [strNum, num] of map) result = result.replaceAll(strNum, num);
  return +result;
}

// 2. split - join
function solution2(s) {
  const data = [['zero', 0], ['one', 1], ['two', 2], ['three', 3], ['four', 4], 
                ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]];
  const map = new Map(data);
  let result = s;
  for(let [strNum, num] of map) result = result.split(strNum).join(num);
  return +result;
}
