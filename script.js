'use strict';

// 각 축에 4문항씩 배치합니다. 선택지는 단일 성향만 채점합니다.
const QUESTIONS = [
  { axis: 'EI', emoji: '🛋️', category: '주말의 나', title: '아무 일정 없는 주말,\n어떻게 보내고 싶나요?', options: [['친구에게 연락해서 같이 할 일을 찾는다.', 'E'], ['혼자만의 시간을 느긋하게 즐긴다.', 'I']] },
  { axis: 'SN', emoji: '🛸', category: '낯선 발견', title: '처음 보는 신기한 물건!\n가장 먼저 드는 생각은?', options: [['어디에 쓰는 물건이지? 사용법부터 본다.', 'S'], ['이걸로 또 뭘 할 수 있을까? 상상해 본다.', 'N']] },
  { axis: 'TF', emoji: '🌧️', category: '친구의 고민', title: '친구가 속상한 일을\n이야기할 때 나는?', options: [['상황을 정리하고 해결 방법을 함께 찾는다.', 'T'], ['친구의 마음을 먼저 듣고 공감해 준다.', 'F']] },
  { axis: 'JP', emoji: '🧳', category: '여행 전날', title: '내일은 여행 가는 날!\n오늘 밤 내 모습은?', options: [['준비물과 이동 경로를 한 번 더 확인한다.', 'J'], ['꼭 필요한 것만 챙기고 내일의 나를 믿는다.', 'P']] },
  { axis: 'EI', emoji: '🎉', category: '새로운 모임', title: '처음 만난 사람들이\n많은 모임에 왔다면?', options: [['먼저 인사하며 이야기를 시작한다.', 'E'], ['분위기를 살피며 편한 사람과 대화한다.', 'I']] },
  { axis: 'SN', emoji: '🍳', category: '새로운 도전', title: '처음 만드는 요리,\n어떤 방식이 편한가요?', options: [['재료의 양과 순서가 구체적인 레시피.', 'S'], ['기본 원리를 알고 내 방식대로 응용하기.', 'N']] },
  { axis: 'TF', emoji: '⚖️', category: '함께하는 결정', title: '여럿이 의견을 정할 때\n더 먼저 살피는 것은?', options: [['일관된 기준과 객관적인 장단점.', 'T'], ['사람들의 입장과 각자 중요하게 여기는 것.', 'F']] },
  { axis: 'JP', emoji: '📝', category: '해야 할 일', title: '이번 주 안에 해야 할 일이\n생겼어요. 나는?', options: [['언제 무엇을 할지 정해 두면 마음이 놓인다.', 'J'], ['상황과 컨디션에 맞게 유연하게 진행한다.', 'P']] },
  { axis: 'EI', emoji: '🔋', category: '에너지 충전', title: '조금 지친 하루 끝,\n나를 충전해 주는 것은?', options: [['좋아하는 사람들과 수다 떠는 시간.', 'E'], ['방해받지 않고 조용히 쉬는 시간.', 'I']] },
  { axis: 'SN', emoji: '🎬', category: '영화가 끝나고', title: '영화를 보고 나서\n더 이야기하고 싶은 것은?', options: [['기억에 남는 장면과 배우들의 섬세한 연기.', 'S'], ['숨겨진 의미와 그 이후에 이어질 이야기.', 'N']] },
  { axis: 'TF', emoji: '💬', category: '솔직한 피드백', title: '친구가 작품에 대한\n솔직한 의견을 물었어요.', options: [['더 나아질 부분과 이유를 명확히 짚어 준다.', 'T'], ['노력한 마음을 알아주며 표현을 신중히 고른다.', 'F']] },
  { axis: 'JP', emoji: '🗺️', category: '쉬는 날의 산책', title: '처음 가는 동네를\n구경한다면 나는?', options: [['가고 싶은 곳을 정해 동선을 짜 본다.', 'J'], ['발길 닿는 대로 걷다가 끌리는 곳에 간다.', 'P']] },
  { axis: 'EI', emoji: '💡', category: '생각 정리', title: '머릿속에 새로운 생각이\n떠오를 때 나는?', options: [['누군가와 이야기하면서 생각을 발전시킨다.', 'E'], ['혼자 충분히 생각한 뒤 다른 사람에게 말한다.', 'I']] },
  { axis: 'SN', emoji: '🌱', category: '새로운 아이디어', title: '새 아이디어를 들었을 때\n더 마음이 가는 쪽은?', options: [['경험과 사례를 통해 실현 가능성을 살피기.', 'S'], ['아직 해보지 않은 새로운 가능성을 탐색하기.', 'N']] },
  { axis: 'TF', emoji: '🤝', category: '의견이 다를 때', title: '서로 의견이 다를 때\n더 신경 쓰이는 것은?', options: [['주장의 근거가 타당하고 앞뒤가 맞는지.', 'T'], ['서로의 마음과 가치가 존중받고 있는지.', 'F']] },
  { axis: 'JP', emoji: '🚀', category: '마지막 선택', title: '계획이 갑자기 바뀌었어요.\n나에게 더 자연스러운 반응은?', options: [['바뀐 상황에 맞는 새 계획을 먼저 세운다.', 'J'], ['오히려 좋아! 가능한 선택지를 열어 둔다.', 'P']] }
];

