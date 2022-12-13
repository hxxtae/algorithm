"use strict";

// 1.
function solution(s) {
  const visitedHistoryArr = Array.from({length: 26}, () => -1);
  const resultArr = s.split('').map((char, charIdx) => {
      const [code, codeIdx] = [char.charCodeAt() - 97, charIdx];
      // NOTE: 해당 소문자를 처음 방문
      if(visitedHistoryArr[code] === -1) {
          visitedHistoryArr[code] = codeIdx;
          return -1;
      }
      // NOTE: 해당 소문자를 방문한 적이 있음
      const distance = codeIdx - visitedHistoryArr[code];
      visitedHistoryArr[code] = codeIdx;
      return distance;
  });
  return resultArr;
}

// 2. 

// NOTE: 해시 사용
