function solution(dartResult) {
  const darts = dartResult.match(/[0-9]+[SDT][\*\#]?/g);
  const scores = [];
  for(let i = 0, len = darts.length; i < len; i++) {
    let [score, bonus, option] = darts[i].match(/[0-9]+|[SDT]|[\*\#]?/g);
    score = scoreOfSDT(+score, bonus);
    score = scoreOption(score, option);
    if(option === '*') scores[i - 1] = scores[i - 1] * 2;
    scores.push(score);
  }
  return scores.reduce((prev, curr) => prev + curr, 0);
}

function scoreOfSDT(score, kind) {
  if(kind === 'D') return score ** 2;
  if(kind === 'T') return score ** 3;
  return score;
}

function scoreOption(score, kind) {
  if(kind === '*') return score * 2;
  if(kind === '#') return score * (-1);
  return score;
}

// NOTE: 정규표현식 사용

// ---------------

// 2018 KAKAO BLIND RECRUITMENT