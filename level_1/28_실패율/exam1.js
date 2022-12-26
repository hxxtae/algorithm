// 풀이 1.
function solution(N, stages) {
  const map = new Map(Array.from({length: N}, (_, i) => [i + 1, 0]));
  const len = stages.length;
  for(let i = 0; i < len; i++ ) {
    const stage = stages[i];
    if(stage === N + 1) continue;
    map.set(stage, map.get(stage) + 1);
  }
  let thisStageLen = len;
  for(let n = 1; n <= N; n++) {
    const stage = n;
    const thisCount = map.get(stage);
    map.set(stage, (map.get(stage) / thisStageLen));
    thisStageLen -= thisCount;
  }
  return [...map].sort((a, b) => {
    const [a_stage, a_fail] = a,
          [b_stage, b_fail] = b;
    return b_fail - a_fail !== 0 ? b_fail - a_fail : a_stage - b_stage;
  }).map((v) => v[0]);
}

// NOTE: 해시 사용

// 풀이 2.
function solution(N, stages) {
  const map = [];
  for(let n = 1; n <= N; n++) {
    const stageCount = stages.filter((stage) => n === stage).length;
    const remainStageLen = stages.filter((stage) => n <= stage).length;
    map.push([n, stageCount / remainStageLen]);
  }
  return map.sort((a, b) => {
    const [a_stage, a_fail] = a,
          [b_stage, b_fail] = b;
    if(b_fail - a_fail === 0) return a_stage - b_stage;
    return b_fail - a_fail;
  }).map(([stage, fail]) => stage);
}

// NOTE: filter()

// ------------

// 2019 KAKAO BLIND RECRUITMENT
