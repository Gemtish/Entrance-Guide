// Global variables
let currentTheme = 'light';
let timerInterval = null;
let currentTime = 25 * 60; // 25 minutes in seconds
let currentMode = 'focus';
let isRunning = false;
let streak = 0;

// Timer modes
const timerModes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    loadNotes();
    loadTasks();
    loadStreak();
    updateTimerDisplay();
    checkStreak();
});

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

// Subjects & Notes Management
function toggleSubject(subjectId) {
    const content = document.getElementById(subjectId + '-content');
    const header = content.previousElementSibling;
    const arrow = header.querySelector('span:last-child');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        arrow.textContent = '▼';
    } else {
        content.classList.add('active');
        arrow.textContent = '▲';
    }
}

function saveNotes(subjectId, notes) {
    localStorage.setItem('notes_' + subjectId, notes);
}

function loadNotes() {
    const subjects = ['math', 'physics', 'ict', 'chemistry'];
    subjects.forEach(subject => {
        const savedNotes = localStorage.getItem('notes_' + subject);
        if (savedNotes) {
            const textarea = document.querySelector(`#${subject}-content textarea`);
            textarea.value = savedNotes;
        }
    });
}

// Tasks Management
function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        renderTasks();
    }
}

function handleTaskKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function toggleTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('tasks-container');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    container.innerHTML = '';
    
    if (tasks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-color); opacity: 0.7;">No tasks yet. Add one above!</p>';
        return;
    }
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button onclick="deleteTask(${task.id})" style="background: var(--danger-color); color: white;">Delete</button>
            </div>
        `;
        container.appendChild(taskElement);
    });
}

function loadTasks() {
    renderTasks();
}

// Pomodoro Timer
function setTimerMode(mode) {
    currentMode = mode;
    currentTime = timerModes[mode];
    
    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateTimerDisplay();
    resetTimer();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('pause-btn').style.display = 'inline-block';
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('pause-btn').style.display = 'none';
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    currentTime = timerModes[currentMode];
    updateTimerDisplay();
    document.getElementById('start-btn').style.display = 'inline-block';
    document.getElementById('pause-btn').style.display = 'none';
}

function updateTimer() {
    currentTime--;
    updateTimerDisplay();
    
    if (currentTime <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('pause-btn').style.display = 'none';
        
        // Show notification
        alert('Time\'s up! 🎉');
        
        // Auto-switch to break after focus
        if (currentMode === 'focus') {
            setTimerMode('shortBreak');
        }
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timer-text').textContent = timeString;
    
    // Update progress circle
    const totalTime = timerModes[currentMode];
    const progress = ((totalTime - currentTime) / totalTime) * 360;
    const circle = document.getElementById('timer-circle');
    circle.style.background = `conic-gradient(var(--primary-color) ${progress}deg, var(--border-color) ${progress}deg)`;
}

// Streak Management
function incrementStreak() {
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    
    if (lastStudyDate !== today) {
        streak++;
        localStorage.setItem('streak', streak.toString());
        localStorage.setItem('lastStudyDate', today);
        updateStreakDisplay();
    }
}

function resetStreak() {
    if (confirm('Are you sure you want to reset your streak?')) {
        streak = 0;
        localStorage.setItem('streak', '0');
        localStorage.removeItem('lastStudyDate');
        updateStreakDisplay();
    }
}

function updateStreakDisplay() {
    document.getElementById('streak-number').textContent = streak;
}

function loadStreak() {
    streak = parseInt(localStorage.getItem('streak') || '0');
    updateStreakDisplay();
}

function checkStreak() {
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    // Reset streak if more than 1 day has passed
    if (lastStudyDate && lastStudyDate !== today && lastStudyDate !== yesterdayString) {
        streak = 0;
        localStorage.setItem('streak', '0');
        updateStreakDisplay();
    }
}

// AI Assistant using Google Gemini API
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    
    // Show loading
    document.getElementById('loading').style.display = 'block';
    
    try {
        // Use Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAuMzzjFmQLqR9UboaUDHWJt6DyIHd-ZIs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful study assistant. Help the student with their question: ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            
            if (response.status === 400) {
                addMessageToChat("Invalid request. Please check your API key.", 'ai');
            } else if (response.status === 401) {
                addMessageToChat("Authentication failed. Please check your Gemini API key.", 'ai');
            } else if (response.status === 403) {
                addMessageToChat("Access forbidden. Please check your API key permissions.", 'ai');
            } else if (response.status === 429) {
                addMessageToChat("Rate limit exceeded. Please wait a moment before trying again.", 'ai');
            } else {
                addMessageToChat(`API Error (${response.status}): ${errorText}`, 'ai');
            }
            return;
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        let aiResponse;
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            aiResponse = data.candidates[0].content.parts[0].text;
        } else {
            aiResponse = "I'm sorry, I couldn't generate a response. Please try again.";
        }
        
        addMessageToChat(aiResponse, 'ai');
        
    } catch (error) {
        console.error('AI Error:', error);
        addMessageToChat("I'm having trouble connecting right now. Please check your internet connection and try again.", 'ai');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const senderName = sender === 'user' ? 'You' : 'AI Assistant';
    
    // Convert markdown to HTML
    const formattedMessage = formatMarkdown(message);
    messageDiv.innerHTML = `<strong>${senderName}:</strong> ${formattedMessage}`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMarkdown(text) {
    // Convert markdown formatting to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
        .replace(/`(.*?)`/g, '<code>$1</code>')            // Code
        .replace(/\n/g, '<br>')                            // Line breaks
        .replace(/\* (.*?)(?=\n|$)/g, '<li>$1</li>')       // List items
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');        // Wrap lists
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize timer display
updateTimerDisplay();
