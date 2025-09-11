// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

import * as echarts from 'echarts';

// Dashboards (safe init only if element exists)
const barChartTarget = document.getElementById('barChart');
if (barChartTarget) {
  const myChart = echarts.init(barChartTarget);
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
}

// ...existing code...

// Set initial theme and icon on page load
document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  const darkModeBtn = document.getElementById("darkModeBtn");
  const iconEl = darkModeBtn.querySelector("i");

  // Set default theme to light if not set
  if (!htmlEl.getAttribute("data-bs-theme")) {
    htmlEl.setAttribute("data-bs-theme", "light");
    iconEl.classList.remove("bi-moon");
    iconEl.classList.add("bi-brightness-high");
  } else if (htmlEl.getAttribute("data-bs-theme") === "dark") {
    iconEl.classList.remove("bi-brightness-high");
    iconEl.classList.add("bi-moon");
  } else {
    iconEl.classList.remove("bi-moon");
    iconEl.classList.add("bi-brightness-high");
  }

  // Toggle theme and icon on button click
  darkModeBtn.addEventListener("click", (event) => {
    const isLight = htmlEl.getAttribute("data-bs-theme") === "light";
    if (isLight) {
      htmlEl.setAttribute("data-bs-theme", "dark");
      iconEl.classList.remove("bi-brightness-high");
      iconEl.classList.add("bi-moon");
    } else {
      htmlEl.setAttribute("data-bs-theme", "light");
      iconEl.classList.remove("bi-moon");
      iconEl.classList.add("bi-brightness-high");
    }
  });
  
  // --- Tickets persistence and filters (support.html) ---
  const createTicketForm = document.getElementById("createTicketForm");
  const ticketsTableBody = document.getElementById("ticketsTableBody");
  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  const paginationEl = document.getElementById('ticketsPagination');

  const readTickets = () => {
    try { return JSON.parse(localStorage.getItem('tickets') || '[]'); } catch { return []; }
  };
  const saveTickets = (tickets) => localStorage.setItem('tickets', JSON.stringify(tickets));
  const formatDate = (d) => d.toLocaleDateString('en-GB').replace(/\//g, '-');
  const formatTime = (d) => d.toTimeString().slice(0, 8);

  const PAGE_SIZE = 8;
  let currentPage = 1;
  let currentFilters = { createdBy: new Set(), status: new Set(), createdTime: new Set() };

  const applyFilterPredicate = (t) => {
    const byOk = currentFilters.createdBy.size === 0 || currentFilters.createdBy.has(t.createdBy);
    const stOk = currentFilters.status.size === 0 || currentFilters.status.has(t.status);
    const tmOk = (() => {
      if (currentFilters.createdTime.size === 0) return true;
      const hour = new Date(t.createdAt).getHours();
      const ranges = Array.from(currentFilters.createdTime.values());
      const inRange = (rng) => {
        const [start, end] = rng.split('-').map(s => s.trim());
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        const startH = sh;
        const endH = eh;
        if (startH <= endH) {
          return hour >= startH && hour < endH;
        } else {
          // overnight range
          return hour >= startH || hour < endH;
        }
      };
      return ranges.some(inRange);
    })();
    return byOk && stOk && tmOk;
  };

  const renderTickets = (tickets) => {
    if (!ticketsTableBody) return;
    ticketsTableBody.innerHTML = '';
    const sorted = [...tickets].sort((a,b) => b.createdAt - a.createdAt);
    const filtered = sorted.filter(applyFilterPredicate);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);
    for (const t of pageItems) {
      const statusClass = t.status === 'Open' ? 'text-success' : t.status === 'Pending' ? 'text-warning' : 'text-danger';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${formatDate(new Date(t.createdAt))}</td>
        <td>${t.createdBy}</td>
        <td class="${statusClass}">${t.status}</td>
        <td>${formatTime(new Date(t.updatedAt || t.createdAt))}</td>
        <td><a href="#" class="link-primary text-decoration-none">${t.link}</a></td>
      `;
      ticketsTableBody.appendChild(tr);
    }
    if (paginationEl) renderPagination(totalPages);
  };

  const renderPagination = (totalPages) => {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    const addItem = (label, page, disabled=false, active=false) => {
      const li = document.createElement('li');
      li.className = `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}`;
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = label;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        if (disabled || active) return;
        currentPage = page;
        renderTickets(readTickets());
      });
      li.appendChild(a);
      paginationEl.appendChild(li);
    };
    addItem('‹', Math.max(1, currentPage - 1), currentPage === 1, false);
    for (let p = 1; p <= totalPages; p++) {
      addItem(String(p), p, false, p === currentPage);
    }
    addItem('›', Math.min(totalPages, currentPage + 1), currentPage === totalPages, false);
  };

  if (ticketsTableBody) {
    renderTickets(readTickets());
  }

  if (createTicketForm && ticketsTableBody) {
    createTicketForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const creatorInput = document.getElementById("ticketCreator");
      const statusSelect = document.getElementById("ticketStatus");
      const linkInput = document.getElementById("ticketLink");

      const now = Date.now();
      const ticket = {
        createdAt: now,
        updatedAt: now,
        createdBy: (creatorInput.value || '').trim() || 'System',
        status: statusSelect.value,
        link: (linkInput.value || '').trim() || Math.floor(1000 + Math.random() * 9000).toString()
      };

      const tickets = readTickets();
      tickets.push(ticket);
      saveTickets(tickets);
      currentPage = 1;
      renderTickets(tickets);

      createTicketForm.reset();
      const modalEl = document.getElementById('createTicketModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
      }
    });
  }

  // Collect filters from checklist and apply
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      const checks = document.querySelectorAll('[data-filter-group]');
      currentFilters = { createdBy: new Set(), status: new Set(), createdTime: new Set() };
      checks.forEach((c) => {
        if (c.checked) {
          const group = c.getAttribute('data-filter-group');
          currentFilters[group].add(c.value);
        }
      });
      currentPage = 1;
      renderTickets(readTickets());
      const dropdownToggle = document.getElementById('ticketFilterDropdown');
      if (dropdownToggle) dropdownToggle.textContent = 'Filters';
    });
  }
});

// ...existing code...
