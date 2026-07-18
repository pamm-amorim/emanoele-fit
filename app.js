import { WORKOUTS, WARMUP } from "./workouts.js";

const STORAGE_KEY = "emanoele-fit-v1";
const SETTINGS_KEY = "emanoele-fit-settings-v1";
const ACTIVE_KEY = "emanoele-fit-active-v1";

const state = {
  route: "home",
  backend: "loading",
  backendMessage: "Iniciando…",
  supabase: null,
  userId: null,
  history: [],
  active: null,
  exerciseIndex: 0,
  warmupSeconds: WARMUP.duration,
  warmupRunning: false,
  warmupTimer: null,
  sessionTimer: null,
  settings: loadSettings()
};

const view = document.querySelector("#view");
const modalRoot = document.querySelector("#modalRoot");
const toast = document.querySelector("#toast");
const connectionButton = document.querySelector("#connectionButton");
const connectionLabel = document.querySelector("#connectionLabel");

init();

async function init() {
  bindGlobalEvents();
  await initDataLayer();
  state.active = loadJson(ACTIVE_KEY, null);
  if (state.active) {
    state.exerciseIndex = Math.max(0, Number(state.active.exerciseIndex || 0));
  }
  await refreshHistory();
  render();
  registerServiceWorker();
}

function bindGlobalEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
  connectionButton.addEventListener("click", () => navigate("settings"));
  window.addEventListener("online", updateConnectionAfterNetworkChange);
  window.addEventListener("offline", updateConnectionAfterNetworkChange);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.active) render();
  });
}

async function initDataLayer() {
  const config = window.APP_CONFIG || {};
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    setBackend("local", "Modo local");
    return;
  }

  try {
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    state.supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });

    let { data: sessionData } = await state.supabase.auth.getSession();
    if (!sessionData.session) {
      const { data, error } = await state.supabase.auth.signInAnonymously();
      if (error) throw error;
      sessionData = { session: data.session };
    }

    state.userId = sessionData.session?.user?.id || null;
    if (!state.userId) throw new Error("Não foi possível criar a sessão anônima.");
    setBackend("online", "Supabase");
  } catch (error) {
    console.error(error);
    setBackend("error", "Falha no banco");
    showToast("Supabase indisponível. Os dados serão mantidos localmente.");
  }
}

async function updateConnectionAfterNetworkChange() {
  if (!navigator.onLine) {
    setBackend("local", "Sem internet");
    return;
  }
  if (state.supabase && state.userId) {
    setBackend("online", "Supabase");
    await refreshHistory();
    render();
  } else {
    setBackend("local", "Modo local");
  }
}

function setBackend(type, label) {
  state.backend = type;
  state.backendMessage = label;
  connectionButton.classList.remove("is-online", "is-local", "is-error");
  connectionButton.classList.add(type === "online" ? "is-online" : type === "error" ? "is-error" : "is-local");
  connectionLabel.textContent = label;
}

function navigate(route) {
  state.route = route;
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === route);
  });
  render();
  requestAnimationFrame(() => view.focus({ preventScroll: false }));
}

function render() {
  clearSessionTimer();
  if (state.route === "home") renderHome();
  if (state.route === "plans") renderPlans();
  if (state.route === "history") renderHistory();
  if (state.route === "settings") renderSettings();
  if (state.route === "active") renderActiveWorkout();
}