const RESULTS = {
  ISTJ: { title: '정돈별 기록관', emoji: '🗂️', tagline: '우주가 혼란스러워도, 내 서랍은 정돈되어 있지.', tags: ['차분한 책임감', '믿음직한 루틴', '꼼꼼한 관찰'], description: '차근차근 쌓은 경험과 약속을 소중히 여기는 외계인이에요. 구체적인 사실을 살피고 맡은 일은 끝까지 챙겨요. 익숙한 일상을 단단하게 지키는 힘이 있어요.', habit: '약속 장소와 시간을 다시 확인하고, 필요한 것을 미리 챙겨요.', recharge: '정돈된 공간에서 익숙한 취미를 나만의 속도로 즐기기.' },
  ISFJ: { title: '포근별 돌봄대원', emoji: '🧸', tagline: '네가 좋아하는 간식, 말 안 해도 챙겨 왔어.', tags: ['다정한 기억력', '조용한 배려', '든든한 일상'], description: '사람들의 작은 취향을 기억하고 행동으로 마음을 전하는 외계인이에요. 조용히 주변을 살피며 소중한 관계를 지켜요. 당신의 세심함 덕분에 지구가 조금 더 포근해져요.', habit: '누군가 불편해 보이면 필요한 것을 슬쩍 건네요.', recharge: '편한 공간에서 좋아하는 음식과 소소한 취미 즐기기.' },
  INFJ: { title: '마음별 길잡이', emoji: '🔮', tagline: '말하지 않은 마음에도, 별자리가 보여.', tags: ['깊은 공감', '의미 수집가', '조용한 신념'], description: '눈에 보이는 일 너머의 의미와 사람의 마음을 탐색하는 외계인이에요. 혼자 깊이 생각하고 소중한 가치에 따라 움직여요. 진심이 통하는 대화에서 특별한 힘을 얻어요.', habit: '친구가 툭 던진 말도 오래 생각하며 마음을 헤아려요.', recharge: '조용한 산책이나 기록으로 머릿속 생각을 정리하기.' },
  INTJ: { title: '설계별 전략가', emoji: '🛰️', tagline: '아직 출발 안 했어. 다음 행성까지 설계 중이야.', tags: ['긴 안목', '독립적 사고', '계획하는 상상'], description: '새로운 가능성을 논리적인 계획으로 연결하는 외계인이에요. 스스로 판단하고 더 나은 방법을 찾는 일을 즐겨요. 긴 호흡으로 목표를 향해 나아가는 모습이 매력적이에요.', habit: '반복되는 불편함을 발견하면 더 효율적인 방법을 구상해요.', recharge: '방해 없는 시간에 관심 있는 주제를 깊이 파고들기.' },
  ISTP: { title: '뚝딱별 해결사', emoji: '🛠️', tagline: '설명은 잠깐만. 일단 내가 한번 해볼게.', tags: ['실전 감각', '차분한 분석', '자유로운 손길'], description: '눈앞의 상황을 관찰하고 직접 시도하며 답을 찾는 외계인이에요. 필요할 때 침착하게 문제를 해결해요. 자기 방식대로 움직일 여유가 있을 때 실력이 빛나요.', habit: '작동하지 않는 물건을 보면 원리를 살펴보고 손을 대봐요.', recharge: '혼자 무언가를 만들거나 몸을 움직이며 머리 비우기.' },
  ISFP: { title: '취향별 산책가', emoji: '🌷', tagline: '오늘은 이 빛깔이 좋아. 이유는 그냥 좋은걸.', tags: ['섬세한 취향', '따뜻한 자유', '지금의 즐거움'], description: '지금 이 순간의 감각과 자기만의 취향을 소중히 여기는 외계인이에요. 마음을 크게 말하기보다 작은 행동으로 보여줘요. 일상에서 아름다운 순간을 발견하는 재주가 있어요.', habit: '산책하다 마음에 드는 풍경을 만나면 잠깐 멈춰요.', recharge: '좋아하는 음악과 풍경 속에서 일정 없이 쉬어가기.' },
  INFP: { title: '몽글별 공상가', emoji: '☁️', tagline: '잠깐 딴생각했는데, 우주 끝까지 다녀왔어.', tags: ['풍부한 상상', '소중한 진심', '나만의 세계'], description: '상상과 마음속 가치를 따라 자신만의 우주를 만드는 외계인이에요. 작은 이야기에도 깊이 공감하고 진심을 중요하게 여겨요. 당신만의 시선이 평범한 하루에 특별한 의미를 더해요.', habit: '노래 한 곡에 나만의 장면과 이야기가 펼쳐져요.', recharge: '혼자 글, 음악, 그림처럼 마음이 향하는 세계에 머물기.' },
  INTP: { title: '물음별 연구원', emoji: '🔬', tagline: '근데 왜? 그건 왜? 마지막으로 하나만 더 왜?', tags: ['끝없는 호기심', '논리 탐험', '자유로운 사고'], description: '당연해 보이는 것에도 질문을 던지는 외계인이에요. 생각의 구조를 이해하고 새로운 설명을 찾는 일을 즐겨요. 정해진 답보다 탐구하는 과정에서 재미를 발견해요.', habit: '사소한 궁금증을 검색하다 전혀 다른 분야까지 탐험해요.', recharge: '시간에 쫓기지 않고 궁금한 주제를 마음껏 파고들기.' },
  ESTP: { title: '번개별 행동파', emoji: '⚡', tagline: '일단 가보자. 도착하면 방법이 보이겠지!', tags: ['빠른 순발력', '현장 감각', '짜릿한 도전'], description: '주변 상황을 빠르게 읽고 직접 부딪치며 배우는 외계인이에요. 사람들과 함께 움직일 때 에너지가 살아나요. 변화하는 순간에도 현실적인 해결책을 찾아내요.', habit: '갑작스러운 제안에도 재미있어 보이면 바로 움직여요.', recharge: '친구와 운동하거나 새로운 장소에서 생생한 경험 쌓기.' },
  ESFP: { title: '반짝별 분위기요정', emoji: '🪩', tagline: '지구에 왔으면, 오늘부터 신나게 살아야지!', tags: ['기분 좋은 활기', '순간의 즐거움', '따뜻한 관심'], description: '사람들과 현재의 즐거움을 나누는 외계인이에요. 주변의 표정과 분위기를 세심하게 느끼고 자연스럽게 활기를 더해요. 함께하는 평범한 순간을 작은 축제로 만들어요.', habit: '맛있는 음식이나 좋은 장소를 찾으면 같이 즐길 사람을 떠올려요.', recharge: '좋아하는 사람과 맛있는 것을 먹고 신나게 웃기.' },
  ENFP: { title: '딴생각별 모험가', emoji: '🌈', tagline: '우리 이거 해볼까? 아니, 이것도! 저것도!', tags: ['아이디어 폭발', '호기심 가득', '마음을 잇는 힘'], description: '새로운 가능성과 사람들의 이야기에 설레는 외계인이에요. 자유롭게 아이디어를 펼치고 의미 있는 일에 열정을 쏟아요. 당신의 호기심은 주변 사람에게도 새로운 문을 열어줘요.', habit: '대화 도중 아이디어가 떠올라 다음 모험을 제안해요.', recharge: '새로운 장소를 구경하거나 마음이 통하는 사람과 이야기하기.' },
  ENTP: { title: '발상별 실험가', emoji: '💡', tagline: '꼭 그렇게 해야 해? 반대로 하면 더 재밌는데.', tags: ['발상의 전환', '생각 실험', '유쾌한 토론'], description: '익숙한 규칙을 다른 각도에서 보는 외계인이에요. 사람들과 생각을 주고받으며 아이디어를 키워요. 가능성을 열어두고 여러 방법을 시험할 때 가장 생생해져요.', habit: '평범한 질문에도 새로운 가설이나 뜻밖의 대안을 꺼내요.', recharge: '호기심 많은 사람들과 새로운 주제로 가볍게 토론하기.' },
  ESTJ: { title: '척척별 운영대장', emoji: '📋', tagline: '모두 탑승했지? 그럼 정시에 출발합니다.', tags: ['명확한 기준', '확실한 실행', '든든한 추진력'], description: '목표를 구체적인 순서와 행동으로 옮기는 외계인이에요. 상황을 정리하고 필요한 역할을 빠르게 파악해요. 함께 정한 일을 실제로 완성하도록 이끄는 힘이 있어요.', habit: '여럿이 모이면 해야 할 일과 시간을 자연스럽게 정리해요.', recharge: '미뤄둔 일을 마무리한 뒤 좋아하는 사람들과 편하게 쉬기.' },
  ESFJ: { title: '다정별 모임지기', emoji: '🍀', tagline: '다들 잘 도착했어? 밥은 먹었고?', tags: ['살뜰한 챙김', '함께하는 기쁨', '관계의 연결고리'], description: '사람들이 편안하게 어울릴 수 있도록 분위기를 만드는 외계인이에요. 구체적인 도움과 꾸준한 관심으로 관계를 가꿔요. 당신의 따뜻한 한마디가 모임을 더 단단하게 연결해요.', habit: '모임 전후로 모두의 일정과 안부를 살뜰히 확인해요.', recharge: '익숙하고 편한 사람들과 일상의 기쁜 소식 나누기.' },
  ENFJ: { title: '응원별 연결자', emoji: '🌻', tagline: '너라면 할 수 있어. 네 가능성, 내가 봤거든.', tags: ['성장을 응원', '공감하는 리더', '함께 보는 미래'], description: '사람 안의 가능성을 발견하고 함께 나아갈 방향을 그리는 외계인이에요. 마음을 헤아리며 의미 있는 목표로 연결해요. 진심 어린 응원으로 누군가의 첫걸음을 도와줘요.', habit: '친구의 고민을 듣다가 잘하는 점과 다음 가능성을 짚어줘요.', recharge: '마음이 통하는 사람과 대화하고, 내 마음도 돌아볼 시간 갖기.' },
  ENTJ: { title: '개척별 지휘관', emoji: '🚀', tagline: '좋아, 다음 목적지는 저 별이야. 같이 가자.', tags: ['큰 그림', '결단력', '목표를 향한 추진'], description: '앞으로의 가능성을 보고 목표를 향해 자원을 모으는 외계인이에요. 논리적인 판단과 체계적인 실행을 즐겨요. 막막한 도전도 함께 움직일 수 있는 계획으로 바꾸는 힘이 있어요.', habit: '아이디어를 들으면 목표와 우선순위, 실행 방법을 떠올려요.', recharge: '새로운 도전에서 성취감을 얻고, 일정에 온전한 휴식도 넣기.' }
};

