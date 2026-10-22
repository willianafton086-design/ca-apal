const STORAGE_KEY = 'cacapal-stats';
const DAILY_KEY = 'cacapal-daily-state';

const THEMES = [
  {
    name: 'Memes',
    words: ['PIXEL', 'TROLL', 'GAMER', 'MELA', 'JOKER', 'MIXER', 'BUZZE', 'MELTY', 'VIBRA', 'LOLKA']
  },
  {
    name: 'Tecnologia',
    words: ['BYTE', 'CLOUD', 'ROBOT', 'GAMER', 'MOUSE', 'SMART', 'ALGOR', 'CAMPO', 'PILHA', 'NEXUS']
  },
  {
    name: 'Natureza',
    words: ['ARVOR', 'PRAIA', 'RIO', 'NUVEM', 'MATA', 'SOLAR', 'FLORA', 'MONTA', 'FLORE', 'LAGOA']
  },
  {
    name: 'Esportes',
    words: ['PENAL', 'BOLA', 'VELAS', 'MOTO', 'TENIS', 'PIVOT', 'RAPID', 'MARCA', 'SKATE', 'FUTEB']
  },
  {
    name: 'Objetos',
    words: ['MOCHI', 'CADER', 'LAPIS', 'CANETA', 'TECLA', 'BOLSA', 'LAMPA', 'MESA', 'CINZE', 'RADIO']
  }
];

const allWords = [...new Set(THEMES.flatMap((theme) => theme.words))];

const stats = loadStats();
const state = {
  currentGuess: '',
  guesses: [],
  result: null,
  theme: null,
  answer: '',
  isComplete: false,
  currentRow: 0
};

const boardEl = document.getElementById('board');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const statusEl = document.getElementById('status');
const themeTitle = document.getElementById('theme-title');
const letterCount = document.getElementById('letter-count');
const triesLeft = document.getElementById('tries-left');
const shareBtn = document.getElementById('share-btn');
const restartBtn = document.getElementById('restart-btn');
const resultModal = document.getElementById('result-modal');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const closeResult = document.getElementById('close-result');
const todayKey = getTodayKey();

initializeGame();

function initializeGame() {
  const daily = getDailyRound();
  const saved = loadDailyState();

  state.theme = daily.theme;
  state.answer = daily.answer;
  state.currentGuess = '';
  state.guesses = [];
  state.currentRow = 0;
  state.isComplete = false;
  state.result = null;

  if (saved && saved.date === todayKey) {
    state.guesses = saved.guesses || [];
    state.currentRow = saved.guesses?.length || 0;
    state.isComplete = Boolean(saved.isComplete);
    state.result = saved.result || null;
  }

  themeTitle.textContent = state.theme.name;
  letterCount.textContent = `${state.answer.length} letras`;
  triesLeft.textContent = `${6 - state.currentRow} tentativas`;

  renderBoard();
  renderStats();
  if (state.isComplete) {
    showResult(state.result || 'Partida concluída!');
  }
}

function getTodayKey() {
  const date = new Date();
  const tz = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tz).toISOString().slice(0, 10);
}

function getDailyRound() {
  const dayIndex = Math.floor(Date.now() / 86400000);
  const themeIndex = dayIndex % THEMES.length;
  const theme = THEMES[themeIndex];
  const wordIndex = (dayIndex + theme.name.length) % theme.words.length;
  return {
    theme,
    answer: theme.words[wordIndex].toUpperCase()
  };
}

function renderBoard() {
  const rows = [];
  for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
    const currentGuess = rowIndex === state.currentRow && state.guesses.length === rowIndex ? state.currentGuess : null;
    const submittedGuess = state.guesses[rowIndex] || '';

    const cells = Array.from({ length: 5 }, (_, cellIndex) => {
      let letter = '';
      let status = '';

      if (submittedGuess) {
        letter = submittedGuess[cellIndex] || '';
        status = getCellStatus(submittedGuess, cellIndex, state.answer);
      } else if (currentGuess && cellIndex < currentGuess.length) {
        letter = currentGuess[cellIndex];
        status = 'filled';
      }

      return `<div class="cell ${letter ? 'filled' : ''} ${status}" data-row="${rowIndex}" data-col="${cellIndex}">${letter || ''}</div>`;
    }).join('');

    rows.push(`<div class="row">${cells}</div>`);
  }

  boardEl.innerHTML = rows.join('');
  triesLeft.textContent = `${Math.max(0, 6 - state.currentRow)} tentativas`;
}

function getCellStatus(guess, cellIndex, answer) {
  if (!guess) return '';

  const evaluation = evaluateGuess(guess, answer);
  return evaluation[cellIndex] || 'absent';
}

function evaluateGuess(guess, answer) {
  const result = Array(guess.length).fill('absent');
  const remainingLetters = {};

  for (let index = 0; index < guess.length; index += 1) {
    const guessedLetter = guess[index];
    const answerLetter = answer[index];

    if (guessedLetter === answerLetter) {
      result[index] = 'correct';
    } else {
      remainingLetters[answer[index]] = (remainingLetters[answer[index]] || 0) + 1;
    }
  }

  for (let index = 0; index < guess.length; index += 1) {
    if (result[index] === 'correct') continue;

    const guessedLetter = guess[index];
    if ((remainingLetters[guessedLetter] || 0) > 0) {
      result[index] = 'present';
      remainingLetters[guessedLetter] -= 1;
    }
  }

  return result;
}

