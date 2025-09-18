<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Study Environment Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --bg-color: #ffffff;
            --text-color: #1f2937;
            --card-bg: #f9fafb;
            --border-color: #e5e7eb;
            --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        [data-theme="dark"] {
            --bg-color: #111827;
            --text-color: #f9fafb;
            --card-bg: #1f2937;
            --border-color: #374151;
            --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            transition: all 0.3s ease;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px 0;
            border-bottom: 2px solid var(--border-color);
        }

        .header h1 {
            color: var(--primary-color);
            font-size: 2.5rem;
            font-weight: 700;
        }

        .theme-toggle {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .theme-toggle:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }

        .card:hover {
            box-shadow: var(--shadow-lg);
            transform: translateY(-2px);
        }

        .card h2 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .icon {
            width: 24px;
            height: 24px;
        }

        /* Subjects Section */
        .subject-item {
            margin-bottom: 15px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
        }

        .subject-header {
            background: var(--primary-color);
            color: white;
            padding: 12px 15px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }

        .subject-header:hover {
            background: var(--secondary-color);
        }

        .subject-content {
            padding: 15px;
            background: var(--card-bg);
            display: none;
        }

        .subject-content.active {
            display: block;
        }

        .notes-textarea {
            width: 100%;
            min-height: 100px;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-color);
            color: var(--text-color);
            resize: vertical;
            font-family: inherit;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background-color: var(--card-bg);
            margin: 3% auto;
            padding: 0;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            width: 85%;
            max-width: 900px;
            max-height: 85vh;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
            animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(20px);
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
            position: relative;
            overflow: hidden;
        }

        .modal-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
            pointer-events: none;
        }

        .modal-header h3 {
            margin: 0;
            font-size: 1.6rem;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
        }

        .close {
            color: white;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            position: relative;
            z-index: 1;
        }

        .close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1) rotate(90deg);
        }

        .modal-body {
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        }

        .modal-textarea {
            width: 100%;
            min-height: 400px;
            padding: 20px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            background: var(--bg-color);
            color: var(--text-color);
            resize: vertical;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 15px;
            line-height: 1.8;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        /* Rich text editor styles */
        .rich-text-editor {
            width: 100%;
            min-height: 400px;
            padding: 20px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            background: var(--bg-color);
            color: var(--text-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 15px;
            line-height: 1.8;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            outline: none;
            overflow-y: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .rich-text-editor:empty:before {
            content: attr(placeholder);
            color: #999;
            font-style: italic;
        }

        .rich-text-editor:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .rich-text-editor strong {
            font-weight: bold !important;
            color: var(--primary-color) !important;
        }

        .rich-text-editor em {
            font-style: italic !important;
            color: var(--secondary-color) !important;
        }

        .rich-text-editor h1 {
            font-size: 1.8em !important;
            font-weight: bold !important;
            color: var(--primary-color) !important;
            margin: 20px 0 15px 0 !important;
            display: block !important;
        }

        .rich-text-editor h2 {
            font-size: 1.4em !important;
            font-weight: bold !important;
            color: var(--primary-color) !important;
            margin: 15px 0 10px 0 !important;
            display: block !important;
        }

        .rich-text-editor h3 {
            font-size: 1.2em !important;
            font-weight: bold !important;
            color: var(--secondary-color) !important;
            margin: 12px 0 8px 0 !important;
            display: block !important;
        }

        .rich-text-editor p {
            margin: 8px 0 !important;
            display: block !important;
        }

        .rich-text-editor ul {
            margin: 10px 0 !important;
            padding-left: 25px !important;
            display: block !important;
        }

        .rich-text-editor ol {
            margin: 10px 0 !important;
            padding-left: 25px !important;
            display: block !important;
        }

        .rich-text-editor li {
            margin: 5px 0 !important;
            display: list-item !important;
        }

        /* Formatting toolbar */
        .formatting-toolbar {
            display: flex;
            gap: 8px;
            margin-bottom: 15px;
            padding: 10px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
        }

        .format-btn {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .format-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .format-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        /* Style for formatted text display */
        .formatted-text {
            font-weight: 600;
            color: var(--primary-color);
        }

        /* Enhanced textarea with better formatting */
        .modal-textarea::selection {
            background: rgba(99, 102, 241, 0.2);
        }

        .modal-textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Text formatting styles for notes */
        .modal-textarea::placeholder {
            color: var(--text-color);
            opacity: 0.6;
            font-style: italic;
        }

        /* Custom styling for formatted text */
        .formatted-notes {
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        /* Bold text styling */
        .bold-text {
            font-weight: bold;
            color: var(--primary-color);
        }

        /* Enhanced template button */
        .template-button {
            background: linear-gradient(135deg, var(--success-color), #059669);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }

        .template-button:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(16, 185, 129, 0.4);
        }

        .template-button:active {
            transform: translateY(0);
        }

        .note-template {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(99, 102, 241, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 13px;
            color: var(--text-color);
            opacity: 0.9;
            position: relative;
        }

        .note-template::before {
            content: '💡';
            position: absolute;
            top: -8px;
            left: 15px;
            background: var(--card-bg);
            padding: 0 8px;
            font-size: 16px;
        }

        .template-button {
            background: var(--success-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            margin-bottom: 10px;
            transition: all 0.3s ease;
        }

        .template-button:hover {
            background: #059669;
            transform: translateY(-1px);
        }

        /* Tasks Section */
        .task-input {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .task-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-color);
            color: var(--text-color);
            font-size: 1rem;
        }

        .btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background: var(--secondary-color);
            transform: translateY(-1px);
        }

        .btn-success {
            background: var(--success-color);
        }

        .btn-warning {
            background: var(--warning-color);
        }

        .btn-danger {
            background: var(--danger-color);
        }

        .task-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 10px;
            background: var(--bg-color);
            transition: all 0.3s ease;
        }

        .task-item.completed {
            opacity: 0.6;
            text-decoration: line-through;
        }

        .task-text {
            flex: 1;
        }

        .task-actions {
            display: flex;
            gap: 5px;
        }

        .task-actions button {
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        }

        /* Pomodoro Timer */
        .timer-display {
            text-align: center;
            margin: 20px 0;
        }

        .timer-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: conic-gradient(var(--primary-color) 0deg, var(--border-color) 0deg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            position: relative;
            transition: all 0.3s ease;
        }

        .timer-text {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text-color);
        }

        .timer-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        .timer-mode {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .mode-btn {
            padding: 8px 16px;
            border: 1px solid var(--border-color);
            background: var(--card-bg);
            color: var(--text-color);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .mode-btn.active {
            background: var(--primary-color);
            color: white;
        }

        /* Streak Tracker */
        .streak-display {
            text-align: center;
            margin: 20px 0;
        }

        .streak-number {
            font-size: 3rem;
            font-weight: bold;
            color: var(--success-color);
            margin-bottom: 10px;
        }

        .streak-text {
            font-size: 1.2rem;
            color: var(--text-color);
        }

        .streak-actions {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }

        /* AI Assistant */
        .chat-container {
            height: 400px;
            display: flex;
            flex-direction: column;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-color);
            margin-bottom: 10px;
        }

        .message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 6px;
            max-width: 80%;
        }

        .message.user {
            background: var(--primary-color);
            color: white;
            margin-left: auto;
        }

        .message.ai {
            background: var(--card-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
        }

        .message code {
            background: var(--border-color);
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        .message ul {
            margin: 10px 0;
            padding-left: 20px;
        }

        .message li {
            margin: 5px 0;
        }

        .chat-input {
            display: flex;
            gap: 10px;
        }

        .chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: var(--bg-color);
            color: var(--text-color);
        }

        .loading {
            display: none;
            text-align: center;
            color: var(--primary-color);
            font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            .header h1 {
                font-size: 2rem;
            }

            .grid {
                grid-template-columns: 1fr;
            }

            .timer-circle {
                width: 150px;
                height: 150px;
            }

            .timer-text {
                font-size: 1.5rem;
            }

            .streak-number {
                font-size: 2.5rem;
            }

            .task-input {
                flex-direction: column;
            }

            .chat-input {
                flex-direction: column;
            }
        }

        @media (max-width: 480px) {
            .header {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .timer-circle {
                width: 120px;
                height: 120px;
            }

            .timer-text {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📚 Study Environment Dashboard</h1>
            <button class="theme-toggle" onclick="toggleTheme()">🌙 Dark Mode</button>
        </header>

        <div class="grid">
            <!-- Subjects & Notes Section -->
            <div class="card">
                <h2><span class="icon">📖</span> Subjects & Notes</h2>
                <div id="subjects-container">
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('math', 'Mathematics')">
                            <span>Mathematics</span>
                            <span>📝</span>
                        </div>
                    </div>
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('physics', 'Physics')">
                            <span>Physics</span>
                            <span>📝</span>
                        </div>
                    </div>
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('sat', 'SAT')">
                            <span>SAT</span>
                            <span>📝</span>
                        </div>
                    </div>
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('biology', 'Biology')">
                            <span>Biology</span>
                            <span>📝</span>
                        </div>
                    </div>
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('english', 'English')">
                            <span>English</span>
                            <span>📝</span>
                        </div>
                    </div>
                    <div class="subject-item">
                        <div class="subject-header" onclick="openSubjectModal('chemistry', 'Chemistry')">
                            <span>Chemistry</span>
                            <span>📝</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tasks / To-Do List -->
            <div class="card">
                <h2><span class="icon">✅</span> Tasks & To-Do</h2>
                <div class="task-input">
                    <input type="text" id="task-input" placeholder="Add a new task..." onkeypress="handleTaskKeyPress(event)">
                    <button class="btn" onclick="addTask()">Add Task</button>
                </div>
                <div id="tasks-container"></div>
            </div>

            <!-- Pomodoro Timer -->
            <div class="card">
                <h2><span class="icon">🍅</span> Pomodoro Timer</h2>
                <div class="timer-mode">
                    <button class="mode-btn active" onclick="setTimerMode('focus')">Focus (25m)</button>
                    <button class="mode-btn" onclick="setTimerMode('shortBreak')">Short Break (5m)</button>
                    <button class="mode-btn" onclick="setTimerMode('longBreak')">Long Break (15m)</button>
                    <button class="mode-btn" onclick="setTimerMode('studySession')">Study (50m)</button>
                    <button class="mode-btn" onclick="setTimerMode('studyBreak')">Break (10m)</button>
                </div>
                <div class="timer-display">
                    <div class="timer-circle" id="timer-circle">
                        <div class="timer-text" id="timer-text">25:00</div>
                    </div>
                </div>
                <div class="timer-controls">
                    <button class="btn btn-success" id="start-btn" onclick="startTimer()">Start</button>
                    <button class="btn btn-warning" id="pause-btn" onclick="pauseTimer()" style="display: none;">Pause</button>
                    <button class="btn btn-danger" onclick="resetTimer()">Reset</button>
                </div>
            </div>

            <!-- Streak Tracker -->
            <div class="card">
                <h2><span class="icon">🔥</span> Study Streak</h2>
                <div class="streak-display">
                    <div class="streak-number" id="streak-number">0</div>
                    <div class="streak-text">Day Streak</div>
                </div>
                <div class="streak-actions">
                    <button class="btn btn-success" onclick="incrementStreak()">Study Today</button>
                    <button class="btn btn-danger" onclick="resetStreak()">Reset Streak</button>
                </div>
            </div>

            <!-- AI Assistant -->
            <div class="card">
                <h2><span class="icon">🤖</span> AI Study Assistant</h2>
                <div class="chat-container">
                    <div class="chat-messages" id="chat-messages">
                        <div class="message ai">
                            <strong>AI Assistant:</strong> Hello! I'm here to help you with your studies. Ask me anything about your subjects, study techniques, or general questions!
                        </div>
                    </div>
                    <div class="loading" id="loading">AI is thinking...</div>
                    <div class="chat-input">
                        <input type="text" id="chat-input" placeholder="Ask me anything..." onkeypress="handleChatKeyPress(event)">
                        <button class="btn" onclick="sendMessage()">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Subject Notes Modal -->
    <div id="subjectModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">Subject Notes</h3>
                <span class="close" onclick="closeSubjectModal()">&times;</span>
            </div>
            <div class="modal-body">
                <button class="template-button" onclick="insertTemplate()">📋 Insert Note Template</button>
                <div class="note-template">
                    <strong>💡 Tip:</strong> Use the template button above to get started with a structured note format!
                </div>
                <div class="formatting-toolbar">
                    <button class="format-btn" onclick="formatText('bold')" title="Bold">B</button>
                    <button class="format-btn" onclick="formatText('italic')" title="Italic">I</button>
                    <button class="format-btn" onclick="formatText('underline')" title="Underline">U</button>
                    <button class="format-btn" onclick="insertBulletList()" title="Bullet List">•</button>
                    <button class="format-btn" onclick="insertNumberedList()" title="Numbered List">1.</button>
                </div>
                <div id="modalTextarea" class="rich-text-editor" contenteditable="true" placeholder="Start typing your notes here..." oninput="saveNotesFromModal()"></div>
            </div>
        </div>
    </div>

    <script>
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
            longBreak: 15 * 60,
            studySession: 50 * 60,
            studyBreak: 10 * 60
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

        // Global variables for modal
        let currentSubjectId = '';

        // Subjects & Notes Management
        function openSubjectModal(subjectId, subjectName) {
            currentSubjectId = subjectId;
            document.getElementById('modalTitle').textContent = subjectName + ' Notes';
            document.getElementById('subjectModal').style.display = 'block';
            
            // Load existing notes
            const savedNotes = localStorage.getItem('notes_' + subjectId);
            const editor = document.getElementById('modalTextarea');
            editor.innerHTML = savedNotes || '';
            
            // Focus on editor
            setTimeout(() => editor.focus(), 100);
        }

        function closeSubjectModal() {
            document.getElementById('subjectModal').style.display = 'none';
            currentSubjectId = '';
        }

        function saveNotesFromModal() {
            if (currentSubjectId) {
                const editor = document.getElementById('modalTextarea');
                const notes = editor.innerHTML;
                localStorage.setItem('notes_' + currentSubjectId, notes);
            }
        }

        function formatText(command) {
            document.execCommand(command, false, null);
            saveNotesFromModal();
        }

        function insertBulletList() {
            document.execCommand('insertUnorderedList', false, null);
            saveNotesFromModal();
        }

        function insertNumberedList() {
            document.execCommand('insertOrderedList', false, null);
            saveNotesFromModal();
        }

        function insertTemplate() {
            const editor = document.getElementById('modalTextarea');
            
            // Clear the editor first
            editor.innerHTML = '';
            
            // Create the template content with improved formatting
            const template = `<h1>📚 Study Notes</h1>

<p><h2>📖 Topic:</h2> [Enter Topic Name Here]</p>
<p><strong>📅 Date:</strong> ${new Date().toLocaleDateString()}</p>

<h3>🎯 Key Concepts:</h3>
<ul>
<li>[Concept 1: Briefly describe]</li>
<li>[Concept 2: Briefly describe]</li>
<li>[Concept 3: Briefly describe]</li>
</ul>

<h3>⭐ Important Points:</h3>
<ul>
<li>[Point 1: Elaborate on significance]</li>
<li>[Point 2: Elaborate on significance]</li>
<li>[Point 3: Elaborate on significance]</li>
</ul>

<h3>💡 Examples/Applications:</h3>
<ol>
<li>[Example 1: Detail the scenario or problem]</li>
<li>[Example 2: Detail the scenario or problem]</li>
</ol>

<h3>📝 Summary/Takeaways:</h3>
<ul>
<li>[Summary point 1]</li>
<li>[Summary point 2]</li>
</ul>

<h3>❓ Questions for Review/Further Study:</h3>
<ol>
<li>[Question 1]</li>
<li>[Question 2]</li>
</ol>

<h3>📋 Additional Notes:</h3>
<p>[Add any additional notes, formulas, diagrams, or important information here. Use <strong>bold</strong> and <em>italic</em> for emphasis.]</p>`;
            
            // Set the template to the editor
            editor.innerHTML = template;
            
            saveNotesFromModal();
            editor.focus();
        }

        function saveNotes(subjectId, notes) {
            localStorage.setItem('notes_' + subjectId, notes);
        }

        function loadNotes() {
            // Notes are now loaded when modal opens
            // This function is kept for compatibility
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            const modal = document.getElementById('subjectModal');
            if (event.target === modal) {
                closeSubjectModal();
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeSubjectModal();
            }
        });

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

        // Real AI Assistant using Google Gemini API
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
    </script>
</body>
</html>
