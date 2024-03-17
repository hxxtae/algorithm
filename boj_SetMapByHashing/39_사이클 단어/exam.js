const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...WORDS] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, words) {
  const wordSet = new Set();

  const partOfStr = (str, start, len) => {
    return str.slice(start, (start + len));
  }

  words.forEach((word) => {
    const len = word.length;
    const wordRep = word.repeat(2);
    let confirm = false;
    for (let i = 0; i < len; i++) {
      const partStr = partOfStr(wordRep, i, len);
      if (wordSet.has(partStr)) {
        confirm = true;
        break;
      }
    }
    if (!confirm)
      wordSet.add(word);
  });

  return wordSet.size;
}

// -------------
// 출력
// -------------
const result = solution(N, WORDS);
console.log(result);

// [접근]
// 문제에서 문자열을 둥근 원형 모양을 가지도록 문자열을 구성하면 해당 문자열을 사이클을 가지게 된다.
// 주어진 문자열들을 모두 사이클을 가지는 원형으로 만들었을 때, 문자열이 다른 경우의 개수를 판단하여
// 서로 다른 단어가 총 몇 개인지 구해야 한다.

// 1. 문자열 두 개를 이어 붙여서 만든다.

// 2. 문자열의 기존 길이 만큼 붙여진 문자열의 앞에서 부터 부분 문자열의 구한다.

// 3. 반복을 통해 구한 모든 부분 문자열이 해시(단어 종류 해시)에 존재여부 확인
//    - 해시에 존재하지 않는다면 해시에 단어 추가
//    - 해시에 존재한다면 다음 문자열로 넘어간다.

// 4. 모든 문자열 반복을 마치고 해시의 길이를 반환한다. (단어 종류의 개수)