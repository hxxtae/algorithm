// 풀이 1. replace 
function solution1(s, n) {
  return s.replace(/\w/g, (v) => {
    const code = v.charCodeAt();
    if(code <= 90 && code + n > 90) return String.fromCharCode(64 + ((code + n) % 90));
    if(code <= 122 && code + n > 122) return String.fromCharCode(96 + ((code + n) % 122));
    return String.fromCharCode(code + n);
  });
}

//풀이 2. replace use function parameter (1)
function solution2(s, n) {
  const alphabetLow = [...'abcdefghijklmnopqrstuvwxyz'],
        alphabetUp = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const commonLen = alphabetLow.length;
  return s.replace(/\w/g, (v) => {
    const low = alphabetLow.indexOf(v), 
          up = alphabetUp.indexOf(v);
    return (low !== -1) ? 
      alphabetLow[(low + n) % commonLen] : 
      alphabetUp[(up + n) % commonLen];
  });
}

// 풀이 3. replace use function parameter (2)
function solution3(s, n) {
  return s.replace(/([a-z])|([A-Z])/g, (char, lowChar) => {
    const startCode = lowChar ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
    const resultCode = ((char.charCodeAt() - startCode) + n) % 26 + startCode;
    return String.fromCharCode(resultCode);
  });
}

// NOTE: str.charCodeAt(index)
// - 해당 문자열 index의 위치에 존재하는 문자를 아스키코드로 변환
// - default index = 0