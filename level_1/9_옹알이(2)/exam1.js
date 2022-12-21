function solution(babbling) {
  const pasible = /woo|ye|ma|aya/g;
  return babbling.reduce((prev, curr) => {
      const str = curr.replace(pasible, '');
      if(str) return prev;
      const arr = curr.match(pasible);
      for(let i = 0, len = arr.length; i < len - 1; i++) {
          if(arr[i] === arr[i + 1]) return prev;
      }
      return prev + 1;
  }, 0);
}

// NOTE: 정규표현식 이용
