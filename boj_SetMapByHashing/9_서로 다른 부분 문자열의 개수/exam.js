const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const S = stdin;

// -------------
// 풀이 1
// -------------
function solution1(s) {
  const strSet = new Set();
  for (let i = 0; i < s.length; i++) {
    let str = '';
    for (let j = i; j < s.length; j++) {
      str += s[j];
      strSet.add(str);
    }
  }
  
  return strSet.size;
}

// -------------
// 풀이 2
// -------------
function solution2(s) {
  const strArr = [];
  for (let i = 0; i < s.length; i++) {
    let str = '';
    for (let j = i; j < s.length; j++) {
      str += s[j];
      strArr.push(str);
    }
  }
  
  return new Set(strArr).size;
}

// -------------
// 풀이 3
// -------------
function solution3(s) {
  const strArr = [];
  const dfs = (deep, str) => {
    if (deep === s.length)
      return;

    strArr.push(str);
    dfs(deep + 1, str + s[deep + 1]);
  }

  for (let i = 0; i < s.length; i++) {
    dfs(i, s[i]);
  }

  return new Set(strArr).size;
}

// -------------
// 출력
// -------------
const result1 = solution1(S);
const result2 = solution2(S);
const result3 = solution3(S);
console.log(result1);
console.log(result2);
console.log(result3);

// [접근]
// ### 방법
// 주어진 문자열의 연속된 부분 문자열의 개수를 구해야 한다.
// 그리고 중복된 부분 문자열은 제외한 부분 문자열의 개수를 반환한다.
// - 연속된 부분 문자열의 개수 공식: n + (n-1) + (n-2) + ... + 1
// - 해당 문제에서는 연속된 부분 문자열의 중복를 제외한 개수를 반환해야 하므로 반복과 자료구조 Set을 통해 해결하였다.
