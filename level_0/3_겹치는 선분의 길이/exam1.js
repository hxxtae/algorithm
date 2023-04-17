// 풀이 1.
function solution1(lines) {
  let totalLen = 0;
  let totalStart = -Infinity,
      totalEnd = Infinity;
  for(let i = 0, len = lines.length - 1; i < len; i++) {
    const [a_start, a_end] = lines[i];
    for(let j = i + 1; j < len + 1; j++) {
      const [b_start, b_end] = lines[j];
      const maxStart = Math.max(a_start, b_start),
            minEnd = Math.min(a_end, b_end);
      totalLen += (maxStart < minEnd ? Math.abs(minEnd - maxStart) : 0); // 겹치는 구간 길이
      totalStart = Math.max(totalStart, maxStart);
      totalEnd = Math.min(totalEnd, minEnd);
    }
  }
  // 3개 겹치는 구간이 있으면 중복 길이 차감
  return totalStart > totalEnd ? totalLen : totalLen - Math.abs(totalEnd - totalStart) * 2 ;
}

// 풀이 2.
function solution2(lines) {
  const line = Array.from({length: 200}).fill(0);
  for(let [start, end] of lines) {
    for(; start < end; start++) line[100 + start]++;
  }
  return line.reduce((totalLen, len) => totalLen + (len >= 2 ? 1 : 0), 0);
}

// [접근]
// start와 end에 해당하는 공간을 모두 채운 후에 두번 이상 채워진 건 겹쳐진 것이므로 그것의 갯수를 구한다! 
// 속도 문제를 떠나서 정말 직관적인 아이디어라고 생각됩니다.