// ===== GALLERY INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initProjectsGallery();
    initVotingSystem();
});

// ===== DUMMY PROJECT DATA =====
const projectsData = [
    { id: 1, title: 'Sunset Dreams', author: 'ArtistPro', category: 'art', votes: 145, image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, title: 'The Last Hero', author: 'WebtoonMaster', category: 'webtoon', votes: 230, image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, title: 'Sakura Spring', author: 'MangaLover', category: 'manga', votes: 189, image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, title: 'Battle Scene', author: 'AnimatorX', category: 'animasi', votes: 267, image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 5, title: 'Character Design', author: 'DesignerArt', category: 'art', votes: 178, image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 6, title: 'Fantasy World', author: 'WorldBuilder', category: 'webtoon', votes: 203, image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { id: 7, title: 'Mecha Robot', author: 'TechArtist', category: 'art', votes: 156, image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 8, title: 'Love Story', author: 'RomanceWriter', category: 'manga', votes: 198, image: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
    { id: 9, title: 'Action Sequence', author: 'ActionMaster', category: 'animasi', votes: 221, image: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)' },
    { id: 10, title: 'Chibi Collection', author: 'CuteArtist', category: 'art', votes: 167, image: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' },
    { id: 11, title: 'Adventure Time', author: 'AdventureSeeker', category: 'webtoon', votes: 192, image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 12, title: 'Epic Battle', author: 'BattleArtist', category: 'manga', votes: 214, image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
];

// ===== PROJECTS GALLERY =====
function initProjectsGallery() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!projectsGrid) return;
    
    let currentFilter = 'all';
    
    // Display all projects initially
    displayProjects(projectsData);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter category
            currentFilter = btn.dataset.filter;
            
            // Filter and display projects
            const filteredProjects = currentFilter === 'all' 
                ? projectsData 
                : projectsData.filter(p => p.category === currentFilter);
            
            displayProjects(filteredProjects);
        });
    });
    
    function displayProjects(projects) {
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            projectsGrid.appendChild(card);
        });
    }
    
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        
        card.innerHTML = `
            <div class="project-image" style="background: ${project.image};">
                <div class="project-overlay">
                    <button onclick="openProjectModal(${project.id})">Lihat Detail</button>
                </div>
            </div>
            <div class="project-info">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-author">By: ${project.author}</p>
            </div>
        `;
        
        return card;
    }
    
    function getCategoryName(category) {
        const categories = {
            'animasi': 'Animasi',
            'art': 'Digital Art',
            'webtoon': 'Webtoon',
            'manga': 'Manga'
        };
        return categories[category] || category;
    }
}

// ===== PROJECT MODAL =====
window.openProjectModal = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="padding: 20px;">
            <div style="height: 400px; background: ${project.image}; border-radius: 1rem; margin-bottom: 20px;"></div>
            <span style="display: inline-block; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
                         color: #1f2937; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; 
                         font-weight: 600; margin-bottom: 15px;">${getCategoryName(project.category)}</span>
            <h2 style="font-size: 2rem; margin-bottom: 10px;">${project.title}</h2>
            <p style="color: #6b7280; margin-bottom: 20px;">By: ${project.author}</p>
            <p style="line-height: 1.8; color: #4b5563; margin-bottom: 20px;">
                Ini adalah karya luar biasa yang menampilkan detail sempurna dan kreativitas tinggi. 
                Setiap elemen dirancang dengan cermat untuk menciptakan harmoni visual yang memukau.
            </p>
            <div style="display: flex; gap: 15px; align-items: center;">
                <button onclick="voteProject(${project.id})" 
                        style="background: linear-gradient(135deg, #7fddcc 0%, #5cbaa8 100%); 
                               color: white; padding: 0.75rem 2rem; border-radius: 9999px; 
                               font-weight: 600; border: none; cursor: pointer;">
                    ❤️ Vote (${project.votes})
                </button>
                <button onclick="shareProject(${project.id})" 
                        style="background: #f3f4f6; color: #4b5563; padding: 0.75rem 2rem; 
                               border-radius: 9999px; font-weight: 600; border: none; cursor: pointer;">
                    📤 Share
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    function getCategoryName(category) {
        const categories = {
            'animasi': 'Animasi',
            'art': 'Digital Art',
            'webtoon': 'Webtoon',
            'manga': 'Manga'
        };
        return categories[category] || category;
    }
};

// Close modal
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('projectModal').classList.remove('active');
});

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        document.getElementById('projectModal').classList.remove('active');
    }
});

// ===== VOTING SYSTEM =====
function initVotingSystem() {
    const votingGrid = document.getElementById('votingGrid');
    if (!votingGrid) return;
    
    // Get top 6 projects for voting
    const topProjects = [...projectsData]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 6);
    
    displayVotingCards(topProjects);
    
    function displayVotingCards(projects) {
        votingGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const card = createVotingCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            votingGrid.appendChild(card);
        });
    }
    
    function createVotingCard(project) {
        const card = document.createElement('div');
        card.className = 'voting-card fade-in-up';
        
        const isVoted = localStorage.getItem(`voted_${project.id}`) === 'true';
        
        card.innerHTML = `
            <div class="voting-image" style="background: ${project.image};"></div>
            <div class="voting-info">
                <h4 class="voting-title">${project.title}</h4>
                <p class="voting-author">By: ${project.author}</p>
                <div class="voting-actions">
                    <button class="vote-btn ${isVoted ? 'voted' : ''}" 
                            onclick="handleVote(${project.id})" 
                            id="vote-btn-${project.id}">
                        ${isVoted ? '❤️ Voted' : '🤍 Vote'}
                    </button>
                    <span class="vote-count" id="vote-count-${project.id}">${project.votes}</span>
                </div>
            </div>
        `;
        
        return card;
    }
}

// ===== VOTE HANDLING =====
window.handleVote = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const voteBtn = document.getElementById(`vote-btn-${projectId}`);
    const voteCount = document.getElementById(`vote-count-${projectId}`);
    const isVoted = localStorage.getItem(`voted_${projectId}`) === 'true';
    
    if (isVoted) {
        // Unvote
        project.votes--;
        localStorage.removeItem(`voted_${projectId}`);
        voteBtn.classList.remove('voted');
        voteBtn.innerHTML = '🤍 Vote';
        window.showNotification('Vote dibatalkan');
    } else {
        // Vote
        project.votes++;
        localStorage.setItem(`voted_${projectId}`, 'true');
        voteBtn.classList.add('voted');
        voteBtn.innerHTML = '❤️ Voted';
        window.showNotification('✅ Terima kasih sudah voting!');
    }
    
    voteCount.textContent = project.votes;
};

window.voteProject = function(projectId) {
    handleVote(projectId);
    // Update modal
    setTimeout(() => {
        openProjectModal(projectId);
    }, 100);
};

window.shareProject = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    window.showNotification(`📤 Link karya "${project.title}" telah disalin!`);
};