const AXES = ['EI', 'SN', 'TF', 'JP'];
const AXIS_LABELS = [['E 함께 충전', 'I 혼자 충전'], ['S 구체적 정보', 'N 새로운 가능성'], ['T 논리와 기준', 'F 마음과 가치'], ['J 계획과 정리', 'P 유연한 탐색']];

// 동점은 해당 축의 마지막 응답을 사용합니다. 보완 질문 없이 16문항을 유지합니다.
function calculateResult(answers) {
  if (answers.length !== QUESTIONS.length || answers.some((answer, i) => !QUESTIONS[i].options.some(option => option[1] === answer))) {
    throw new Error('모든 질문에 답해주세요.');
  }
  const scores = Object.fromEntries('EISNTFJP'.split('').map(key => [key, 0]));
  answers.forEach(answer => scores[answer]++);
  const ties = [];
  const type = AXES.map(axis => {
    if (scores[axis[0]] === scores[axis[1]]) {
      ties.push(axis);
      return answers.filter(answer => axis.includes(answer)).at(-1);
    }
    return scores[axis[0]] > scores[axis[1]] ? axis[0] : axis[1];
  }).join('');
  return { type, scores, ties };
}

const $ = selector => document.querySelector(selector);
let answers = [];
let currentQuestion = 0;
let currentResult = null;
let toastTimer;

