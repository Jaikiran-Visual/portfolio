// ============================================================
//   Portfolio Script — Minimalist Edition
// ============================================================

const projectData = {
  pbi: {
    label: "Power BI & DAX",
    title: "Bike Buyers Power BI Dashboard",
    summary: "Built an interactive 6-visual Power BI dashboard to surface key buyer segments from 1,000+ customer records.",
    problem: "The sales team had raw customer data but no visual way to understand their primary buyer segments or purchase drivers.",
    solution: [
      "Constructed a full data model in Power BI Desktop connecting demographics to sales outcomes.",
      "Engineered a custom DAX SWITCH() calculated column to bucket raw ages into three business segments (Youth, Middle-Aged, Senior).",
      "Designed 6 coordinated visuals with slicers for gender, region, income, and education — all cross-filtering each other.",
      "Published the final dashboard live to Power BI Service."
    ],
    results: [
      "Identified Middle-Aged North American professionals as the highest-volume buyer segment.",
      "Discovered short-commute customers (0–1 mile) as the top converting group across all income brackets.",
      "Reduced manual reporting time by moving from spreadsheets to a live, filterable dashboard."
    ],
    tools: ["Power BI Desktop", "Power BI Service", "DAX", "Data Modeling"]
  },
  sql: {
    label: "SQL & Relational Database",
    title: "Bike Buyers SQL Demographics Analysis",
    summary: "Designed a normalized relational schema and wrote 7 business-focused queries to identify conversion drivers by segment.",
    problem: "Raw CSV data was unstructured and duplicated, making it impossible for the marketing team to ask specific segment questions.",
    solution: [
      "Normalized raw data and designed a clean relational table schema inside SQLite.",
      "Wrote 7 analytical SQL scripts querying across 6 demographic variables.",
      "Used advanced techniques: CASE WHEN for custom grouping, window functions for ranking, and multi-level GROUP BY aggregations."
    ],
    results: [
      "Identified short-commute customers (0–1 mile) as consistently higher converters across every income bracket.",
      "Found a strong correlation between middle-income brackets and purchase volume.",
      "Cleaned 1,000+ records by removing duplicates and standardizing region labels."
    ],
    code: `SELECT Commute_Distance,
  COUNT(CASE WHEN Purchased_Bike='Yes' THEN 1 END) AS Sales,
  COUNT(*) AS Total,
  ROUND(
    CAST(COUNT(CASE WHEN Purchased_Bike='Yes' THEN 1 END) AS FLOAT)
    / COUNT(*) * 100, 2
  ) AS Conv_Rate
FROM Customer_Data
GROUP BY Commute_Distance
ORDER BY Conv_Rate DESC;`,
    tools: ["SQLite", "SQL Window Functions", "CASE WHEN", "Data Normalization"]
  },
  excel: {
    label: "Advanced Excel",
    title: "Bike Sales Analysis & Interactive Dashboard",
    summary: "Cleaned and analyzed 1,000+ customer records in Excel using Power Query, Pivot Tables, and dynamic slicers.",
    problem: "Raw spreadsheet data had missing values, inconsistent formatting, and no structure for filtering or comparison.",
    solution: [
      "Used Excel Power Query to load, transform, and clean all 1,000+ records in a repeatable pipeline.",
      "Parsed raw ages into logical categories using IF/IFS logic (Adolescent, Middle-Aged, Senior).",
      "Built multiple Pivot Tables summarizing purchases by income, age groups, gender, and commute distance.",
      "Assembled an interactive Excel Dashboard using Pivot Charts with synchronized slicers."
    ],
    results: [
      "Identified Middle-Aged buyers (31–54) as the strongest-converting demographic segment.",
      "Enabled the team to self-serve on segment filtering without needing to contact the analyst.",
      "Reduced report preparation time from hours to minutes with a reusable, automated pipeline."
    ],
    tools: ["Excel Power Query", "Pivot Tables", "Pivot Charts", "Dynamic Slicers", "Conditional Logic"]
  }
};

// ---- Navbar Toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navMenu.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// ---- Active nav on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ---- Project Filter ----
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.25s';
      if (!match) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
        requestAnimationFrame(() => requestAnimationFrame(() => { card.style.opacity = '1'; }));
      }
    });
  });
});

// ---- Case Study Modal ----
const modal        = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

function buildModal(key) {
  const d = projectData[key];
  if (!d) return;

  const solutionHTML = d.solution.map(s => `<li>${s}</li>`).join('');
  const resultsHTML  = d.results.map(r => `<li>${r}</li>`).join('');
  const toolsHTML    = d.tools.map(t => `<span class="modal-tag">${t}</span>`).join('');
  const codeHTML     = d.code
    ? `<div class="modal-section"><h4>Query Sample</h4><pre class="modal-code">${d.code}</pre></div>`
    : '';

  modalContent.innerHTML = `
    <p class="modal-label">${d.label}</p>
    <h2 class="modal-title">${d.title}</h2>
    <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">${d.summary}</p>

    <div class="modal-section">
      <h4>The Challenge</h4>
      <p>${d.problem}</p>
    </div>

    <div class="modal-section">
      <h4>What I Did</h4>
      <ul class="modal-list">${solutionHTML}</ul>
    </div>

    ${codeHTML}

    <div class="modal-section">
      <h4>Key Findings &amp; Outcomes</h4>
      <ul class="modal-list">${resultsHTML}</ul>
    </div>

    <div class="modal-section">
      <h4>Tools &amp; Methods</h4>
      <div class="modal-tags">${toolsHTML}</div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.btn-case-study').forEach(btn => {
  btn.addEventListener('click', () => buildModal(btn.dataset.project));
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
if (modalClose) modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.transition = 'opacity 0.25s';
    contactForm.style.opacity = '0';
    setTimeout(() => {
      contactForm.classList.add('hidden');
      formSuccess.classList.add('visible');
    }, 280);
  });
}
