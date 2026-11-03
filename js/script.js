'use strict';

// Todos os cards são criados a partir da resposta da API, sem HTML estático.
const API_URL = 'https://rickandmortyapi.com/api/character/';
const grid = document.getElementById('characters');
const form = document.getElementById('filters');
const search = document.getElementById('search');
const statusFilter = document.getElementById('status');
const feedback = document.getElementById('feedback');
const summary = document.getElementById('results-summary');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const indicator = document.getElementById('page-indicator');
const retry = document.getElementById('retry');
const statuses = { Alive: 'Vivo', Dead: 'Morto', unknown: 'Desconhecido' };
const species = { Human: 'Humano', Alien: 'Alienígena', Humanoid: 'Humanoide', Robot: 'Robô', Animal: 'Animal', unknown: 'Desconhecida' };
let currentPage = 1;
let pages = 0;
let activeFilters = { name: '', status: '' };
let controller;
let requestId = 0;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function readableLocation(value) {
  return !value || value === 'unknown' ? 'Desconhecida' : value;
}

function createCard(character) {
  const card = createElement('article', 'character-card');
  const portrait = createElement('div', 'portrait');
  const image = createElement('img');
  image.src = character.image;
  image.alt = `Retrato de ${character.name}`;
  image.width = 300;
  image.height = 300;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.hidden = true;
    portrait.append(createElement('span', 'feedback', 'Imagem indisponível'));
  }, { once: true });
  portrait.append(image, createElement('span', 'character-number', `#${String(character.id).padStart(3, '0')}`));
  const content = createElement('div', 'card-content');
  const title = createElement('h3', '', character.name);
  const meta = createElement('div', 'character-meta');
  const dot = createElement('span', `status-dot ${character.status.toLowerCase()}`);
  dot.setAttribute('aria-hidden', 'true');
  meta.append(dot, createElement('span', '', `${statuses[character.status] || character.status} · ${species[character.species] || character.species}`));
  const details = createElement('dl');
  details.append(
    createElement('dt', '', 'Origem'),
    createElement('dd', '', readableLocation(character.origin.name)),
    createElement('dt', '', 'Última localização'),
    createElement('dd', '', readableLocation(character.location.name))
  );
  content.append(title, meta, details);
  card.append(portrait, content);
  return card;
}

function updatePagination(loading) {
  previous.disabled = loading || pages === 0 || currentPage <= 1;
  next.disabled = loading || pages === 0 || currentPage >= pages;
  indicator.textContent = pages ? `Página ${currentPage} de ${pages}` : 'Página —';
}

function loadCharacters(page = 1) {
  // Cancela consultas anteriores para impedir resultados fora de ordem.
  if (controller) controller.abort();
  controller = new AbortController();
  const requestController = controller;
  currentPage = page;
  const id = ++requestId;
  const params = new URLSearchParams({ page: String(page) });
  if (activeFilters.name) params.set('name', activeFilters.name);
  if (activeFilters.status) params.set('status', activeFilters.status);
  grid.replaceChildren();
  grid.setAttribute('aria-busy', 'true');
  feedback.hidden = false;
  feedback.textContent = 'Abrindo o portal… Carregando personagens.';
  summary.textContent = 'Consultando o multiverso…';
  retry.hidden = true;
  updatePagination(true);
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; requestController.abort(); }, 15000);

  return fetch(`${API_URL}?${params}`, { signal: requestController.signal })
    .then(response => {
      if (response.status === 404) return { info: { count: 0, pages: 0 }, results: [] };
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (id !== requestId) return;
      currentPage = page;
      pages = data.info.pages;
      const fragment = document.createDocumentFragment();
      data.results.forEach(character => fragment.appendChild(createCard(character)));
      grid.appendChild(fragment);
      summary.textContent = `${data.info.count.toLocaleString('pt-BR')} personagem${data.info.count === 1 ? '' : 's'} encontrado${data.info.count === 1 ? '' : 's'} · ${data.results.length} nesta página`;
      feedback.hidden = data.results.length > 0;
      feedback.textContent = 'Nenhum personagem encontrado. Tente outro nome ou limpe os filtros.';
    })
    .catch(error => {
      if (id !== requestId || (error.name === 'AbortError' && !timedOut)) return;
      pages = 0;
      summary.textContent = 'Não foi possível carregar os personagens.';
      feedback.hidden = false;
      feedback.textContent = timedOut
        ? 'O portal demorou para responder. Tente novamente.'
        : 'A conexão com o multiverso falhou. Verifique sua internet e tente novamente.';
      retry.hidden = false;
    })
    .finally(() => {
      clearTimeout(timeout);
      if (id !== requestId) return;
      grid.setAttribute('aria-busy', 'false');
      updatePagination(false);
    });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  activeFilters = { name: search.value.trim(), status: statusFilter.value };
  loadCharacters(1);
});
form.addEventListener('reset', () => {
  activeFilters = { name: '', status: '' };
  loadCharacters(1);
});
previous.addEventListener('click', () => loadCharacters(currentPage - 1));
next.addEventListener('click', () => loadCharacters(currentPage + 1));
retry.addEventListener('click', () => loadCharacters(currentPage));
loadCharacters();
