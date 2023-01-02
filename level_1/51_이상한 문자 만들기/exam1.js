// 풀이 1.
function solution(s) {
  const textArr = s.split(' ');
  let resultStr = '';
  for(let i = 0, len = textArr.length; i < len; i++) {
    const charArr = [...textArr[i]];
    for(let n = 0, charLen = charArr.length; n < charLen; n++) {
      const char = charArr[n];
      resultStr += (n % 2 === 0) ? char.toUpperCase() : char.toLowerCase();
    }
    if(i !== (len - 1)) resultStr += ' ';
  }
  return resultStr;
}

// 풀이 2.
function solution(s) {
  const textArr = s.split(' ');
  const newTextArr = textArr
    .map(val => [...val]
      .reduce((text, char, charIdx) => text + ((charIdx % 2 === 0) ? 
        char.toUpperCase() : 
        char.toLowerCase()), ''));
  return newTextArr.join(' ');
}

// 풀이 3.
function solution(s) {
  return s.toUpperCase().replace(/(\w)(\w)/g, (a) => a[0].toUpperCase() + a[1].toLowerCase());
}