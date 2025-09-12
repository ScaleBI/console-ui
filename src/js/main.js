// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

import * as echarts from 'echarts';
import { bottom } from '@popperjs/core';

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

// pie chart
const pieChartTarget = document.getElementById('pieChart');

if (pieChartTarget) {
  const myChart = echarts.init(pieChartTarget);
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center'
    },
    series: [
      {
        name: 'Dashboard',
        type: 'pie',
        radius: ['50%', '70%'], // donut effect
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}' // show value inside each slice
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 5, name: '> 30 days', itemStyle: { color: '#8e44ad' } },
          { value: 2, name: '> 7 days && <= 30 days', itemStyle: { color: '#e67e22' } },
          { value: 1, name: '<= 7 days', itemStyle: { color: '#3498db' } }
        ]
      },
      {
        // This is a fake series to put text in the center
        type: 'pie',
        radius: ['0%', '40%'],
        label: {
          position: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          formatter: 'Dashboard'
        },
        data: [{ value: 1, name: '' }],
        tooltip: { show: false },
        itemStyle: {
          color: '#fff' // inner circle color
        }
      }
    ]
  });
}

// Charts
const chart1Target = document.getElementById('pieChart_Charts');

if (chart1Target) {
  const myChart = echarts.init(chart1Target);
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center'
    },
    series: [
      {
        name: 'Charts',
        type: 'pie',
        radius: ['50%', '70%'], // donut effect
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}' // show value inside each slice
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 18, name: '> 30 days', itemStyle: { color: '#f2480fff' } },
          { value: 8, name: '> 7 days && <= 30 days', itemStyle: { color: '#e41725ff' } },
          { value: 4, name: '<= 7 days', itemStyle: { color: '#1e9bedff' } }
        ]
      },
      {
        // This is a fake series to put text in the center
        type: 'pie',
        radius: ['0%', '40%'],
        label: {
          position: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          formatter: 'Charts'
        },
        data: [{ value: 1, name: '' }],
        tooltip: { show: false },
        itemStyle: {
          color: '#fff' // inner circle color
        }
      }
    ]
  });
}

// users
const userChartTarget = document.getElementById('pieChart_Users');

if (userChartTarget) {
  const myChart = echarts.init(userChartTarget);

  // Original user data
  const rawData = [
    { value: 1, name: 'Admin', color: '#1e9bedff' },
    { value: 3, name: 'Publisher', color: '#0a0735ff' },
    { value: 2, name: 'Viewer', color: '#e67e22' }
  ];

  // Find max value
  const maxVal = Math.max(...rawData.map(d => d.value));

  // Reverse transform
  const chartData = rawData.map(d => ({
    value: maxVal - d.value + 1, // reverse sizing
    name: d.name,
    itemStyle: { color: d.color },
    labelValue: d.value // keep original for labels/tooltip
  }));

  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: ({ data }) => `${data.name}: ${data.labelValue}`
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center'
    },
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          formatter: ({ data }) => data.labelValue // show original values inside slices
        },
        labelLine: { show: false },
        data: chartData
      },
      {
        // Center label
        type: 'pie',
        radius: ['0%', '40%'],
        label: {
          position: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          formatter: 'Users'
        },
        data: [{ value: 1 }],
        tooltip: { show: false },
        itemStyle: { color: '#fff' }
      }
    ]
  });
}

// Chart views
const chartViewsTarget = document.getElementById('chart_views');
if (chartViewsTarget) {
  const myChart = echarts.init(chartViewsTarget);
 myChart.setOption({
  grid: { left: 100, right: 80, top: 20, bottom: 20 },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: [
    {
      type: 'category',
      inverse: true,
      data: ['Chart 1', 'Chart 2', 'Chart 3', 'Chart 4', 'Chart 5', 'Others'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#555' }
    },
    {
      type: 'category',
      inverse: true,
      position: 'right',
      offset: 20, // spacing from chart edge
      data: ['25,000', '15,000', '12,000', '10,000', '5,000', '35,000'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#333',
        fontWeight: 'bold',
        align: 'right'
      }
    }
  ],
  series: [
    {
      type: 'bar',
      data: [
        { value: 25000, itemStyle: { color: '#8e44ad', borderRadius: [6, 6, 6, 6] } }, // purple
        { value: 15000, itemStyle: { color: '#3498db', borderRadius: [6, 6, 6, 6] } }, // blue
        { value: 12000, itemStyle: { color: '#e67e22', borderRadius: [6, 6, 6, 6] } }, // orange
        { value: 10000, itemStyle: { color: '#e74c3c', borderRadius: [6, 6, 6, 6] } }, // red
        { value: 5000,  itemStyle: { color: '#27ae60', borderRadius: [6, 6, 6, 6] } }, // green
        { value: 35000, itemStyle: { color: '#000000', borderRadius: [6, 6, 6, 6] } }  // black
      ],
      barWidth: 12,
      label: { show: false }
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