function renderHome() {
  const nextCode = getNextWorkoutCode();
  const workout = WORKOUTS[nextCode];
  const weekCount = getThisWeekHistory().length;
  const last = state.history[0];
  const todayCompleted = state.history.some((item) => sameLocalDay(new Date(item.completed_at), new Date()));

  view.innerHTML = `
    ${todayCompleted ? `<div class="notice success">Treino de hoje registrado. O próximo da sequência será o <strong>Treino ${nextCode}</strong>.</div>` : ""}
    <section class="card hero-card ${workout.accent}">
      <div class="hero-topline">
        <span class="badge light">PRÓXIMO TREINO</span>
        <span class="badge light">≈ ${workout.estimatedMinutes} min</span>
      </div>
      <h2>Treino ${workout.code}</h2>
      <p>${escapeHtml(workout.title)} · <span class="muted-on-color">${escapeHtml(workout.subtitle)}</span></p>
      <div class="button-row">
        <button id="startRecommended" class="btn btn-light" type="button">${state.active ? "Retomar treino" : "Começar agora"}</button>
        <button id="viewRecommended" class="btn btn-ghost" type="button">Ver exercícios</button>
      </div>
    </section>

    <div class="stats-grid">
      <div class="stat"><strong>${weekCount}</strong><span>esta semana</span></div>
      <div class="stat"><strong>${state.history.length}</strong><span>concluídos</span></div>
      <div class="stat"><strong>${last ? formatShortDate(last.completed_at) : "—"}</strong><span>último treino</span></div>
    </div>

    <div class="section-header">
      <div><h2>Como funciona</h2><p>Alterne A e B em cada dia de treino.</p></div>
    </div>
    <section class="card">
      <p style="margin-top:0;line-height:1.55">Treinando 3 vezes, a sequência pode ser <strong>A–B–A</strong> e, na semana seguinte, <strong>B–A–B</strong>. Com 4 vezes, fica <strong>A–B–A–B</strong>. Os treinos usam grupos musculares distintos para facilitar a recuperação quando feitos em dias seguidos.</p>
      <div class="plan-meta">
        <span class="badge">2 séries por exercício</span>
        <span class="badge">3 blocos</span>
        <span class="badge posture">Foco em postura</span>
      </div>
    </section>

    <div class="section-header"><div><h2>Plano rápido</h2><p>Sete exercícios por sessão.</p></div></div>
    ${planPreview(workout)}
  `;

  document.querySelector("#startRecommended").addEventListener("click", () => {
    if (state.active) {
      navigate("active");
    } else {
      startWorkout(nextCode);
    }
  });
  document.querySelector("#viewRecommended").addEventListener("click", () => navigate("plans"));
}

function renderPlans() {
  view.innerHTML = `
    <div class="section-header"><div><h2>Treinos A e B</h2><p>Grupos musculares distintos e complementares.</p></div></div>
    <div class="plans-grid">
      ${Object.values(WORKOUTS).map((workout) => planPreview(workout, true)).join("")}
    </div>
    <div class="notice" style="margin-top:14px">Para emagrecimento, a musculação ajuda a preservar e construir massa magra, mas o resultado também depende da alimentação, do sono e do gasto energético total.</div>
  `;
  document.querySelectorAll("[data-start-workout]").forEach((button) => {
    button.addEventListener("click", () => startWorkout(button.dataset.startWorkout));
  });
}

function planPreview(workout, withButton = false) {
  return `
    <section class="card plan-card">
      <span class="badge ${workout.code === "B" ? "" : "band"}">TREINO ${workout.code}</span>
      <h3>${escapeHtml(workout.title)}</h3>
      <p>${escapeHtml(workout.subtitle)}</p>
      <div class="plan-meta">
        <span class="badge">${workout.exercises.length} exercícios</span>
        <span class="badge">${workout.estimatedMinutes} min</span>
      </div>
      <ul class="exercise-preview">
        ${workout.exercises.map((exercise, index) => `<li><span class="number-dot">${index + 1}</span><span>${escapeHtml(exercise.name)}</span></li>`).join("")}
      </ul>
      ${withButton ? `<button class="btn btn-primary btn-block" data-start-workout="${workout.code}" type="button" style="margin-top:14px">Iniciar treino ${workout.code}</button>` : ""}
    </section>
  `;
}

