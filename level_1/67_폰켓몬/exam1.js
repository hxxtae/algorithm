// 풀이 1.
function solution1(nums) {
  const visitArr = Array.from({ length: nums.length + 1 }, () => 0);
  const MAX = nums.length / 2;
  const resultArr = nums.filter((num) => {
    const visitNum = visitArr[num];
    if (visitNum) return false;
    
    visitArr[num] = 1;
    return true;
  });
    
  return resultArr.length > MAX ? MAX : resultArr.length;
}

// 풀이 2. 중복제거방법(1)
function solution2(nums) {
  const setLen = nums.filter((num, idx, numArr) => numArr.indexOf(num) === idx).length;
  const getLen = parseInt(nums.length / 2);
  return setLen > getLen ? getLen : setLen;
}

// 풀이 3. 중복제거방법(2)
function solution3(nums) {
  const setLen = [...new Set(nums)].length;
  const getLen = parseInt(nums.length / 2);
  return setLen > getLen ? getLen : setLen;
}

// NOTE: 추후에 테스트 케이스가 추가되면 틀린 코드가 될 수 있다.
// NOTE: 2번 알고리즘이 제일 느리다.(indexOf의 반복 호출)
// NOTE: 3번 알고리즘이 제일 빠르다.