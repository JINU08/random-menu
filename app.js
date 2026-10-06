/**
 * 오늘의 메뉴 추천기 (Random Menu Recommender)
 * Vanilla JavaScript Implementation
 */

// 1. 메뉴 데이터베이스 (28종의 다채로운 메뉴)
const MENU_DATA = [
  // 한식 (Korean)
  {
    id: 'k1',
    name: '김치찌개',
    category: 'korean',
    categoryName: '한식',
    icon: '🥘',
    desc: '칼칼하고 깊은 국물에 돼지고기와 두부가 듬뿍! 한국인의 소울푸드',
    tags: ['#얼큰칼칼', '#밥도둑', '#든든한한끼']
  },
  {
    id: 'k2',
    name: '삼겹살 & 쌈채소',
    category: 'korean',
    categoryName: '한식',
    icon: '🥓',
    desc: '노릇노릇 지글지글 고소한 육즙! 파절이와 쌈장에 한 쌈 가득',
    tags: ['#고기러버', '#지글지글', '#저녁추천']
  },
  {
    id: 'k3',
    name: '불향 제육볶음',
    category: 'korean',
    categoryName: '한식',
    icon: '🥩',
    desc: '매콤달콤한 특제 양념과 불맛이 살아있는 직화 밥도둑 끝판왕',
    tags: ['#매콤달콤', '#불맛', '#점심인기']
  },
  {
    id: 'k4',
    name: '우렁 된장찌개 & 쌈밥',
    category: 'korean',
    categoryName: '한식',
    icon: '🥬',
    desc: '구수하고 짭조름한 집된장에 신선한 쌈채소를 곁들인 건강식',
    tags: ['#구수한맛', '#건강밥상', '#속편한식사']
  },
  {
    id: 'k5',
    name: '전주식 오색 비빔밥',
    category: 'korean',
    categoryName: '한식',
    icon: '🥗',
    desc: '알록달록 다채로운 나물과 참기름, 볶음 고추장의 환상 조합',
    tags: ['#영양만점', '#신선담백', '#클래식']
  },
  {
    id: 'k6',
    name: '매콤 닭볶음탕',
    category: 'korean',
    categoryName: '한식',
    icon: '🍗',
    desc: '포슬포슬 감자와 매콤한 국물이 배어든 닭고기, 볶음밥까지 필수!',
    tags: ['#매콤얼큰', '#감자듬뿍', '#푸짐함']
  },
  {
    id: 'k7',
    name: '뼈해장국',
    category: 'korean',
    categoryName: '한식',
    icon: '🍖',
    desc: '진한 사골 국물에 부드러운 살코기와 우거지가 푹 우러난 뚝배기',
    tags: ['#해장끝판왕', '#뚝배기', '#든든국물']
  },

  // 중식 (Chinese)
  {
    id: 'c1',
    name: '간짜장 & 군만두',
    category: 'chinese',
    categoryName: '중식',
    icon: '🍜',
    desc: '양파가 아삭하게 살아있는 진한 춘장 소스와 쫄깃한 면발!',
    tags: ['#국민중식', '#단짠매력', '#짜장면']
  },
  {
    id: 'c2',
    name: '해물 짬뽕',
    category: 'chinese',
    categoryName: '중식',
    icon: '🦐',
    desc: '신선한 오징어와 홍합, 불맛을 입힌 얼큰하고 시원한 국물',
    tags: ['#해물가득', '#불맛국물', '#얼큰']
  },
  {
    id: 'c3',
    name: '찹쌀 탕수육',
    category: 'chinese',
    categoryName: '중식',
    icon: '🥢',
    desc: '겉은 파삭쫄깃, 속은 촉촉한 돼지고기에 새콤달콤한 과일 소스',
    tags: ['#겉바속촉', '#부먹찍먹', '#외식메뉴']
  },
  {
    id: 'c4',
    name: '마라탕',
    category: 'chinese',
    categoryName: '중식',
    icon: '🌶️',
    desc: '내가 고른 신선한 재료들과 중독성 있는 알싸한 마라 육수의 조화',
    tags: ['#얼얼한맛', '#취향맞춤', '#스트레스해소']
  },
  {
    id: 'c5',
    name: '딤섬 & 샤오롱바오',
    category: 'chinese',
    categoryName: '중식',
    icon: '🥟',
    desc: '얇은 피를 톡 터뜨리면 흘러나오는 진하고 뜨거운 육즙의 향연',
    tags: ['#육즙팡팡', '#홍콩감성', '#담백']
  },
  {
    id: 'c6',
    name: '고슬고슬 중화 볶음밥',
    category: 'chinese',
    categoryName: '중식',
    icon: '🍤',
    desc: '센 불에 볶아낸 고슬고슬한 밥알과 고소한 짜장 소스, 짬뽕 국물 콤보',
    tags: ['#불맛볶음밥', '#가성비', '#점심']
  },

  // 일식 (Japanese)
  {
    id: 'j1',
    name: '모둠 초밥 (스시)',
    category: 'japanese',
    categoryName: '일식',
    icon: '🍣',
    desc: '광어, 연어, 참치, 새우 등 신선한 해산물이 밥알 위에 살포시',
    tags: ['#신선깔끔', '#고급진한끼', '#스시러버']
  },
  {
    id: 'j2',
    name: '두툼한 히레카츠 (돈카츠)',
    category: 'japanese',
    categoryName: '일식',
    icon: '🍱',
    desc: '황금빛 빵가루의 바삭함과 선홍빛 부드러운 안심의 육즙 폭발!',
    tags: ['#바삭바삭', '#육즙가득', '#돈까스']
  },
  {
    id: 'j3',
    name: '진한 돈코츠 라멘',
    category: 'japanese',
    categoryName: '일식',
    icon: '🍥',
    desc: '돼지 뼈를 진하게 고아낸 깊은 육수에 차슈와 반숙 달걀의 완벽 조화',
    tags: ['#진한국물', '#차슈추가', '#면요리']
  },
  {
    id: 'j4',
    name: '생연어 덮밥 (사케동)',
    category: 'japanese',
    categoryName: '일식',
    icon: '🐟',
    desc: '두툼하고 부드러운 생연어에 특제 간장 소스와 생와사비 한 점',
    tags: ['#생연어', '#부드러움', '#덮밥']
  },
  {
    id: 'j5',
    name: '시원한 냉모밀 & 텐푸라',
    category: 'japanese',
    categoryName: '일식',
    icon: '🍤',
    desc: '살얼음 띄운 쯔유 육수에 적셔먹는 쫄깃한 메밀면과 바삭한 튀김',
    tags: ['#시원깔끔', '#바삭튀김', '#별미']
  },
  {
    id: 'j6',
    name: '규동 (소고기 덮밥)',
    category: 'japanese',
    categoryName: '일식',
    icon: '🍚',
    desc: '특제 쯔유에 졸인 부드러운 우삼겹과 온천 달걀을 톡 터뜨려 비벼먹는 맛',
    tags: ['#단짠고소', '#온천달걀', '#간편든든']
  },

  // 양식 (Western)
  {
    id: 'w1',
    name: '매콤 투움바 파스타',
    category: 'western',
    categoryName: '양식',
    icon: '🍝',
    desc: '꾸덕하고 고소한 크림에 매콤함이 가미된 새우 베이컨 파스타',
    tags: ['#꾸덕크림', '#매콤고소', '#면파스타']
  },
  {
    id: 'w2',
    name: '화덕 마르게리타 피자',
    category: 'western',
    categoryName: '양식',
    icon: '🍕',
    desc: '참나무 화덕에서 갓 구워낸 쫄깃한 도우와 모차렐라 치즈, 생바질',
    tags: ['#화덕피자', '#치즈쭉쭉', '#이탈리안']
  },
  {
    id: 'w3',
    name: '두툼한 수제버거 & 감튀',
    category: 'western',
    categoryName: '양식',
    icon: '🍔',
    desc: '육즙 가득한 소고기 패티와 멜팅 치즈, 바삭한 프렌치프라이',
    tags: ['#육즙가득', '#치팅데이', '#아메리칸']
  },
  {
    id: 'w4',
    name: '부채살 스테이크',
    category: 'western',
    categoryName: '양식',
    icon: '🥩',
    desc: '겉면을 바삭하게 시어링하여 풍미와 육즙을 가둔 기분 좋은 날의 선택',
    tags: ['#특별한날', '#미디엄레어', '#육류']
  },
  {
    id: 'w5',
    name: '트러플 버섯 크림 리소토',
    category: 'western',
    categoryName: '양식',
    icon: '🍄',
    desc: '입안 가득 퍼지는 그윽한 트러플 오일의 향과 크리미한 쌀알의 풍미',
    tags: ['#트러플향', '#크리미', '#고급풍미']
  },

  // 분식 및 기타 (Snack & Others)
  {
    id: 's1',
    name: '매콤 국물 떡볶이 & 모둠튀김',
    category: 'snack',
    categoryName: '분식',
    icon: '🍢',
    desc: '매콤달콤 쫄깃한 쌀떡과 어묵, 바삭한 튀김을 국물에 푹 찍어 한 입!',
    tags: ['#국민간식', '#매콤달콤', '#순대추가']
  },
  {
    id: 's2',
    name: '참치김밥 & 치즈라면',
    category: 'snack',
    categoryName: '분식',
    icon: '🍜',
    desc: '언제 먹어도 실패 없는 무적의 분식 조합! 고소함과 얼큰함의 조화',
    tags: ['#영혼의단짝', '#분식세트', '#빠른식사']
  },
  {
    id: 's3',
    name: '양지 쌀국수',
    category: 'snack',
    categoryName: '아시안',
    icon: '🍲',
    desc: '오랜 시간 푹 고아낸 맑고 담백한 소고기 육수에 아삭한 숙주와 향긋한 라임',
    tags: ['#뜨끈한국물', '#베트남감성', '#가벼운한끼']
  },
  {
    id: 's4',
    name: '멕시칸 타코 & 나초',
    category: 'snack',
    categoryName: '기타',
    icon: '🌮',
    desc: '신선한 토마토 살사와 과카몰리, 시즈닝된 고기를 또띠아에 듬뿍!',
    tags: ['#이국적풍미', '#살사소스', '#파티무드']
  }
];