async function startWorkout(code) {
  if (state.active) {
    const confirmed = confirm("Existe um treino em andamento. Deseja descartá-lo e iniciar outro?");
    if (!confirmed) return;
  }
  const workout = WORKOUTS[code];
  const now = new Date().toISOString();
  const sessionId = crypto.randomUUID();
  const sets = {};
  workout.exercises.forEach((exercise) => {
    sets[exercise.id] = Array.from({ length: exercise.sets }, (_, index) => ({
      setNumber: index + 1,
      reps: exercise.defaultReps,
      completed: false,
      logId: null
    }));
  });

  state.active = {
    id: sessionId,
    remoteId: null,
    workoutCode: code,
    startedAt: now,
    completedAt: null,
    warmupDone: false,
    exerciseIndex: 0,
    sets
  };
  state.exerciseIndex = 0;
  state.warmupSeconds = WARMUP.duration;
  saveJson(ACTIVE_KEY, state.active);

  if (state.backend === "online") {
    try {
      const { data, error } = await state.supabase.from("workout_sessions").insert({
        client_id: sessionId,
        user_id: state.userId,
        workout_code: code,
        started_at: now,
        status: "in_progress"
      }).select("id").single();
      if (error) throw error;
      state.active.remoteId = data.id;
      saveJson(ACTIVE_KEY, state.active);
    } catch (error) {
      console.error(error);
      showToast("Treino iniciado localmente; a sincronização falhou.");
    }
  }

  navigate("active");
}

function renderActiveWorkout() {
  if (!state.active) {
    view.innerHTML = `<div class="empty-state card"><div class="emoji">🏁</div><h2>Nenhum treino em andamento</h2><p>Escolha o treino recomendado na tela Hoje.</p><button id="backHome" class="btn btn-primary" type="button">Ir para Hoje</button></div>`;
    document.querySelector("#backHome").addEventListener("click", () => navigate("home"));
    return;
  }

  if (!state.active.warmupDone) {
    renderWarmup();
    return;
  }

  const workout = WORKOUTS[state.active.workoutCode];
  const exercise = workout.exercises[state.exerciseIndex];
  const completedSets = countCompletedSets();
  const totalSets = workout.exercises.reduce((sum, item) => sum + item.sets, 0);
  const progress = Math.round((completedSets / totalSets) * 100);
  const currentSets = state.active.sets[exercise.id];

  view.innerHTML = `
    <div class="workout-header">
      <div class="workout-header-row">
        <div><span class="block-label">TREINO ${workout.code} · BLOCO ${exercise.block}</span><h2>${state.exerciseIndex + 1}/${workout.exercises.length}</h2></div>
        <div id="sessionTimer" class="timer-display">${formatDuration(secondsSince(state.active.startedAt))}</div>
      </div>
      <div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div>
      <div class="progress-label"><span>${completedSets} de ${totalSets} séries</span><span>${progress}%</span></div>
    </div>

    <section class="card exercise-card">
      <div class="exercise-card-head">
        <span class="block-label">BLOCO ${exercise.block}</span>
        <h2>${escapeHtml(exercise.name)}</h2>
        <p>${escapeHtml(exercise.muscles)}</p>
        <div class="exercise-badges">
          <span class="badge band">${escapeHtml(exercise.equipment)}</span>
          ${exercise.posture ? `<span class="badge posture">Postura</span>` : ""}
          <span class="badge">${exercise.sets} × ${escapeHtml(exercise.target)}</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="detail-box">
          <h3>Passo a passo</h3>
          <ol class="step-list">${exercise.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        </div>
        <div class="detail-box"><h3>Ponto-chave</h3><p>${escapeHtml(exercise.cues)}</p></div>
        <div class="detail-box"><h3>Evite</h3><p>${escapeHtml(exercise.mistakes)}</p></div>

        <div class="video-shell" id="videoShell">
          <div class="video-placeholder">
            <div><div style="font-size:34px">▶</div><strong>Vídeo de execução</strong><p style="color:rgba(255,255,255,.72);font-size:12px">${exercise.videoUrl ? "A demonstração será aberta em uma nova página." : "Carregado somente quando solicitado."}</p><button id="loadVideo" class="btn btn-light btn-small" type="button">${exercise.videoUrl ? "Abrir demonstração" : "Assistir aqui"}</button></div>
          </div>
        </div>

        <div class="sets">
          ${currentSets.map((set) => setRowTemplate(exercise, set)).join("")}
        </div>

        <div class="exercise-navigation">
          <button id="previousExercise" class="btn btn-ghost" type="button" ${state.exerciseIndex === 0 ? "disabled" : ""}>Anterior</button>
          <button id="nextExercise" class="btn btn-primary" type="button">${state.exerciseIndex === workout.exercises.length - 1 ? "Revisar" : "Próximo"}</button>
        </div>
        <button id="finishWorkout" class="btn btn-block ${completedSets === totalSets ? "btn-primary" : "btn-ghost"}" type="button" style="margin-top:10px">Concluir treino do dia</button>
        <button id="cancelWorkout" class="btn btn-danger btn-block btn-small" type="button" style="margin-top:10px">Descartar treino</button>
      </div>
    </section>
  `;

  bindExerciseEvents(exercise);
  startSessionTimer();
}

