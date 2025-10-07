// Accessible HR Diagram Implementation
class AccessibleHRDiagram {
    constructor() {
        this.canvas = document.getElementById('hrCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentView = 'main';
        this.animationFrame = 0;
        this.isAnimating = false;
        this.sortColumn = null;
        this.sortDirection = 'asc';

        // DOM elements
        this.announcements = document.getElementById('diagram-announcements');
        this.infoTitle = document.getElementById('infoTitle');
        this.infoDescription = document.getElementById('infoDescription');
        this.starInfo = document.getElementById('starInfo');
        this.starName = document.getElementById('starName');
        this.starDetails = document.getElementById('starDetails');
        this.tableBody = document.getElementById('star-table-body');
        this.typeFilter = document.getElementById('star-type-filter');

        // Star data
        this.stars = [
            // Main Sequence Stars
            { temp: 30000, lum: 100000, type: 'main', name: 'O-type Star', color: '#4488ff', typeLabel: 'Main Sequence' },
            { temp: 20000, lum: 10000, type: 'main', name: 'B-type Star', color: '#6699ff', typeLabel: 'Main Sequence' },
            { temp: 10000, lum: 100, type: 'main', name: 'A-type Star', color: '#aabbff', typeLabel: 'Main Sequence' },
            { temp: 7000, lum: 10, type: 'main', name: 'F-type Star', color: '#ffffff', typeLabel: 'Main Sequence' },
            { temp: 5778, lum: 1, type: 'main', name: 'Sun (G-type)', color: '#ffff44', typeLabel: 'Main Sequence' },
            { temp: 4500, lum: 0.1, type: 'main', name: 'K-type Star', color: '#ff8844', typeLabel: 'Main Sequence' },
            { temp: 3000, lum: 0.01, type: 'main', name: 'M-type Star', color: '#ff4444', typeLabel: 'Main Sequence' },

            // Red Giants
            { temp: 4000, lum: 1000, type: 'giant', name: 'Red Giant', color: '#ff6644', typeLabel: 'Giant' },
            { temp: 3500, lum: 5000, type: 'giant', name: 'Red Supergiant', color: '#ff4422', typeLabel: 'Giant' },
            { temp: 4500, lum: 800, type: 'giant', name: 'Orange Giant', color: '#ff8844', typeLabel: 'Giant' },

            // Blue Supergiants
            { temp: 15000, lum: 50000, type: 'supergiant', name: 'Blue Supergiant', color: '#4488ff', typeLabel: 'Supergiant' },
            { temp: 12000, lum: 20000, type: 'supergiant', name: 'Blue-White Supergiant', color: '#6699ff', typeLabel: 'Supergiant' },

            // White Dwarfs
            { temp: 8000, lum: 0.001, type: 'dwarf', name: 'Hot White Dwarf', color: '#ffffff', typeLabel: 'White Dwarf' },
            { temp: 6000, lum: 0.0005, type: 'dwarf', name: 'White Dwarf', color: '#eeeeee', typeLabel: 'White Dwarf' },
            { temp: 4000, lum: 0.0001, type: 'dwarf', name: 'Cool White Dwarf', color: '#cccccc', typeLabel: 'White Dwarf' }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateDataTable();
        this.showMainSequence();
        this.announceChange('Application loaded. Main sequence stars are now displayed.');
    }

    setupEventListeners() {
        // Control buttons
        const buttons = document.querySelectorAll('.control-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleViewChange(e));
            button.addEventListener('keydown', (e) => this.handleKeydown(e));
        });

        // Legend items
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach(item => {
            item.addEventListener('click', () => this.handleLegendClick(item));
            item.addEventListener('keydown', (e) => this.handleLegendKeydown(e, item));
        });

        // Table controls
        this.typeFilter.addEventListener('change', () => this.filterTable());

        const sortButtons = document.querySelectorAll('.sort-btn');
        sortButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSort(e));
        });

        // Canvas interaction
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('keydown', (e) => this.handleCanvasKeydown(e));
    }

    handleViewChange(e) {
        const button = e.target;
        const view = button.dataset.view;

        // Update button states
        document.querySelectorAll('.control-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        // Show appropriate view
        switch (view) {
            case 'main':
                this.showMainSequence();
                break;
            case 'giants':
                this.showGiants();
                break;
            case 'dwarfs':
                this.showDwarfs();
                break;
            case 'all':
                this.showAll();
                break;
            case 'evolution':
                this.animateEvolution();
                break;
        }
    }

    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }

    handleLegendClick(item) {
        const type = item.textContent.trim().toLowerCase();
        if (type.includes('main')) {
            this.activateButton('main-sequence-btn');
            this.showMainSequence();
        } else if (type.includes('giant')) {
            this.activateButton('giants-btn');
            this.showGiants();
        } else if (type.includes('dwarf')) {
            this.activateButton('dwarfs-btn');
            this.showDwarfs();
        }
    }

    handleLegendKeydown(e, item) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleLegendClick(item);
        }
    }

    activateButton(buttonId) {
        document.querySelectorAll('.control-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
        }
    }

    announceChange(message) {
        this.announcements.textContent = message;
        // Clear after a delay to allow for repeat announcements
        setTimeout(() => {
            this.announcements.textContent = '';
        }, 1000);
    }

    // Canvas drawing methods
    drawAxes() {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;

        // X-axis (temperature) - reversed scale
        this.ctx.beginPath();
        this.ctx.moveTo(80, 520);
        this.ctx.lineTo(720, 520);
        this.ctx.stroke();

        // Y-axis (luminosity)
        this.ctx.beginPath();
        this.ctx.moveTo(80, 520);
        this.ctx.lineTo(80, 80);
        this.ctx.stroke();

        // Temperature labels
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('30,000K', 120, 540);
        this.ctx.fillText('10,000K', 280, 540);
        this.ctx.fillText('6,000K', 440, 540);
        this.ctx.fillText('3,000K', 600, 540);

        // Luminosity labels
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('100,000', 75, 90);
        this.ctx.fillText('1,000', 75, 200);
        this.ctx.fillText('1', 75, 310);
        this.ctx.fillText('0.01', 75, 420);
        this.ctx.fillText('0.0001', 75, 510);
    }

    tempToX(temp) {
        const minTemp = Math.log10(3000);
        const maxTemp = Math.log10(30000);
        const logTemp = Math.log10(temp);
        return 720 - ((logTemp - minTemp) / (maxTemp - minTemp)) * 640;
    }

    lumToY(lum) {
        const minLum = Math.log10(0.0001);
        const maxLum = Math.log10(100000);
        const logLum = Math.log10(lum);
        return 520 - ((logLum - minLum) / (maxLum - minLum)) * 440;
    }

    drawStar(star, size = 6, alpha = 1) {
        const x = this.tempToX(star.temp);
        const y = this.lumToY(star.lum);

        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = star.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        this.ctx.fill();

        // Add glow effect
        this.ctx.shadowColor = star.color;
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 0.7, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAxes();
    }

    showMainSequence() {
        this.currentView = 'main';
        this.clearCanvas();

        const mainSequenceStars = this.stars.filter(s => s.type === 'main');
        mainSequenceStars.forEach(star => this.drawStar(star, 8));

        this.updateInfo('Main Sequence Stars',
            'These stars are in the stable phase of their lives, fusing hydrogen into helium in their cores. They form a diagonal band from hot, bright blue stars to cool, dim red stars. Our Sun is a main sequence star.');

        this.announceChange(`Showing ${mainSequenceStars.length} main sequence stars`);
    }

    showGiants() {
        this.currentView = 'giants';
        this.clearCanvas();

        const giantStars = this.stars.filter(s => s.type === 'giant' || s.type === 'supergiant');
        giantStars.forEach(star => this.drawStar(star, 12));

        this.updateInfo('Giant and Supergiant Stars',
            'These are evolved stars that have exhausted hydrogen in their cores and expanded dramatically. Red giants and supergiants are much larger and brighter than main sequence stars of the same temperature.');

        this.announceChange(`Showing ${giantStars.length} giant and supergiant stars`);
    }

    showDwarfs() {
        this.currentView = 'dwarfs';
        this.clearCanvas();

        const dwarfStars = this.stars.filter(s => s.type === 'dwarf');
        dwarfStars.forEach(star => this.drawStar(star, 6));

        this.updateInfo('White Dwarf Stars',
            'These are the remnants of low to medium mass stars. They are very hot but small and dim. White dwarfs slowly cool over billions of years, eventually becoming cold black dwarfs.');

        this.announceChange(`Showing ${dwarfStars.length} white dwarf stars`);
    }

    showAll() {
        this.currentView = 'all';
        this.clearCanvas();

        this.stars.forEach(star => {
            const size = star.type === 'giant' || star.type === 'supergiant' ? 10 :
                star.type === 'main' ? 8 : 6;
            this.drawStar(star, size);
        });

        this.updateInfo('All Star Types',
            'The complete Hertzsprung-Russell diagram showing all star types: main sequence, giants, supergiants, and white dwarfs. Notice how different types occupy different regions of the diagram.');

        this.announceChange(`Showing all ${this.stars.length} stars`);
    }

    animateEvolution() {
        // Stop any current animation
        if (this.isAnimating) {
            this.isAnimating = false;
            return;
        }

        this.currentView = 'evolution';
        this.isAnimating = true;
        this.animationFrame = 0;

        // Define the evolutionary path of a Sun-like star
        const evolutionSteps = [
            { temp: 5778, lum: 1, phase: 'Main Sequence (Current Sun)', age: '4.6 billion years' },
            { temp: 5400, lum: 2.2, phase: 'Slightly Evolved Sun', age: '8 billion years' },
            { temp: 5000, lum: 4, phase: 'Subgiant Phase', age: '9 billion years' },
            { temp: 4000, lum: 1000, phase: 'Red Giant Phase', age: '9.5 billion years' },
            { temp: 3500, lum: 2000, phase: 'Red Giant Tip', age: '9.7 billion years' },
            { temp: 6000, lum: 0.0005, phase: 'White Dwarf Remnant', age: '10+ billion years' }
        ];

        // Update button states
        document.querySelectorAll('.control-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        document.getElementById('evolution-btn').classList.add('active');
        document.getElementById('evolution-btn').setAttribute('aria-pressed', 'true');

        const animateStep = () => {
            if (!this.isAnimating || this.animationFrame >= evolutionSteps.length) {
                this.isAnimating = false;
                this.announceChange('Star evolution animation completed');
                return;
            }

            this.clearCanvas();

            // Draw faded previous steps (history trail)
            for (let i = 0; i < this.animationFrame; i++) {
                const step = evolutionSteps[i];
                const x = this.tempToX(step.temp);
                const y = this.lumToY(step.lum);

                // Draw faded star positions
                this.ctx.globalAlpha = 0.3 - (this.animationFrame - i) * 0.05; // Fade with distance
                this.ctx.fillStyle = '#ffff44';
                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            }

            // Draw dotted connecting line (evolutionary path)
            if (this.animationFrame > 0) {
                this.ctx.strokeStyle = 'rgba(255, 255, 68, 0.6)';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]); // Dotted line
                this.ctx.beginPath();

                for (let i = 0; i <= this.animationFrame; i++) {
                    const step = evolutionSteps[i];
                    const x = this.tempToX(step.temp);
                    const y = this.lumToY(step.lum);

                    if (i === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.stroke();
                this.ctx.setLineDash([]); // Reset to solid line
            }

            // Draw current star position with glow
            const currentStep = evolutionSteps[this.animationFrame];
            const x = this.tempToX(currentStep.temp);
            const y = this.lumToY(currentStep.lum);

            // Glow effect
            this.ctx.shadowColor = '#ffff44';
            this.ctx.shadowBlur = 15;
            this.ctx.fillStyle = '#ffff44';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Add pulsing effect
            const pulseSize = 8 + Math.sin(Date.now() * 0.005) * 2;
            this.ctx.globalAlpha = 0.7;
            this.ctx.beginPath();
            this.ctx.arc(x, y, pulseSize, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;

            // Update info panel
            this.updateInfo(
                `Stellar Evolution: ${currentStep.phase}`,
                `Age: ${currentStep.age}. Temperature: ${currentStep.temp.toLocaleString()}K, Luminosity: ${currentStep.lum} solar units. This animation shows how our Sun will evolve over billions of years, moving through different regions of the H-R diagram.`
            );

            // Announce current step for screen readers
            this.announceChange(`Evolution step ${this.animationFrame + 1}: ${currentStep.phase} at ${currentStep.age}`);

            this.animationFrame++;

            // Continue animation after delay
            setTimeout(animateStep, 2500); // 2.5 second delay between steps
        };

        // Start the animation
        this.announceChange('Starting star evolution animation - showing the life cycle of a Sun-like star');
        animateStep();
    }

    updateInfo(title, description) {
        this.infoTitle.textContent = title;
        this.infoDescription.textContent = description;
    }

    // Data table methods
    populateDataTable() {
        this.renderTable(this.stars);
    }

    renderTable(stars) {
        this.tableBody.innerHTML = '';

        stars.forEach(star => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${star.name}</td>
                <td>${star.temp.toLocaleString()}</td>
                <td>${star.lum}</td>
                <td class="star-type-${star.type}">${star.typeLabel}</td>
                <td style="color: ${star.color}; font-weight: bold;">■ ${star.color}</td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    filterTable() {
        const filterValue = this.typeFilter.value;
        const filteredStars = filterValue === 'all' ?
            this.stars :
            this.stars.filter(star => star.type === filterValue);

        this.renderTable(filteredStars);
        this.announceChange(`Table filtered to show ${filteredStars.length} stars`);
    }

    handleSort(e) {
        const button = e.target;
        const column = button.dataset.column;

        // Toggle sort direction
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        // Update ARIA attributes
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.parentElement.setAttribute('aria-sort', 'none');
        });
        button.parentElement.setAttribute('aria-sort', this.sortDirection === 'asc' ? 'ascending' : 'descending');

        // Sort data
        const sortedStars = [...this.stars].sort((a, b) => {
            let aVal, bVal;
            switch (column) {
                case 'name':
                    aVal = a.name;
                    bVal = b.name;
                    break;
                case 'temp':
                    aVal = a.temp;
                    bVal = b.temp;
                    break;
                case 'lum':
                    aVal = a.lum;
                    bVal = b.lum;
                    break;
                case 'type':
                    aVal = a.typeLabel;
                    bVal = b.typeLabel;
                    break;
                default:
                    return 0;
            }

            if (typeof aVal === 'string') {
                return this.sortDirection === 'asc' ?
                    aVal.localeCompare(bVal) :
                    bVal.localeCompare(aVal);
            } else {
                return this.sortDirection === 'asc' ?
                    aVal - bVal :
                    bVal - aVal;
            }
        });

        this.renderTable(sortedStars);
        this.announceChange(`Table sorted by ${column} in ${this.sortDirection}ending order`);
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Find closest star
        let closestStar = null;
        let minDistance = Infinity;

        this.stars.forEach(star => {
            const starX = this.tempToX(star.temp);
            const starY = this.lumToY(star.lum);
            const distance = Math.sqrt(Math.pow(x - starX, 2) + Math.pow(y - starY, 2));

            if (distance < 20 && distance < minDistance) {
                minDistance = distance;
                closestStar = star;
            }
        });

        if (closestStar) {
            this.showStarDetails(closestStar);
        }
    }

    handleCanvasKeydown(e) {
        // Implement keyboard navigation for canvas
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Show details for first visible star as example
            const visibleStars = this.getVisibleStars();
            if (visibleStars.length > 0) {
                this.showStarDetails(visibleStars[0]);
            }
        }
    }

    getVisibleStars() {
        switch (this.currentView) {
            case 'main':
                return this.stars.filter(s => s.type === 'main');
            case 'giants':
                return this.stars.filter(s => s.type === 'giant' || s.type === 'supergiant');
            case 'dwarfs':
                return this.stars.filter(s => s.type === 'dwarf');
            case 'all':
            default:
                return this.stars;
        }
    }

    showStarDetails(star) {
        this.starName.textContent = star.name;
        this.starDetails.textContent = `Temperature: ${star.temp.toLocaleString()}K, Luminosity: ${star.lum} solar units, Type: ${star.typeLabel}`;
        this.starInfo.style.display = 'block';
        this.announceChange(`Selected star: ${star.name}. ${this.starDetails.textContent}`);
    }
}

// Initialize the accessible HR diagram
document.addEventListener('DOMContentLoaded', () => {
    new AccessibleHRDiagram();
});