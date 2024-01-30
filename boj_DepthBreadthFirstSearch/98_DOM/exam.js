const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M, P], ...CHANNELS] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, p, channels) {
  const visitedChannels = Array(m + 1).fill(0);
  const seniorHateChannels = Array.from({ length: m + 1 }, () => []);
  for (let senior = 1; senior <= n; senior++) {
    const [love, hate] = channels[senior - 1];
    seniorHateChannels[hate].push([senior, love]);
    // -> [[채널 번호, ...,]]
    // -> 채널 번호(싫어하는 채널): [노인 번호, 좋아하는 채널]
  }
  
  // NOTE: 싫어하는 채널이 같은 노인들을 중에서, 젊은 순으로 오름차순 정렬
  for (const arr of seniorHateChannels) {
    arr.sort(([seniorA, _loveA], [seniorB, _loveB]) => seniorA - seniorB);
  }

  const dfs = (channel) => {
    // NOTE: 해당 채널을 싫어하는 노인이 아무도 없다면
    if (seniorHateChannels[channel].length === 0)
      return;

    // NOTE: 싫어 하는 채널이 같은 노인들 중에서 가장 젊은 노인
    const [_senior, love] = seniorHateChannels[channel][0];

    // NOTE: 계속 같은 채널 변경이 반복된다면
    if (visitedChannels[love])
      return cnt = Infinity;

    visitedChannels[channel] = 1;
    cnt += 1;

    dfs(love);
  }

  let cnt = 0;
  dfs(p);

  return cnt !== Infinity ? cnt : -1;
}

// -------------
// 출력
// -------------
const result = solution(N, M, P, CHANNELS);
console.log(result);
