// 1.
function solution(people, limit) {
  people.sort((a, b) => a - b);
  const len = people.length;
  let start = 0, 
      end = len - 1;
  let count = 0;
  while(start <= end) {
    let sum = people[end];
    if(start === end) return ++count;
      
    for(; start <= end; start++) {
      const weight = people[start];
      if(sum + weight > limit) {
        end--;
        count++;
        break;
      }
      sum += weight;
    }
  }
  return count;
}

// NOTE: 탐욕법 (그리디 알고리즘) 사용
// 최선 or 최적의 선택 : 가장 무거운 사람과 가장 가벼운 사람끼리 최대한으로 뭉쳐서 limit 이하로 태운다.