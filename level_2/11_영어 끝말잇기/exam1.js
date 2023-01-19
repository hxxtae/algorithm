function solution(n, words) {
  let end = words[0][0];
  const map = new Map();
  for(let i = 0, len = words.length; i < len; i++) {
    const num = (i + 1) % n || n, // 순서
          count = parseInt((i + n) / n); // 단계
    const word = words[i];
      
    map.set(word, (map.get(word) || 0) + 1);
    if(map.get(word) > 1) return [num, count];
    if(end !== word[0]) return [num, count];
    end = word.at(-1);
  }
  return [0, 0];
}

// NOTE: 탐색 / 해시

// 시작 단어가 틀리거나 -> 앞문자 Check = word[0] / 뒷문자 Check = word.at(-1), 
// 중복 단어를 말하거나 -> Map Check
// 1 ~ n -> (i % n)