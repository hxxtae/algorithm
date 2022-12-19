"use strict";

function solution(k, score) {
  const stack = [];
  
  return score.reduce((prev, curr) => {
    const len = stack.length;
    if(k > len) {
      stack.push(curr);
      stack.sort((a, b) => a - b);
      prev.push(stack[0]);
    } else {
      stack.push(curr);
      stack.sort((a, b) => b - a);
      stack.pop();
      prev.push(stack[len - 1]);
    }
    return prev;
  }, []);
};

// NOTE: 스택 사용
