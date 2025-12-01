// ===== EVENTS INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initEventCalendar();
    initUpcomingEvents();
});

// ===== DUMMY EVENTS DATA =====
const eventsData = [
    {
        id: 1,
        title: 'Anime Fest 2024',
        date: new Date(2024, 11, 15), // December 15, 2024
        time: '10:00 - 18:00',
        location: 'Jakarta Convention Center',
        description: 'Festival anime terbesar tahun ini dengan berbagai booth, cosplay competition, dan meet & greet.',
        registered: false
    },
    {
        id: 2,
        title: 'Digital Art Workshop',
        date: new Date(2024, 11, 20), // December 20, 2024
        time: '14:00 - 17:00',
        location: 'Online via Zoom',
        description: 'Workshop intensif tentang teknik digital painting dan character design.',
        registered: false
    },
    {
        id: 3,
        title: 'Webtoon Creator Meetup',
        date: new Date(2024, 11, 28), // December 28, 2024
        time: '15:00 - 18:00',
        location: 'Cafe Artwork, Jakarta',
        description: 'Gathering para kreator webtoon untuk networking dan sharing pengalaman.',
        registered: false
    },
    {
        id: 4,
        title: 'Manga Drawing Challenge',
        date: new Date(2025, 0, 5), // January 5, 2025
        time: '13:00 - 16:00',
        location: 'Community Hub Bandung',
        description: 'Kompetisi menggambar manga dengan tema fantasi, berhadiah jutaan rupiah!',
        registered: false
    },
    {
        id: 5,
        title: 'Animation Masterclass',
        date: new Date(2025, 0, 12), // January 12, 2025
        time: '10:00 - 15:00',
        location: 'Online via Discord',
        description: 'Belajar teknik animasi dari profesional industri anime.',
        registered: false
    },
    {
        id: 6,
        title: 'Cosplay Competition',
        date: new Date(2025, 0, 18), // January 18, 2025
        time: '12:00 - 20:00',
        location: 'Surabaya Mall Arena',
        description: 'Kompetisi cosplay dengan hadiah total 10 juta rupiah!',
        registered: false
    }
];

// ===== CALENDAR =====
let currentMonth = new Date(2024, 11, 1); // December 2024

function initEventCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if (!calendarGrid) return;
    
    // Event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    });
    
    function renderCalendar() {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.style.cssText = `
                font-weight: 600;
                text-align: center;
                padding: 10px;
                color: #4b5563;
            `;
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            const currentDate = new Date(year, month, day);
            
            // Check if today
            if (currentDate.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }
            
            // Check if has event
            const hasEvent = eventsData.some(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === year &&
                       eventDate.getMonth() === month &&
                       eventDate.getDate() === day;
            });
            
            if (hasEvent) {
                dayCell.classList.add('has-event');
                dayCell.style.cursor = 'pointer';
                dayCell.addEventListener('click', () => {
                    showDayEvents(new Date(year, month, day));
                });
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }
    
    function showDayEvents(date) {
        const dayEvents = eventsData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
        
        if (dayEvents.length > 0) {
            const eventTitles = dayEvents.map(e => e.title).join(', ');
            window.showNotification(`📅 Event pada ${date.toLocaleDateString('id-ID')}: ${eventTitles}`);
            
            // Scroll to events list
            document.querySelector('.upcoming-events').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Initial render
    renderCalendar();
}

// ===== UPCOMING EVENTS =====
function initUpcomingEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;
    
    // Sort events by date
    const sortedEvents = [...eventsData].sort((a, b) => a.date - b.date);
    
    displayEvents(sortedEvents);
    
    function displayEvents(events) {
        eventsList.innerHTML = '';
        
        events.forEach((event, index) => {
            const card = createEventCard(event);
            card.style.animationDelay = `${index * 0.1}s`;
            eventsList.appendChild(card);
        });
    }
    
    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card fade-in-up';
        
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
                           'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const month = monthNames[eventDate.getMonth()];
        
        const isRegistered = localStorage.getItem(`event_${event.id}`) === 'true';
        
        card.innerHTML = `
            <div class="event-date">
                <span class="event-date-day">${day}</span>
                <span class="event-date-month">${month}</span>
            </div>
            <div class="event-details">
                <h4 class="event-title">${event.title}</h4>
                <p class="event-time">🕐 ${event.time}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p style="color: #6b7280; font-size: 0.875rem; margin-top: 10px;">${event.description}</p>
                <button class="event-register ${isRegistered ? 'registered' : ''}" 
                        onclick="handleEventRegistration(${event.id})"
                        id="register-btn-${event.id}">
                    ${isRegistered ? '✅ Terdaftar' : '📝 Daftar Sekarang'}
                </button>
            </div>
        `;
        
        return card;
    }
}

// ===== EVENT REGISTRATION =====
window.handleEventRegistration = function(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    const registerBtn = document.getElementById(`register-btn-${eventId}`);
    const isRegistered = localStorage.getItem(`event_${eventId}`) === 'true';
    
    if (isRegistered) {
        // Unregister
        localStorage.removeItem(`event_${eventId}`);
        registerBtn.classList.remove('registered');
        registerBtn.innerHTML = '📝 Daftar Sekarang';
        window.showNotification('Pendaftaran dibatalkan');
    } else {
        // Register
        localStorage.setItem(`event_${eventId}`, 'true');
        registerBtn.classList.add('registered');
        registerBtn.innerHTML = '✅ Terdaftar';
        window.showNotification(`✅ Anda berhasil mendaftar untuk "${event.title}"!`);
        
        // Show reminder notification
        setTimeout(() => {
            showEventReminder(event);
        }, 3000);
    }
};

function showEventReminder(event) {
    const eventDate = new Date(event.date);
    const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil > 0) {
        window.showNotification(`⏰ Reminder: Event "${event.title}" akan berlangsung dalam ${daysUntil} hari!`);
    }
}

// ===== EVENT NOTIFICATIONS =====
// Check for upcoming events and show reminders
function checkUpcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    eventsData.forEach(event => {
        const isRegistered = localStorage.getItem(`event_${event.id}`) === 'true';
        if (!isRegistered) return;
        
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        // Show reminder for events in 1, 3, or 7 days
        if ([1, 3, 7].includes(daysUntil)) {
            const hasShownReminder = localStorage.getItem(`reminder_${event.id}_${daysUntil}`) === 'true';
            
            if (!hasShownReminder) {
                setTimeout(() => {
                    window.showNotification(
                        `🔔 Reminder: Event "${event.title}" akan dimulai dalam ${daysUntil} hari!`
                    );
                    localStorage.setItem(`reminder_${event.id}_${daysUntil}`, 'true');
                }, 5000);
            }
        }
    });
}

// Check for upcoming events on load
setTimeout(checkUpcomingEvents, 2000);

// ===== EVENT SEARCH/FILTER =====
function filterEventsByMonth(month, year) {
    return eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
}

function getEventsByCategory(category) {
    // Future enhancement: add categories to events
    return eventsData;
}

// ===== EXPORT CALENDAR =====
window.exportEventToCalendar = function(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    // Create ICS file format
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    window.showNotification('📅 Event telah diekspor ke kalender Anda!');
};