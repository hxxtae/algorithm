// 풀이 1.
function solution(s, skip, index) {
  const len = 26;
  const alphaArr = Array.from({length: len}, (_, i) => 
      [i+1, {
          char: String.fromCharCode(i+97),
          skip: false
      }]);
  alphaArr.forEach((arr) => {
      const obj = arr[1];
      obj.skip = skip.includes(obj.char);
  });
  const alphaMap = new Map(alphaArr);
  
  const result = [];
  for(const c of s) {
      let charNum = (c.charCodeAt() - 96);
      let count = index;
      while(count) {
          charNum++;
          charNum = (charNum % len ? charNum % len : len);
          if(!alphaMap.get(charNum).skip) count--;
      }
      result.push(alphaMap.get(charNum).char);
  }
  return result.join('');
}

// 풀이 2.
function solution(s, skip, index) {
  let alpha = Array.from({length: 26}, (_, i) => String.fromCharCode(i+97));
  alpha = alpha.filter((char) => !skip.includes(char));
  return [...s].map((c) => alpha[(alpha.indexOf(c) + index) % alpha.length]).join('');
}
