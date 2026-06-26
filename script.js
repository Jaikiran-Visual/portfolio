// Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(s => s.style.transform = 'none');
                spans[1].style.opacity = '1';
            });
        });
    }

    // 2. Sticky Navbar & Active Section Highlighting on Scroll
    const header = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link detection
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Project Filter System
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // 4. Case Studies Modal Content Data
    const projectDetails = {
        pbi: {
            title: "Bike Buyers Power BI Dashboard",
            tag: "Power BI & DAX Integration",
            description: "Developed an interactive 6-visual analytics dashboard to analyze consumer demographics and geography, identifying key purchase drivers.",
            problem: "The sales team had access to over 1,000 raw customer profile records containing age, income, region, and commuting behavior, but was unable to identify their primary buyer segments or visualize key purchase indicators.",
            solution: [
                "Constructed a robust data model in Power BI, connecting demographic indicators to bike sales outcomes.",
                "Engineered custom business logic using DAX, notably a <code>DAX SWITCH</code> calculated column that segmented buyers into defined age categories (Youth, Middle-Aged, Senior).",
                "Created clean visual layouts using slicers, card metrics, bar charts, and geographical maps, enabling quick filtering by gender, region, and income."
            ],
            results: [
                "Identified Middle-Aged (31-54) North American professionals as the highest-volume buyer cohort.",
                "Surfaced a key purchase insight showing that customers with short commutes (0-1 mile) represent the highest converting opportunity.",
                "Published the finalized dashboard live to Power BI Service to enable instant, cloud-based data exploration."
            ],
            tools: ["Power BI Desktop", "Power BI Service", "DAX", "Data Modeling", "Dashboard Design"]
        },
        sql: {
            title: "Bike Buyers SQL Demographics Analysis",
            tag: "SQLite & Relational Database Design",
            description: "Designed a clean relational database schema and wrote business-focused queries to analyze conversion drivers across customer profiles.",
            problem: "Raw CSV spreadsheets were disorganized, leading to duplicate records and lack of querying structure. The marketing team needed to answers specific segment-based questions to design targeted campaigns.",
            solution: [
                "Normalized the dataset and designed a relational table structure inside a SQLite environment.",
                "Wrote 7 analytical SQL scripts querying across 6 demographic variables.",
                "Utilized advanced SQL window functions (e.g., <code>ROW_NUMBER()</code>, <code>RANK()</code>) to list records, <code>CASE WHEN</code> conditionals for custom category grouping, and multi-level aggregations."
            ],
            results: [
                "Identified that short-commute customers (0-1 mile) converted at a significantly higher rate across all income brackets.",
                "Found a strong correlation between middle-income segments and purchase volume, allowing targeted email list segmentation.",
                "Cleaned 1,000+ data rows, deleting duplicate records and correcting inconsistent labels (e.g. standardizing regions)."
            ],
            code: `SELECT 
    Commute_Distance,
    COUNT(CASE WHEN Purchased_Bike = 'Yes' THEN 1 END) AS Sales_Volume,
    COUNT(*) AS Total_Customers,
    ROUND(CAST(COUNT(CASE WHEN Purchased_Bike = 'Yes' THEN 1 END) AS FLOAT) / COUNT(*) * 100, 2) AS Conversion_Rate
FROM Customer_Data
GROUP BY Commute_Distance
ORDER BY Conversion_Rate DESC;`,
            tools: ["SQL", "SQLite", "Window Functions", "Data Normalization", "Aggregation"]
        },
        excel: {
            title: "Bike Sales Data Analysis & Dashboard",
            tag: "Microsoft Excel & Power Query",
            description: "Built a fully interactive spreadsheet dashboard with Pivot Tables, slicers, and custom cleaning pipelines using Power Query.",
            problem: "The raw data contained missing fields, irregular formatting, and age categories that were too raw for standard charts. The team needed a clean, shareable spreadsheet tool.",
            solution: [
                "Utilized Excel Power Query to load, transform, and clean the 1,000+ data rows.",
                "Parsed raw ages into logical buckets (Adolescent, Middle-Aged, Senior) using conditional formulas.",
                "Built multiple custom Pivot Tables to summarize purchases relative to customer income, age groups, and commutes."
            ],
            results: [
                "Created an interactive Excel Dashboard featuring dynamic Pivot Charts.",
                "Added interactive slicers for region, education, and gender, allowing users to filter the charts on the fly.",
                "Surfaced Middle-Aged customers (31-54) as the strongest-converting age demographic."
            ],
            tools: ["Excel Power Query", "Pivot Tables", "Pivot Charts", "Slicers", "Conditional Logic"]
        }
    };

    // 5. Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalClose = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.btn-project-detail');

    if (modal && modalContent && modalClose) {
        detailButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const projKey = btn.getAttribute('data-project');
                const data = projectDetails[projKey];
                
                if (data) {
                    let solutionHTML = '';
                    data.solution.forEach(step => {
                        solutionHTML += `<li>${step}</li>`;
                    });

                    let resultsHTML = '';
                    data.results.forEach(res => {
                        resultsHTML += `<li>${res}</li>`;
                    });

                    let toolsHTML = '';
                    data.tools.forEach(t => {
                        toolsHTML += `<span class="modal-tech-tag" style="margin-right: 0.5rem; margin-bottom: 0.5rem;">${t}</span>`;
                    });

                    let codeHTML = '';
                    if (data.code) {
                        codeHTML = `
                            <div class="modal-section">
                                <h4>Query Sample:</h4>
                                <pre class="modal-code-box"><code>${data.code}</code></pre>
                            </div>
                        `;
                    }

                    modalContent.innerHTML = `
                        <div class="modal-body">
                            <span class="subtitle">${data.tag}</span>
                            <h3>${data.title}</h3>
                            <p class="lead-text" style="font-size: 1.1rem; margin-top: 1rem; color: var(--text-primary);">${data.description}</p>
                            
                            <div class="modal-section" style="margin-top: 1.5rem;">
                                <h4>The Challenge:</h4>
                                <p>${data.problem}</p>
                            </div>
                            
                            <div class="modal-section">
                                <h4>What I Did:</h4>
                                <ul class="modal-list">
                                    ${solutionHTML}
                                </ul>
                            </div>
                            
                            ${codeHTML}

                            <div class="modal-section">
                                <h4>Business Outcome &amp; Findings:</h4>
                                <ul class="modal-list" style="border-left: 2px solid var(--secondary); padding-left: 1rem;">
                                    ${resultsHTML}
                                </ul>
                            </div>
                            
                            <div class="modal-section" style="margin-top: 2rem;">
                                <h4>Tools &amp; Methods:</h4>
                                <div style="display: flex; flex-wrap: wrap;">
                                    ${toolsHTML}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Disable page scroll
                }
            });
        });

        // Close Modal events
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 6. Contact Form Submission Handling
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Retrieve form values
            const nameVal = document.getElementById('name').value;
            const emailVal = document.getElementById('email').value;
            const messageVal = document.getElementById('message').value;

            // Simple validation check
            if (nameVal && emailVal && messageVal) {
                // Animate form exit
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                }, 300);
            }
        });
    }
});
