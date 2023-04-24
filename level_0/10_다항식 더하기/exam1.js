function solution(polynomial) {
  const PLUS = ' + ';
  const arr = polynomial.split(PLUS);
  const answer = arr.reduce((result, poly) => {
    if(poly.includes('x')) result[0] += (poly.length === 1 ? 1 : +poly.match(/^[0-9]+/));
    else result[1] += +poly;
    return result;
  } , [0, 0]);
  if(answer[0] === 0) answer.shift();
  else answer[0] = (answer[0] === 1 ? 'x' : answer[0] + 'x');
  if(answer.length > 1 && answer[1] === 0) answer.pop();
  return answer.join(PLUS);
}

// NOTE: 문자열(문자열 다루기)