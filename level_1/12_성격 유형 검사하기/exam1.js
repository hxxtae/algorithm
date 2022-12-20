function solution(survey, choices) {
  let result = '';
  const data = [['R', 0], ['T', 0], ['C', 0], ['F', 0], ['J', 0], ['M', 0], ['A', 0], ['N', 0]];
  const map = new Map(data);
  const len = survey.length;
  const filterMap = (A, B) => map.get(A) >= map.get(B) ? A : B;
  
  for(let i = 0; i < len; i++) {
      const [A, B] = survey[i].split('');
      const num = choices[i];
      const score = num >= 4 ? num - 4 : 4 - num;
      if(num < 4) map.set(A, (map.get(A) + score));
      if(num > 4) map.set(B, (map.get(B) + score));
  }
  for(let n = 0, table = [...map]; n < 8; n += 2) {
      const [leftChar, rightChar] = [table[n][0], table[n + 1][0]];
      result += filterMap(leftChar, rightChar);
  }
  return result;
}

// NOTE: 해쉬 사용
