const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, M] = input[0].split(' ').map(Number);
const girlGroups = [];
const psArr = [];
let nCnt = 1;

for (let i = 0; i < N; i++) {
  const groupName = input[nCnt++];
  const memberLen = +input[nCnt++];
  const members = input.slice(nCnt, nCnt + memberLen);
  nCnt += memberLen;
  girlGroups.push([groupName]);
  girlGroups[i].push([...members]);
}

for (let i = 0, mCnt = nCnt; i < M; i++, mCnt++) {
  const [name, kind] = [input[mCnt], +input[++mCnt]];
  psArr.push([name, kind]);
}

// -------------
// 풀이
// -------------
function solution(groupArr, psArr) {
  const groupMap = new Map(groupArr.map(([groupName, members]) => [groupName, new Set(members)]));

  const findGroupOfMember = (name) => {
    let result = '';
    for (const [groupName, members] of groupMap) {
      if (!members.has(name)) continue;
      result = groupName;
      break;
    }

    return result;
  }

  const answer = [];
  for (const [name, kind] of psArr) {
    if (kind === 0) {
      answer.push(...[...groupMap.get(name)].sort());
    }
    if (kind === 1) {
      answer.push(findGroupOfMember(name));
    }
  }

  return answer.join('\n');
}

// -------------
// 출력
// -------------
const result = solution(girlGroups, psArr);
console.log(result);

// [접근]
// 여러가지 문제 풀이 방법이 존재하겠지만 가장 흔한 방법은 두 개의 해시를 만들고 각 문제에 맞는 답을 출력해 주면 된다.
// 하지만 그 방법 말고 해시의 값으로 Set 객체를 두어 풀이하였다.

// Map(N) {그룹명 => 그룹맴버들이름 Set(n), ... }

// 이유는 그룹맴버 이름을 통해 그룹명을 찾고자 할 때 배열이면 맴버의 수 만큼 반복을 수행해야 하지만,
// 지료구조 Set 해시의 경우 맴버이름 즉, key값을 통해 1:1로 접근이 가능하기 때문이다.