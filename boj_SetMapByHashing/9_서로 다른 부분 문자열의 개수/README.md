# 서로 다른 부분 문자열의 개수

### Level: 실버3

<img class="left" src="https://d2gd6pc034wcta.cloudfront.net/tier/8.svg" style="width: 20px" />

| 시간 제한 | 메모리 제한 |
| -------- | ---------- |
| 1 초 | 512 MB |

## 문제 설명

문자열 S가 주어졌을 때, S의 서로 다른 부분 문자열의 개수를 구하는 프로그램을 작성하시오.

부분 문자열은 S에서 연속된 일부분을 말하며, 길이가 1보다 크거나 같아야 한다.

예를 들어, ababc의 부분 문자열은 a, b, a, b, c, ab, ba, ab, bc, aba, bab, abc, abab, babc, ababc가 있고, 서로 다른것의 개수는 12개이다.

## 입력

첫째 줄에 문자열 S가 주어진다. S는 알파벳 소문자로만 이루어져 있고, 길이는 1,000 이하이다.

## 출력

첫째 줄에 S의 서로 다른 부분 문자열의 개수를 출력한다.

### 예제 입력1 & 예제 출력1

```text
ababc

```

```text
12

```

---

ref: https://www.acmicpc.net/problem/11478