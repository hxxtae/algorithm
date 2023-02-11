// 풀이 1.
function solution1(skill, skill_trees) {
  // LinkedList 객체 생성
  const link = [];
  for(let n = 0, len = skill.length; n < len; n++) {
    const step = skill[n];
    const next = skill[n + 1] || 'end';
    link.push([step, {step, next}]);
  }
  
  let count = 0;
  const map = new Map(link);
  const regex = new RegExp(`[${skill}]`, 'g');
  for(let i = 0, len = skill_trees.length; i < len; i++) {
    const skillArr = skill_trees[i].match(regex) || [];
    // 예외1: skillArr에 skill을 아무것도 포함하지 않는 경우
    if(skillArr.length === 0) {
      count++;
      continue;
    }
    // 예외2: skillArr의 처음이 skill의 처음과 다른 경우
    if(skillArr[0] !== skill[0]) continue;
    // 순서 확인
    if(confirmNext(skillArr, map)) count++;
  }
  return count;
}

function confirmNext(arr, linkMap) {
  for(let j = 0, len = arr.length; j < len - 1; j++) {
    const step = arr[j],
          next = arr[j + 1];
    if(linkMap.get(step).next !== next) return false;
  }
  return true;
}

// NOTE: LinkedList 처럼 자료구조 만들어 풀이

// 풀이 2.
function solution2(skill, skill_trees) {
  const regex = new RegExp(`[^${skill}]`, 'g');
  const len = skill_trees
    .map(tree => tree.replace(regex, ''))
    .filter(str => skill.indexOf(str) === 0 || str === "")
    .length;
  return len;
}