// 2. 사운드 시스템 (Web Audio API - 외부 음원 없이 자체 생성)
class SoundFx {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 롤링 틱 사운드 (짤깍 소리)
  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio error fallback
    }
  }

  // 메뉴 최종 확정 팡파르음 (행복한 화음)
  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      } catch (e) {}
    });
  }
}

// 3. 자체 캔버스 파티클 (Confetti 폭죽 효과)
class ConfettiManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x = window.innerWidth / 2, y = window.innerHeight * 0.45) {
    const colors = ['#ff5722', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#e91e63', '#9c27b0'];
    const count = 75;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

// 4. 메인 앱 컨트롤러
class App {
  constructor() {
    this.currentCategory = 'all';
    this.isRolling = false;
    this.history = [];
    this.lastSelectedMenu = null;

    // DOM Elements
    this.recommendBtn = document.getElementById('recommendBtn');
    this.catPills = document.querySelectorAll('.cat-pill');
    this.menuDisplay = document.getElementById('menuDisplay');
    this.menuIcon = document.getElementById('menuIcon');
    this.catBadge = document.getElementById('catBadge');
    this.menuName = document.getElementById('menuName');
    this.menuDesc = document.getElementById('menuDesc');
    this.menuTags = document.getElementById('menuTags');
    this.actionLinks = document.getElementById('actionLinks');
    this.naverMapLink = document.getElementById('naverMapLink');
    this.kakaoMapLink = document.getElementById('kakaoMapLink');
    this.copyMenuBtn = document.getElementById('copyMenuBtn');
    this.historyList = document.getElementById('historyList');
    this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundIcon = document.getElementById('soundIcon');
    this.toast = document.getElementById('toast');

    // Instantiate Services
    this.sound = new SoundFx();
    this.confetti = new ConfettiManager(document.getElementById('confettiCanvas'));

    this.bindEvents();
    this.loadHistory();
  }

  bindEvents() {
    // 버튼 클릭 이벤트
    this.recommendBtn.addEventListener('click', () => this.handleRecommend());

    // 스페이스바 / 엔터 키보드 단축키
    window.addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && e.target === document.body) {
        e.preventDefault();
        this.handleRecommend();
      }
    });