function showScreen(id, heading) {
  document.querySelectorAll('.screen').forEach(screen => { screen.hidden = screen.id !== id; });
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (heading) $(heading).focus({ preventScroll: true });
}

function startQuiz() {
  answers = [];
  currentQuestion = 0;
  currentResult = null;
  clearResultHash();
  $('#share-fallback').hidden = true;
  $('#share-fallback').open = false;
  renderQuestion();
}

function renderQuestion() {
  const question = QUESTIONS[currentQuestion];
  $('#question-count').textContent = `${String(currentQuestion + 1).padStart(2, '0')} / 16`;
  $('#question-emoji').textContent = question.emoji;
  $('#question-category').textContent = question.category;
  $('#question-title').textContent = question.title;
  const completed = answers.filter(Boolean).length;
  $('#progress-fill').style.width = `${completed / 16 * 100}%`;
  $('#progress-bar').setAttribute('aria-valuenow', completed);
  $('#progress-bar').setAttribute('aria-valuetext', `16문항 중 ${completed}문항 응답 완료`);
  $('#progress-text').textContent = `${Math.round(completed / 16 * 100)}% 탐사 완료`;
  $('#back-button').disabled = currentQuestion === 0;
  $('#answers').replaceChildren();
  question.options.forEach(([text, value], i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.classList.toggle('selected', answers[currentQuestion] === value);
    button.setAttribute('aria-pressed', String(answers[currentQuestion] === value));
    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = i === 0 ? 'A' : 'B';
    letter.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = text;
    button.append(letter, label);
    button.addEventListener('click', () => {
      // 포커스를 다음 질문 제목으로 옮겨 연속 클릭으로 답변이 넘어가지 않게 합니다.
      answers[currentQuestion] = value;
      if (currentQuestion < QUESTIONS.length - 1) { currentQuestion++; renderQuestion(); }
      else { renderResult(calculateResult(answers)); }
    });
    $('#answers').append(button);
  });
  showScreen('quiz-screen', '#question-title');
}

