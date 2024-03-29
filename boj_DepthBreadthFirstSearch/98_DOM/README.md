# DOM

### Level: 실버2

<img class="left" src="https://d2gd6pc034wcta.cloudfront.net/tier/9.svg" style="width: 20px" />

| 시간 제한 | 메모리 제한 |
| -------- | ---------- |
| 1 초 | 256 MB |

## 문제 설명

한 양로원에서 N명의 노인들이 텔레비전을 시청하고 있습니다. 텔레비전 프로그램은 1부터 M까지의 번호로 표시된 M개의 채널로 구성되어 있습니다. 각 노인은 각자 선호하는 채널과 싫어하는 채널이 있습니다.

만약 현재 텔레비전이 특정 노인이 싫어하는 채널을 보여주고 있다면, 그 노인은 일어나서 천천히 텔레비전 채널을 선호하는 채널로 바꾸고 편안한 의자로 돌아갑니다. 현재 채널을 싫어하는 노인이 여러 명인 경우, 제일 어린 노인이 일어나서 채널을 바꿀 것입니다 (젊은 노인이라 괜찮아요). 나머지 노인들은 앉아 있습니다.

물론, 한 번의 채널 변경 후에 다른 노인이 새로운 채널을 참을 수 없다고 생각하여 해당 채널을 다시 변경할 수 있습니다. 노인들이 고집스러우므로 이 과정이 무한정 계속될 수 있습니다.

노인들의 선호하는 채널과 싫어하는 채널, 그리고 초기 텔레비전 채널에 대해, 노인들이 행복하게 앉아 있기 위해 필요한 채널 변경 횟수를 결정하십시오.

## 입력

입력의 첫 줄에는 세 정수 N, M, P (1 ≤ N, M ≤ 105, 1 ≤ P ≤ M)이 주어집니다. 이는 노인들의 수, TV 채널의 수 및 TV에서 표시된 초기 채널의 번호입니다.

그 다음 N개의 줄 각각에는 두 정수 ai와 bi (1 ≤ ai, bi ≤ M, ai ≠ bi)가 주어집니다. 이는 각 노인의 선호하는 채널과 싫어하는 채널입니다.

입력에서 노인들의 순서는 제일 어린 노인부터 제일 나이 많은 노인까지입니다.

## 출력

출력은 필요한 채널 변경 횟수를 나타내는 정수 하나만 포함해야 합니다. 변경이 계속해서 무한정 이루어진다면 -1을 출력합니다.

### 예제 입력1 & 예제 출력1

```text
3 4 2
1 2
2 3
3 2

```

```text
1

```

### 예제 입력2 & 예제 출력2

```text
3 3 1
1 2
2 3
3 1

```

```text
-1

```

### 예제 입력3 & 예제 출력3

```text
4 5 2
1 3
2 3
3 2
5 1

```

```text
3

```

## 힌트

첫 번째 예시에 대한 설명: 초기에는 TV에서 2번 채널이 나왔습니다. 이 채널은 가장 어린 노인과 가장 나이 많은 노인을 괴롭힙니다. 따라서 가장 어린 노인이 열정적으로 일어나서 모두가 함께 1번 채널을 시청할 수 있도록 채널을 변경합니다.

---

ref: https://www.acmicpc.net/problem/10552