function setRowTemplate(exercise, set) {
  return `
    <div class="set-row ${set.completed ? "is-done" : ""}" data-set-row="${set.setNumber}">
      <div class="set-number">${set.setNumber}</div>
      <div>
        <div class="rep-control">
          <button data-rep-action="minus" data-set-number="${set.setNumber}" type="button" aria-label="Diminuir repetições">−</button>
          <div><div class="rep-value" data-rep-value="${set.setNumber}">${set.reps}</div><div class="rep-caption">${exercise.perSide ? "por lado" : "repetições"}</div></div>
          <button data-rep-action="plus" data-set-number="${set.setNumber}" type="button" aria-label="Aumentar repetições">+</button>
        </div>
      </div>
      <button class="complete-set" data-complete-set="${set.setNumber}" type="button" aria-label="${set.completed ? "Desmarcar série" : "Concluir série"}">${set.completed ? "✓" : "○"}</button>
    </div>
  `;
}

function bindExerciseEvents(exercise) {
  document.querySelectorAll("[data-rep-action]").forEach((button) => {
    button.addEventListener("click", () => changeReps(exercise.id, Number(button.dataset.setNumber), button.dataset.repAction === "plus" ? 1 : -1));
  });
  document.querySelectorAll("[data-complete-set]").forEach((button) => {
    button.addEventListener("click", () => toggleSet(exercise, Number(button.dataset.completeSet)));
  });
  document.querySelector("#loadVideo").addEventListener("click", () => loadVideo(exercise));
  document.querySelector("#previousExercise").addEventListener("click", () => moveExercise(-1));
  document.querySelector("#nextExercise").addEventListener("click", () => moveExercise(1));
  document.querySelector("#finishWorkout").addEventListener("click", finishWorkout);
  document.querySelector("#cancelWorkout").addEventListener("click", cancelWorkout);
}

function changeReps(exerciseId, setNumber, delta) {
  const set = state.active.sets[exerciseId].find((item) => item.setNumber === setNumber);
  if (!set || set.completed) return;
  set.reps = Math.max(0, Math.min(99, set.reps + delta));
  saveJson(ACTIVE_KEY, state.active);
  const value = document.querySelector(`[data-rep-value="${setNumber}"]`);
  if (value) value.textContent = set.reps;
}