function handleGuess(event) {
  event.preventDefault();

  if (state.isComplete) {
    statusEl.textContent = 'A partida de hoje já terminou.';
    statusEl.className = 'status';
    return;
  }

  const value = guessInput.value.trim().toUpperCase();
  if (!value) {
    statusEl.textContent = 'Digite uma palavra antes de enviar.';
    statusEl.className = 'status error';
    return;
  }

  if (value.length !== 5) {
    statusEl.textContent = 'A palavra deve ter 5 letras.';
    statusEl.className = 'status error';
    return;
  }

  if (!allWords.includes(value)) {
    statusEl.textContent = 'Essa palavra não está na lista permitida.';
    statusEl.className = 'status error';
    return;
  }

  if (state.guesses.includes(value)) {
    statusEl.textContent = 'Você já tentou essa palavra.';
    statusEl.className = 'status error';
    return;
  }

  state.guesses.push(value);
  state.currentRow = state.guesses.length;
  state.currentGuess = '';
  processGuess(value);
  guessInput.value = '';
  renderBoard();
}

function processGuess(guess) {
  const isWin = guess === state.answer;
  const isLastChance = state.guesses.length >= 6;

  if (isWin || isLastChance) {
    state.isComplete = true;
    state.result = isWin ? 'win' : 'loss';

    const message = isWin
      ? `Você acertou a palavra ${state.answer}!`
      : `A palavra era ${state.answer}. Tente de novo amanhã.`;

    statusEl.textContent = isWin ? 'Parabéns! Você venceu!' : 'Não foi dessa vez.';
    statusEl.className = isWin ? 'status success' : 'status error';
    recordResult(isWin);
    saveDailyState();
    showResult(message);
    return;
  }

  statusEl.textContent = 'Feedback atualizado. Tente outra palavra.';
  statusEl.className = 'status success';
  saveDailyState();
}

function saveDailyState() {
  const payload = {
    date: todayKey,
    guesses: state.guesses,
    isComplete: state.isComplete,
    result: state.result,
    answer: state.answer,
    theme: state.theme.name
  };

  localStorage.setItem(DAILY_KEY, JSON.stringify(payload));
}

function loadDailyState() {
  try {
    return JSON.parse(localStorage.getItem(DAILY_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function recordResult(isWin) {
  const today = getTodayKey();
  const current = loadStats();

  current.games += 1;
  if (isWin) {
    current.wins += 1;
    current.lastWord = state.answer;
  }

  if (current.lastPlayedDate !== today) {
    const previous = new Date(current.lastPlayedDate || today);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - previous) / 86400000);

    if (diffDays === 1) {
      current.currentStreak += 1;
    } else if (diffDays > 1 || current.lastPlayedDate === null) {
      current.currentStreak = 1;
    }
    current.lastPlayedDate = today;
  }

  current.bestStreak = Math.max(current.bestStreak, current.currentStreak);
  current.accuracy = current.games ? Math.round((current.wins / current.games) * 100) : 0;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  renderStats();
}

function renderStats() {
  const current = loadStats();
  const statNodes = [
    document.getElementById('current-streak'),
    document.getElementById('best-streak'),
    document.getElementById('wins'),
    document.getElementById('games')
  ];

  const lastWordNode = document.getElementById('last-word');
  const accuracyNode = document.getElementById('accuracy');

  if (statNodes[0]) statNodes[0].textContent = current.currentStreak;
  if (statNodes[1]) statNodes[1].textContent = current.bestStreak;
  if (statNodes[2]) statNodes[2].textContent = current.wins;
  if (statNodes[3]) statNodes[3].textContent = current.games;

  if (lastWordNode) lastWordNode.textContent = current.lastWord || '—';
  if (accuracyNode) accuracyNode.textContent = `${current.accuracy}% de acerto`;
}

function loadStats() {
  const fallback = {
    currentStreak: 0,
    bestStreak: 0,
    wins: 0,
    games: 0,
    lastWord: '',
    lastPlayedDate: '',
    accuracy: 0
  };

  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')) };
  } catch (error) {
    return fallback;
  }
}

function showResult(message) {
  resultTitle.textContent = state.result === 'win' ? 'Você venceu!' : 'Hoje foi mais um desafio';
  resultText.textContent = message;
  resultModal.classList.remove('hidden');
  resultModal.setAttribute('aria-hidden', 'false');
}

function hideResult() {
  resultModal.classList.add('hidden');
  resultModal.setAttribute('aria-hidden', 'true');
}

shareBtn.addEventListener('click', async () => {
  const shareText = `Caça-Pal: consegui ${state.guesses.length} tentativa(s) hoje no tema ${state.theme.name}.`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Caça-Pal',
        text: shareText
      });
      statusEl.textContent = 'Resultado compartilhado.';
      statusEl.className = 'status success';
      return;
    }

    await navigator.clipboard.writeText(shareText);
    statusEl.textContent = 'Resultado copiado para a área de transferência.';
    statusEl.className = 'status success';
  } catch (error) {
    statusEl.textContent = 'Não foi possível compartilhar agora.';
    statusEl.className = 'status error';
  }
});

restartBtn.addEventListener('click', () => {
  localStorage.removeItem(DAILY_KEY);
  initializeGame();
  hideResult();
  statusEl.textContent = 'Nova rodada iniciada.';
  statusEl.className = 'status';
});

closeResult.addEventListener('click', () => {
  hideResult();
});

guessForm.addEventListener('submit', handleGuess);

guessInput.addEventListener('input', (event) => {
  const value = event.target.value.replace(/[^A-ZÀ-Ú]/gi, '').slice(0, 5).toUpperCase();
  event.target.value = value;
  state.currentGuess = value;
  renderBoard();
});
