// 풀이 1.
function solution1(progresses, speeds) {
  let deployIdx = -1;
  const result = [];
  for(let i = 0, len = progresses.length; i < len; i++) {
    if(progresses[i] < 100) {
      result.push(0);
      deployIdx++;
    }
      
    while(progresses[i] < 100) {
      for(let n = i; n < len; n++) progresses[n] += speeds[n];
    }
      
    if(progresses[i] >= 100) result[deployIdx]++;
  }
  return result;
}

// NOTE: 스택 사용

// while로 progresses의 배열의 앞에서 부터 가리키는 포인터가 100을 넘는지 반복 조건을 가진다.
// 가리키는 포인터가 100 이상이면 progresses를 순회하며 100 이상인 요소들을 카운트 한다.
// (100 이하인 요소를 발견 시 다시 while의 조건에 걸리게 된다.)

// 풀이 2.
function solution2(progresses, speeds) {
  let answer = [0];
  let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
  let maxDay = days[0];

  for(let i = 0, j = 0; i< days.length; i++){
    if(days[i] <= maxDay) {
      answer[j] += 1;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }
  return answer;
}

// NOTE: 스택 사용

// (남은 작업진도 / 작업 속도) 를 나누어 총 걸리는 작업량으로 나타내어
// 맨 앞 작업량이 뒷 작업량보다 크면 기능 갯수 +
// 맨 앞 작업량이 뒷 작업량보다 작으면 기능 갯수 카운트 pass