async function toggleSet(exercise, setNumber) {
  const set = state.active.sets[exercise.id].find((item) => item.setNumber === setNumber);
  if (!set) return;
  set.completed = !set.completed;
  saveJson(ACTIVE_KEY, state.active);

  if (state.backend === "online" && state.active.remoteId) {
    try {
      const payload = {
        session_id: state.active.remoteId,
        user_id: state.userId,
        exercise_id: exercise.id,
        exercise_name: exercise.name,
        set_number: setNumber,
        target_reps: exercise.target,
        performed_reps: set.reps,
        per_side: exercise.perSide,
        band_type: exercise.bandType,
        completed: set.completed
      };
      const { data, error } = await state.supabase.from("set_logs")
        .upsert(payload, { onConflict: "session_id,exercise_id,set_number" })
        .select("id").single();
      if (error) throw error;
      set.logId = data.id;
      saveJson(ACTIVE_KEY, state.active);
    } catch (error) {
      console.error(error);
      showToast("Série salva localmente; sincronização pendente.");
    }
  }

  renderActiveWorkout();
  if (set.completed) showRestTimer();
}

function moveExercise(delta) {
  const workout = WORKOUTS[state.active.workoutCode];
  state.exerciseIndex = Math.max(0, Math.min(workout.exercises.length - 1, state.exerciseIndex + delta));
  state.active.exerciseIndex = state.exerciseIndex;
  saveJson(ACTIVE_KEY, state.active);
  renderActiveWorkout();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadVideo(exercise) {
  if (exercise.videoUrl) {
    window.open(exercise.videoUrl, "_blank", "noopener,noreferrer");
    return;
  }
  const start = exercise.videoStart ? `?start=${exercise.videoStart}&rel=0` : "?rel=0";
  const shell = document.querySelector("#videoShell");
  shell.innerHTML = `<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/${exercise.videoId}${start}" title="Execução de ${escapeHtml(exercise.name)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

function renderWarmup() {
  view.innerHTML = `
    <div class="workout-header">
      <div class="workout-header-row"><div><span class="block-label">TREINO ${state.active.workoutCode}</span><h2>Aquecimento</h2></div><div class="timer-display">3 min</div></div>
    </div>
    <section class="card warmup-card">
      <span class="badge posture">Preparação</span>
      <h2>Ative o corpo antes de começar</h2>
      <div id="warmupTimer" class="big-timer">${formatDuration(state.warmupSeconds)}</div>
      <ul class="warmup-list">${WARMUP.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <button id="warmupToggle" class="btn btn-primary btn-block" type="button">${state.warmupRunning ? "Pausar" : "Iniciar cronômetro"}</button>
      <button id="warmupDone" class="btn btn-ghost btn-block" type="button" style="margin-top:10px">Concluir aquecimento</button>
    </section>
  `;
  document.querySelector("#warmupToggle").addEventListener("click", toggleWarmupTimer);
  document.querySelector("#warmupDone").addEventListener("click", finishWarmup);
  if (state.warmupRunning) runWarmupTimer();
}

function toggleWarmupTimer() {
  state.warmupRunning = !state.warmupRunning;
  if (state.warmupRunning) runWarmupTimer();
  else clearInterval(state.warmupTimer);
  renderWarmup();
}

function runWarmupTimer() {
  clearInterval(state.warmupTimer);
  state.warmupTimer = setInterval(() => {
    state.warmupSeconds -= 1;
    const timer = document.querySelector("#warmupTimer");
    if (timer) timer.textContent = formatDuration(state.warmupSeconds);
    if (state.warmupSeconds <= 0) {
      clearInterval(state.warmupTimer);
      state.warmupRunning = false;
      if (navigator.vibrate) navigator.vibrate([150, 80, 150]);
      showToast("Aquecimento concluído.");
      finishWarmup();
    }
  }, 1000);
}

function finishWarmup() {
  clearInterval(state.warmupTimer);
  state.warmupRunning = false;
  state.active.warmupDone = true;
  saveJson(ACTIVE_KEY, state.active);
  renderActiveWorkout();
}

function showRestTimer() {
  let remaining = state.settings.restSeconds;
  modalRoot.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Descanso">
      <div class="modal">
        <div style="text-align:center"><span class="badge">DESCANSO</span><h2>Recupere a respiração</h2><p>Prepare o elástico e a posição da próxima série.</p></div>
        <div class="rest-ring" id="restRing"><strong id="restValue">${remaining}</strong></div>
        <button id="skipRest" class="btn btn-primary btn-block" type="button">Pular descanso</button>
      </div>
    </div>`;
  const ring = document.querySelector("#restRing");
  const value = document.querySelector("#restValue");
  const close = () => { clearInterval(timer); modalRoot.innerHTML = ""; };
  document.querySelector("#skipRest").addEventListener("click", close);
  const timer = setInterval(() => {
    remaining -= 1;
    const progress = ((state.settings.restSeconds - remaining) / state.settings.restSeconds) * 100;
    ring.style.setProperty("--progress", `${progress}%`);
    value.textContent = remaining;
    if (remaining <= 0) {
      if (navigator.vibrate) navigator.vibrate([180, 80, 180]);
      close();
      showToast("Descanso concluído.");
    }
  }, 1000);
}

async function finishWorkout() {
  const workout = WORKOUTS[state.active.workoutCode];
  const totalSets = workout.exercises.reduce((sum, item) => sum + item.sets, 0);
  const completedSets = countCompletedSets();
  if (completedSets < totalSets) {
    const confirmed = confirm(`Você concluiu ${completedSets} de ${totalSets} séries. Deseja registrar o treino mesmo assim?`);
    if (!confirmed) return;
  }

  const completedAt = new Date().toISOString();
  const durationSeconds = secondsBetween(state.active.startedAt, completedAt);
  const sessionSummary = {
    id: state.active.id,
    remote_id: state.active.remoteId,
    workout_code: state.active.workoutCode,
    started_at: state.active.startedAt,
    completed_at: completedAt,
    duration_seconds: durationSeconds,
    completed_sets: completedSets,
    total_sets: totalSets,
    total_reps: getActiveTotalReps(),
    sets_snapshot: state.active.sets
  };

  if (state.backend === "online" && state.active.remoteId) {
    try {
      const { error } = await state.supabase.from("workout_sessions").update({
        completed_at: completedAt,
        duration_seconds: durationSeconds,
        status: "completed"
      }).eq("id", state.active.remoteId);
      if (error) throw error;
    } catch (error) {
      console.error(error);
      showToast("Conclusão salva localmente; sincronização falhou.");
    }
  }

  const localHistory = loadJson(STORAGE_KEY, []);
  localHistory.unshift(sessionSummary);
  saveJson(STORAGE_KEY, localHistory.slice(0, 200));
  localStorage.removeItem(ACTIVE_KEY);
  state.active = null;
  state.exerciseIndex = 0;
  await refreshHistory();
  showCompletionModal(sessionSummary);
}

function showCompletionModal(summary) {
  modalRoot.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal" style="text-align:center">
        <div style="font-size:48px">✨</div>
        <h2>Treino ${summary.workout_code} concluído!</h2>
        <p>${summary.completed_sets} séries · ${summary.total_reps} repetições · ${formatDuration(summary.duration_seconds)}</p>
        <button id="closeCompletion" class="btn btn-primary btn-block" type="button">Voltar para Hoje</button>
      </div>
    </div>`;
  document.querySelector("#closeCompletion").addEventListener("click", () => {
    modalRoot.innerHTML = "";
    navigate("home");
  });
}

async function cancelWorkout() {
  const confirmed = confirm("Descartar este treino e todos os registros ainda não concluídos?");
  if (!confirmed) return;
  if (state.backend === "online" && state.active.remoteId) {
    try {
      await state.supabase.from("workout_sessions").update({ status: "abandoned" }).eq("id", state.active.remoteId);
    } catch (error) { console.error(error); }
  }
  localStorage.removeItem(ACTIVE_KEY);
  state.active = null;
  navigate("home");
}

async function refreshHistory() {
  const localHistory = loadJson(STORAGE_KEY, []);
  if (state.backend === "online" && state.supabase) {
    try {
      const { data, error } = await state.supabase.from("workout_sessions")
        .select("id, client_id, workout_code, started_at, completed_at, duration_seconds, status, set_logs(performed_reps, completed)")
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      const remote = (data || []).map((item) => ({
        id: item.client_id || item.id,
        remote_id: item.id,
        workout_code: item.workout_code,
        started_at: item.started_at,
        completed_at: item.completed_at,
        duration_seconds: item.duration_seconds || 0,
        completed_sets: (item.set_logs || []).filter((set) => set.completed).length,
        total_sets: (item.set_logs || []).length,
        total_reps: (item.set_logs || []).filter((set) => set.completed).reduce((sum, set) => sum + (set.performed_reps || 0), 0)
      }));
      state.history = mergeHistory(remote, localHistory);
      return;
    } catch (error) {
      console.error(error);
      setBackend("error", "Falha no banco");
    }
  }
  state.history = localHistory.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
}

function mergeHistory(remote, local) {
  const map = new Map();
  [...remote, ...local].forEach((item) => {
    const key = item.id || `${item.workout_code}-${item.completed_at}`;
    if (!map.has(key)) map.set(key, item);
  });
  return [...map.values()].sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
}

function renderHistory() {
  const thisWeek = getThisWeekHistory();
  view.innerHTML = `
    <div class="section-header"><div><h2>Histórico</h2><p>${thisWeek.length} treino${thisWeek.length === 1 ? "" : "s"} nesta semana.</p></div></div>
    ${state.history.length ? `<div class="history-list">${state.history.map(historyTemplate).join("")}</div>` : `
      <div class="empty-state card"><div class="emoji">📅</div><h2>O histórico começa no primeiro treino</h2><p>As séries e repetições concluídas aparecerão aqui.</p><button id="historyStart" class="btn btn-primary" type="button">Começar treino</button></div>`}
  `;
  const startButton = document.querySelector("#historyStart");
  if (startButton) startButton.addEventListener("click", () => startWorkout(getNextWorkoutCode()));
}

function historyTemplate(item) {
  return `
    <section class="card history-item">
      <div class="history-code ${item.workout_code === "B" ? "b" : ""}">${item.workout_code}</div>
      <div><h3>${formatLongDate(item.completed_at)}</h3><p>${item.completed_sets || 0} séries · ${formatDuration(item.duration_seconds || 0)}</p></div>
      <div class="history-reps"><strong>${item.total_reps || 0}</strong><span>repetições</span></div>
    </section>`;
}

function renderSettings() {
  const backendText = state.backend === "online"
    ? "Sincronização ativa com sessão anônima do Supabase."
    : "Os dados estão apenas neste navegador. Configure o Supabase para sincronizar.";
  view.innerHTML = `
    <div class="section-header"><div><h2>Ajustes</h2><p>Personalize o ritmo e os dados.</p></div></div>
    <section class="card">
      <div class="setting-row">
        <div><h3>Descanso entre séries</h3><p>O cronômetro aparece após concluir uma série.</p></div>
        <select id="restSelect" aria-label="Tempo de descanso">
          ${[30,45,60,75].map((seconds) => `<option value="${seconds}" ${state.settings.restSeconds === seconds ? "selected" : ""}>${seconds}s</option>`).join("")}
        </select>
      </div>
      <div class="setting-row">
        <div><h3>Status dos dados</h3><p>${backendText}</p></div>
        <span class="badge ${state.backend === "online" ? "posture" : ""}">${state.backendMessage}</span>
      </div>
      <div class="setting-row">
        <div><h3>Exportar backup</h3><p>Baixa um arquivo JSON com histórico e treino em andamento.</p></div>
        <button id="exportData" class="btn btn-ghost btn-small" type="button">Exportar</button>
      </div>
      <div class="setting-row">
        <div><h3>Instalar no iPhone</h3><p>No Safari: Compartilhar → Adicionar à Tela de Início.</p></div>
        <span class="badge">PWA</span>
      </div>
    </section>

    <div class="section-header"><div><h2>Segurança e continuidade</h2></div></div>
    <div class="notice">O acesso anônimo evita uma tela de login, mas não permite recuperar a mesma conta em outro aparelho caso os dados do navegador sejam apagados. O backup manual reduz esse risco; uma versão futura pode usar link mágico por e-mail sem senha.</div>

    <div class="section-header"><div><h2>Sobre o treino</h2></div></div>
    <section class="card">
      <p style="margin-top:0;line-height:1.55">Comece com elásticos que permitam concluir as repetições com técnica e ainda sentir que seriam possíveis aproximadamente 2–3 repetições adicionais. Interrompa o exercício diante de dor aguda, tontura, falta de ar fora do esperado ou mal-estar.</p>
      <button id="discardAll" class="btn btn-danger btn-block btn-small" type="button">Apagar dados locais</button>
    </section>
  `;

  document.querySelector("#restSelect").addEventListener("change", (event) => {
    state.settings.restSeconds = Number(event.target.value);
    saveJson(SETTINGS_KEY, state.settings);
    showToast("Tempo de descanso atualizado.");
  });
  document.querySelector("#exportData").addEventListener("click", exportData);
  document.querySelector("#discardAll").addEventListener("click", discardLocalData);
}

function exportData() {
  const data = {
    exportedAt: new Date().toISOString(),
    history: state.history,
    active: state.active,
    settings: state.settings
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `treino-emanoele-backup-${new Date().toISOString().slice(0,10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function discardLocalData() {
  const confirmed = confirm("Apagar histórico, ajustes e treino em andamento deste navegador?");
  if (!confirmed) return;
  [STORAGE_KEY, SETTINGS_KEY, ACTIVE_KEY].forEach((key) => localStorage.removeItem(key));
  state.history = [];
  state.active = null;
  state.settings = loadSettings();
  showToast("Dados locais apagados.");
  renderSettings();
}

function getNextWorkoutCode() {
  const last = state.history[0];
  if (!last) return "A";
  return last.workout_code === "A" ? "B" : "A";
}

function countCompletedSets() {
  if (!state.active) return 0;
  return Object.values(state.active.sets).flat().filter((set) => set.completed).length;
}

function getActiveTotalReps() {
  return Object.values(state.active.sets).flat().filter((set) => set.completed).reduce((sum, set) => sum + Number(set.reps || 0), 0);
}

function getThisWeekHistory() {
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const start = new Date(now);
  start.setHours(0,0,0,0);
  start.setDate(now.getDate() - day);
  return state.history.filter((item) => new Date(item.completed_at) >= start);
}

function startSessionTimer() {
  clearSessionTimer();
  state.sessionTimer = setInterval(() => {
    const element = document.querySelector("#sessionTimer");
    if (element && state.active) element.textContent = formatDuration(secondsSince(state.active.startedAt));
  }, 1000);
}

function clearSessionTimer() {
  if (state.sessionTimer) clearInterval(state.sessionTimer);
  state.sessionTimer = null;
}

function secondsSince(date) { return Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000)); }
function secondsBetween(start, end) { return Math.max(0, Math.floor((new Date(end) - new Date(start)) / 1000)); }
function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
function formatShortDate(date) { return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(new Date(date)); }
function formatLongDate(date) { return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(new Date(date)); }
function sameLocalDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function loadSettings() { return { restSeconds: 45, ...loadJson(SETTINGS_KEY, {}) }; }
function loadJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try { await navigator.serviceWorker.register("./service-worker.js"); }
    catch (error) { console.warn("Service worker não registrado", error); }
  }
}