    // 카테고리 탭 클릭
    this.catPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        if (this.isRolling) return;
        this.catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.dataset.category;
        this.showToast(`'${pill.textContent.trim()}' 카테고리가 선택되었습니다.`);
      });
    });

    // 사운드 토글
    this.soundToggleBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      this.soundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
      this.showToast(this.sound.enabled ? '효과음이 켜졌습니다.' : '효과음이 꺼졌습니다.');
    });

    // 복사 버튼
    this.copyMenuBtn.addEventListener('click', () => this.handleCopyMenu());

    // 히스토리 초기화
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
  }

  getFilteredMenus() {
    if (this.currentCategory === 'all') {
      return MENU_DATA;
    }
    return MENU_DATA.filter(m => m.category === this.currentCategory);
  }

  handleRecommend() {
    if (this.isRolling) return;

    const availableMenus = this.getFilteredMenus();
    if (availableMenus.length === 0) {
      this.showToast('해당 카테고리에 추천할 메뉴가 없습니다.');
      return;
    }

    this.isRolling = true;
    this.recommendBtn.disabled = true;
    this.menuDisplay.classList.remove('popped', 'initial-state');
    this.menuDisplay.classList.add('rolling');
    this.actionLinks.classList.remove('visible');

    // 롤링 애니메이션 (랜덤하게 빠르게 순환)
    let rollCount = 0;
    const maxRolls = 18;
    const rollSpeed = 65; // ms per tick

    const interval = setInterval(() => {
      rollCount++;
      const randomTemp = availableMenus[Math.floor(Math.random() * availableMenus.length)];
      
      this.menuIcon.textContent = randomTemp.icon;
      this.menuName.textContent = randomTemp.name;
      this.catBadge.textContent = randomTemp.categoryName;
      this.sound.playTick();

      if (rollCount >= maxRolls) {
        clearInterval(interval);
        this.finishRecommend(availableMenus);
      }
    }, rollSpeed);
  }

  finishRecommend(availableMenus) {
    // 직전 추천 메뉴와 바로 겹치지 않도록 후보 선정
    let finalMenu;
    if (availableMenus.length > 1 && this.lastSelectedMenu) {
      const candidates = availableMenus.filter(m => m.id !== this.lastSelectedMenu.id);
      finalMenu = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      finalMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
    }

    this.lastSelectedMenu = finalMenu;
    this.renderMenu(finalMenu);

    this.menuDisplay.classList.remove('rolling');
    this.menuDisplay.classList.add('popped');
    this.actionLinks.classList.add('visible');

    // 사운드 & 파티클 축하
    this.sound.playFanfare();
    const rect = this.menuDisplay.getBoundingClientRect();
    this.confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 히스토리 추가
    this.addToHistory(finalMenu);

    // 버튼 복구
    setTimeout(() => {
      this.isRolling = false;
      this.recommendBtn.disabled = false;
    }, 400);
  }

  renderMenu(menu) {
    this.menuIcon.textContent = menu.icon;
    this.menuName.textContent = menu.name;
    this.menuDesc.textContent = menu.desc;

    // 카테고리 뱃지 업데이트
    this.catBadge.textContent = `${menu.categoryName}`;
    this.catBadge.className = `cat-badge cat-${menu.category}`;

    // 태그 렌더링
    this.menuTags.innerHTML = '';
    menu.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      this.menuTags.appendChild(span);
    });

    // 지도 검색 링크 바인딩
    const encoded = encodeURIComponent(menu.name);
    this.naverMapLink.href = `https://map.naver.com/p/search/${encoded}`;
    this.kakaoMapLink.href = `https://map.kakao.com/?q=${encoded}`;
  }

  handleCopyMenu() {
    if (!this.lastSelectedMenu) return;
    const text = `오늘 메뉴는 '${this.lastSelectedMenu.name} ${this.lastSelectedMenu.icon}' 어때요? (${this.lastSelectedMenu.desc})`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('메뉴 추천 문구가 복사되었습니다! 📋');
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  }

  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showToast('메뉴 추천 문구가 복사되었습니다! 📋');
  }

  addToHistory(menu) {
    // 중복 제거 후 맨 앞에 추가 (최대 8개 보관)
    this.history = this.history.filter(m => m.id !== menu.id);
    this.history.unshift(menu);
    if (this.history.length > 8) {
      this.history.pop();
    }
    this.saveHistory();
    this.renderHistory();
  }

  renderHistory() {
    if (this.history.length === 0) {
      this.historyList.innerHTML = '<span class="history-empty">아직 추천받은 메뉴가 없습니다.</span>';
      return;
    }

    this.historyList.innerHTML = '';
    this.history.forEach(menu => {
      const chip = document.createElement('button');
      chip.className = 'history-chip';
      chip.innerHTML = `<span>${menu.icon}</span> <span>${menu.name}</span>`;
      chip.title = `'${menu.name}' 자세히 보기`;
      chip.addEventListener('click', () => {
        if (this.isRolling) return;
        this.lastSelectedMenu = menu;
        this.renderMenu(menu);
        this.menuDisplay.classList.remove('initial-state');
        this.menuDisplay.classList.add('popped');
        this.actionLinks.classList.add('visible');
      });
      this.historyList.appendChild(chip);
    });
  }

  saveHistory() {
    try {
      localStorage.setItem('random_menu_history', JSON.stringify(this.history));
    } catch (e) {}
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('random_menu_history');
      if (saved) {
        this.history = JSON.parse(saved);
        this.renderHistory();
      }
    } catch (e) {}
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.renderHistory();
    this.showToast('추천 기록이 초기화되었습니다.');
  }

  showToast(msg) {
    this.toast.textContent = msg;
    this.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2400);
  }
}

// DOM 콘텐츠 로드 완료 시 앱 실행
document.addEventListener('DOMContentLoaded', () => {
  window.menuApp = new App();
});