function renderResult(result, shared = false) {
  currentResult = result;
  const data = RESULTS[result.type];
  if (!data) return;
  $('#result-emoji').textContent = data.emoji;
  $('#result-type').textContent = result.type;
  $('#result-title').textContent = data.title;
  $('#result-tagline').textContent = `“${data.tagline}”`;
  $('#result-description').textContent = data.description;
  $('#result-habit').textContent = data.habit;
  $('#result-recharge').textContent = data.recharge;
  $('#result-tags').replaceChildren(...data.tags.map(tag => { const span = document.createElement('span'); span.textContent = `#${tag.replaceAll(' ', '')}`; return span; }));
  $('.scores').hidden = !result.scores;
  $('#score-bars').replaceChildren();
  if (result.scores) {
    AXES.forEach((axis, index) => {
      const row = document.createElement('div'); row.className = 'score-row';
      const labels = document.createElement('div'); labels.className = 'score-labels';
      const left = document.createElement('span'); const right = document.createElement('span');
      const percent = result.scores[axis[0]] * 25;
      left.textContent = `${AXIS_LABELS[index][0]} ${percent}%`;
      right.textContent = `${AXIS_LABELS[index][1]} ${100 - percent}%`;
      (result.type.includes(axis[0]) ? left : right).className = 'dominant';
      labels.append(left, right);
      const track = document.createElement('div'); track.className = 'score-track';
      const fill = document.createElement('div'); fill.className = 'score-value'; fill.style.width = `${percent}%`;
      track.append(fill); row.append(labels, track); $('#score-bars').append(row);
    });
    $('#tie-note').textContent = result.ties.length ? `동점인 축(${result.ties.join(', ')})은 해당 축의 마지막 답변을 기준으로 정했어요. 비율은 문항 선택 비율이에요.` : '비율은 각 축의 4개 문항에서 선택한 응답 비율이에요.';
  }
  document.title = `${result.type} ${data.title} · 내 안의 외계인`;
  if (!shared) {
    try { localStorage.setItem('inner-alien-result-v1', JSON.stringify(result)); } catch { /* 저장이 제한되어도 테스트는 작동합니다. */ }
    try { history.replaceState(null, '', `#result=${result.type}`); } catch { /* file://에서도 계속 진행합니다. */ }
  }
  $('.result-intro p').textContent = shared ? '공유받은 외계인을 만나보세요!' : '드디어, 내 안의 외계인을 찾았어요!';
  showScreen('result-screen', '#result-title');
}

