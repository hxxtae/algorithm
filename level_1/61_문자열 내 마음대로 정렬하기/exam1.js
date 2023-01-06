// 풀이 1.
function solution1(strings, n) {
  return strings.sort((a, b) => {
    if(a[n] > b[n]) return 1; 
    else if(a[n] < b[n]) return -1;  
    else if(a[n] === b[n]) {
      if(a > b) return 1;
      else if(a < b) return -1;
      else return 0;
    }
  });
}

// sort()는 문자열을 사전순으로 정렬한다.
// a > b 이면 사전순 이므로 return 1
// a < b 이면 사전순 반대 이르모 return -1
// a === b 이면 같은 문자열이므로 return 0

// 풀이 2.
function solution2(strings, n) {
  return strings.sort((a, b) => a[n] === b[n] ? a.localeCompare(b) : a[n].localeCompare(b[n]));
}

// str1.localeCompare(str2) 메서드는 참조 문자열(str1)이 정렬 순서에서 
// 주어진 문자열(str2)과 앞인지 뒤인지 또는 같은지 나타내는 숫자를 반환합니다.
// str1이 str2보다 앞이면 -1
// str1이 str2보다 뒤면 1
// str1이 str2와 같으면 0
// 쉽게 이해하자면 sort((a, b) => ) 에서 parameter a는 str1, b는 str2로 이해하면 쉽다.

// NOTE: 정렬 사용