function clearResultHash() {
  try { history.replaceState(null, '', location.pathname + location.search); } catch { /* 로컬 파일 접근 제한 무시 */ }
  document.title = '내 안의 외계인 · 지구인 탐구생활';
}

function toast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}

async function shareResult() {
  if (!currentResult) return;
  const data = RESULTS[currentResult.type];
  const title = '내 안의 외계인';
  const text = `${data.emoji} 내 안의 외계인은 ${currentResult.type} · ${data.title}!\n“${data.tagline}”\n당신은 어떤 별에서 왔나요?`;
  const isWeb = /^https?:$/.test(location.protocol);
  const url = isWeb ? `${location.origin}${location.pathname}${location.search}#result=${currentResult.type}` : '';
  const copyText = `${text}${url ? '\n' + url : ''}`;
  if (navigator.share && isWeb) {
    try { await navigator.share({ title, text, url }); return; }
    catch (error) { if (error.name === 'AbortError') return; }
  }
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(copyText); toast(url ? '결과와 링크를 복사했어요. 친구에게 보내보세요!' : '결과를 복사했어요!'); return; }
    catch { /* 클립보드 권한이 없으면 수동 복사로 안내합니다. */ }
  }
  $('#share-text').value = copyText;
  $('#share-fallback').hidden = false;
  $('#share-fallback').open = true;
  $('#share-text').focus();
  $('#share-text').select();
  toast('아래 내용을 선택해서 복사해주세요.');
}

$('#start-button').addEventListener('click', startQuiz);
$('#back-button').addEventListener('click', () => { if (currentQuestion > 0) { currentQuestion--; renderQuestion(); } });
$('#restart-button').addEventListener('click', () => {
  answers = []; currentQuestion = 0; currentResult = null;
  try { localStorage.removeItem('inner-alien-result-v1'); } catch { /* 저장 제한 무시 */ }
  clearResultHash();
  $('#share-fallback').hidden = true;
  $('#start-button').textContent = '내 외계인 찾기 ↗';
  showScreen('start-screen', '#start-title');
});
$('#share-button').addEventListener('click', shareResult);

// 유효한 유형만 공유 링크에서 읽습니다. 답변과 개인 정보는 URL에 넣지 않습니다.
const sharedType = /^#result=([A-Z]{4})$/.exec(location.hash)?.[1];
if (sharedType && Object.hasOwn(RESULTS, sharedType)) {
  let saved;
  try { saved = JSON.parse(localStorage.getItem('inner-alien-result-v1')); } catch { /* 저장 제한 무시 */ }
  if (saved?.type === sharedType && saved.scores && AXES.every(axis => Number.isInteger(saved.scores[axis[0]]) && Number.isInteger(saved.scores[axis[1]]) && saved.scores[axis[0]] >= 0 && saved.scores[axis[1]] >= 0 && saved.scores[axis[0]] + saved.scores[axis[1]] === 4) && Array.isArray(saved.ties)) renderResult(saved);
  else renderResult({ type: sharedType }, true);
}
