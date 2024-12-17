// Function to show confirmation dialog
function showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const messageEl = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmDelete');
    const cancelBtn = document.getElementById('cancelDelete');

    if (!modal || !titleEl || !messageEl || !confirmBtn || !cancelBtn) {
        console.error('Required elements for confirmation dialog not found');
        return;
    }

    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.style.display = 'block';

    const cleanup = () => {
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleConfirm = () => {
        onConfirm();
        modal.style.display = 'none';
        cleanup();
    };

    const handleCancel = () => {
        modal.style.display = 'none';
        cleanup();
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
}

document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const modal = document.getElementById('modal');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const categoryInput = document.getElementById('categoryInput');
    const tabs = document.getElementById('tabs');
    const content = document.getElementById('content');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const aiContainer = document.querySelector('.ai-input-container');
    const goalInput = document.getElementById('goalInput');
    const generateTasksBtn = document.getElementById('generateTasks');
    const loadingIndicator = document.querySelector('.loading');
    const languageSelect = document.getElementById('languageSelect');

    // State
    let categories = [];
    let activeCategory = null;
    let currentMode = 'simple';
    let currentLanguage = 'en';  // Set default language to English
    let currentTranslation = null;

    // Load saved data
    async function loadFromStorage() {
        chrome.storage.local.get(['categories', 'isFirstInstall'], (result) => {
            if (result.categories) {
                categories = result.categories;
                if (categories.length > 0) {
                    activeCategory = categories[0].id;
                }
            } else if (result.isFirstInstall === undefined) {
                // First installation - add default categories and tasks
                const defaultCategories = [
                    {
                        id: 'daily',
                        name: 'يومية',
                        tasks: [
                            { id: 'call-mom', text: '_callMom_', completed: false, subtasks: [] },
                            { id: 'be-better', text: '_beBetter_', completed: false, subtasks: [] },
                            { id: 'remember-god', text: '_rememberGod_', completed: false, subtasks: [] }
                        ]
                    },
                    { id: 'work', name: 'عمل', tasks: [] },
                    { id: 'personal', name: 'شخصي', tasks: [] },
                    { id: 'priorities', name: 'أولويات', tasks: [] }
                ];
                
                categories = defaultCategories;
                activeCategory = 'daily';
                
                // Save the default categories and mark as installed
                chrome.storage.local.set({
                    categories: defaultCategories,
                    isFirstInstall: false
                });
            }
            // Only render after translations are loaded
            if (currentTranslation) {
                renderAll();
            }
        });
    }

    // Load translation
    async function loadTranslation() {
        currentTranslation = await getTranslation();
        await updateUILanguage();
        
        // تحديث نصوص الأزرار
        const simpleButton = document.querySelector('.mode-btn[data-mode="simple"]');
        const aiButton = document.querySelector('.mode-btn[data-mode="ai"]');
        
        if (simpleButton) {
            simpleButton.textContent = currentTranslation.simplified;
        }
        if (aiButton) {
            aiButton.textContent = currentTranslation.withAI;
        }
        
        // تحديث باقي العناصر
        renderAll();
    }

    // Setup language selector
    async function setupLanguageSelector() {
        const currentLang = await getCurrentLanguage();
        languageSelect.value = currentLang;

        languageSelect.addEventListener('change', async (e) => {
            await setLanguage(e.target.value);
            await loadTranslation();
            renderAll(); // Re-render the entire UI
        });
    }

    // Event Listeners
    addCategoryBtn.addEventListener('click', () => {
        categoryInput.value = '';
        modal.classList.add('active');
        categoryInput.focus();
    });

    saveBtn.addEventListener('click', saveCategory);
    cancelBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    categoryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveCategory();
    });

    // Mode switching
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            currentMode = mode;
            
            // Update UI
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (mode === 'ai') {
                aiContainer.classList.add('active');
                addCategoryBtn.style.display = 'none';
            } else {
                aiContainer.classList.remove('active');
                addCategoryBtn.style.display = 'block';
            }
        });
    });

    // AI Task Generation
    generateTasksBtn.addEventListener('click', async () => {
        const goal = goalInput.value.trim();
        
        if (!goal) {
            alert(currentTranslation.errors.emptyGoal);
            return;
        }

        loadingIndicator.classList.add('active');
        generateTasksBtn.disabled = true;

        try {
            const tasks = await generateTasksFromGoal(goal);
            const category = {
                id: Date.now().toString(),
                name: tasks.title, // استخدام العنوان كاسم للفئة
                tasks: tasks.tasks.map(task => ({
                    id: Date.now().toString() + Math.random(),
                    text: task.text,
                    description: task.description || '',
                    completed: false,
                    subtasks: (task.subtasks || []).map(subtask => ({
                        id: Date.now().toString() + Math.random(),
                        text: subtask.text,
                        description: subtask.description || '',
                        completed: false
                    }))
                }))
            };

            categories.push(category);
            activeCategory = category.id;
            saveToStorage();
            renderAll();

            goalInput.value = '';
        } catch (error) {
            console.error('Error generating tasks:', error);
            alert(currentTranslation.errors.apiError);
        } finally {
            loadingIndicator.classList.remove('active');
            generateTasksBtn.disabled = false;
        }
    });

    // Functions
    function saveCategory() {
        const name = categoryInput.value.trim();
        if (name) {
            const category = {
                id: Date.now().toString(),
                name: name,
                tasks: []
            };
            categories.push(category);
            activeCategory = category.id;
            saveToStorage();
            renderAll();
            modal.classList.remove('active');
        }
    }

    function renderAll() {
        renderTabs();
        renderContent();
    }

    // تحديث وظيفة renderTabs لدعم التحرير والسحب
    function renderTabs() {
        tabs.innerHTML = '';
        categories.forEach((category) => {
            const tab = document.createElement('div');
            tab.className = `tab ${category.id === activeCategory ? 'active' : ''}`;
            tab.draggable = true;
            
            // Get translated name for default categories
            let displayName = category.name;
            if (category.id === 'priorities' || 
                category.id === 'daily' || 
                category.id === 'work' || 
                category.id === 'personal' || 
                category.id === 'reading') {
                displayName = currentTranslation.defaultCategories[category.id];
            }
            
            tab.innerHTML = `
                <span class="tab-name">${displayName}</span>
                <button class="delete-btn">×</button>
            `;
            
            // تحرير اسم التبويب
            const nameSpan = tab.querySelector('.tab-name');
            nameSpan.addEventListener('dblclick', (e) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = category.name;
                input.className = 'edit-input';
                
                nameSpan.replaceWith(input);
                input.focus();
                
                input.addEventListener('blur', finishEditing);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        finishEditing();
                    }
                });
                
                function finishEditing() {
                    const newName = input.value.trim();
                    if (newName && newName !== category.name) {
                        category.name = newName;
                        saveToStorage();
                    }
                    input.replaceWith(nameSpan);
                    renderTabs();
                }
            });
            
            // حذف التبويب
            const deleteBtn = tab.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showConfirmDialog(
                    currentTranslation.confirmDelete.title,
                    currentTranslation.confirmDelete.message.replace('{name}', category.name),
                    () => {
                        deleteCategory(category.id);
                    }
                );
            });
            
            // السحب والإفلات
            tab.addEventListener('dragstart', handleDragStart);
            tab.addEventListener('dragend', handleDragEnd);
            tab.addEventListener('dragover', handleDragOver);
            tab.addEventListener('drop', handleDrop);
            
            tab.addEventListener('click', () => {
                if (category.id !== activeCategory) {
                    activeCategory = category.id;
                    renderAll();
                }
            });
            
            tabs.appendChild(tab);
        });
    }

    // وظيفة إظهار نافذة التأكيد
    // Moved outside DOMContentLoaded

    // تحديث وظيفة handleDrop
    function handleDrop(e) {
        e.preventDefault();
        const dropTarget = e.target.closest('.tab');
        if (dropTarget && draggedItem && dropTarget !== draggedItem) {
            const items = Array.from(tabs.children);
            const draggedIdx = items.indexOf(draggedItem);
            const dropIdx = items.indexOf(dropTarget);
            
            // تحديث مصفوفة التصنيفات
            const [draggedCategory] = categories.splice(draggedIdx, 1);
            categories.splice(dropIdx, 0, draggedCategory);
            
            saveToStorage();
            renderTabs();
        }
        dropTarget?.classList.remove('drag-over');
    }

    function renderContent() {
        content.innerHTML = '';
        
        if (categories.length === 0) {
            content.innerHTML = `<div class="empty-state">${currentTranslation.emptyState.noCategories}</div>`;
            return;
        }

        const activeTab = categories.find(c => c.id === activeCategory);
        if (!activeTab) return;

        const taskInput = document.createElement('div');
        taskInput.className = 'task-input';
        taskInput.innerHTML = `
            <input type="text" placeholder="${currentTranslation.placeholders.addTask}">
            <button>${currentTranslation.buttons.add}</button>
        `;

        const taskList = document.createElement('div');
        taskList.className = 'task-list';

        // Add task input functionality
        const input = taskInput.querySelector('input');
        const addButton = taskInput.querySelector('button');

        const addNewTask = () => {
            const text = input.value.trim();
            if (text) {
                const task = {
                    id: Date.now().toString() + Math.random(),
                    text: text,
                    completed: false,
                    subtasks: []
                };

                const category = categories.find(c => c.id === activeCategory);
                if (category) {
                    category.tasks.push(task);
                    saveToStorage();
                    renderAll();
                }

                input.value = '';
            }
        };

        addButton.addEventListener('click', addNewTask);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addNewTask();
        });

        content.appendChild(taskInput);
        content.appendChild(taskList);

        // Initial render of tasks
        if (activeTab.tasks.length === 0) {
            taskList.innerHTML = `<div class="empty-state">${currentTranslation.emptyState.noTasks}</div>`;
        } else {
            renderTasks(activeTab.tasks, taskList);
        }
    }

    function translateTaskText(text) {
        if (text.startsWith('_') && text.endsWith('_')) {
            const key = text.replace(/_/g, '');
            return currentTranslation.defaultTasks[key] || text;
        }
        return text;
    }

    function renderTasks(tasks, container) {
        // Clear the container first
        container.innerHTML = '';

        // Remove any existing event listeners
        const newContainer = container.cloneNode(false);
        container.parentNode.replaceChild(newContainer, container);
        container = newContainer;

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.draggable = true;
            taskElement.dataset.index = index;

            // Create task header
            const taskHeader = document.createElement('div');
            taskHeader.className = 'task-header';

            const dragHandle = document.createElement('div');
            dragHandle.className = 'task-drag-handle';
            dragHandle.innerHTML = '⋮';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;

            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = translateTaskText(task.text);

            // Create info button for task description
            if (task.description) {
                const infoButton = document.createElement('button');
                infoButton.className = 'info-button tooltip';
                infoButton.innerHTML = 'i';
                
                const tooltipText = document.createElement('span');
                tooltipText.className = 'tooltip-text';
                tooltipText.textContent = task.description;
                infoButton.appendChild(tooltipText);
                
                taskContent.appendChild(taskText);
                taskContent.appendChild(infoButton);
            } else {
                taskContent.appendChild(taskText);
            }

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-task';
            deleteButton.innerHTML = '×';

            taskHeader.appendChild(dragHandle);
            taskHeader.appendChild(checkbox);
            taskHeader.appendChild(taskContent);
            taskHeader.appendChild(deleteButton);

            taskElement.appendChild(taskHeader);

            // Create task body for subtasks if they exist
            if (task.subtasks && task.subtasks.length > 0) {
                const taskBody = document.createElement('div');
                taskBody.className = 'task-body';

                const subtasksContainer = document.createElement('div');
                subtasksContainer.className = 'subtasks';

                task.subtasks.forEach((subtask, subtaskIndex) => {
                    const subtaskElement = document.createElement('div');
                    subtaskElement.className = 'subtask';

                    const subtaskCheckbox = document.createElement('input');
                    subtaskCheckbox.type = 'checkbox';
                    subtaskCheckbox.className = 'task-checkbox';
                    subtaskCheckbox.checked = subtask.completed;

                    const subtaskContent = document.createElement('div');
                    subtaskContent.className = 'task-content';

                    const subtaskText = document.createElement('span');
                    subtaskText.className = 'subtask-text';
                    subtaskText.textContent = translateTaskText(subtask.text);

                    // Create info button for subtask description
                    if (subtask.description) {
                        const subtaskInfoButton = document.createElement('button');
                        subtaskInfoButton.className = 'info-button tooltip';
                        subtaskInfoButton.innerHTML = 'i';
                        
                        const subtaskTooltipText = document.createElement('span');
                        subtaskTooltipText.className = 'tooltip-text';
                        subtaskTooltipText.textContent = subtask.description;
                        subtaskInfoButton.appendChild(subtaskTooltipText);
                        
                        subtaskContent.appendChild(subtaskText);
                        subtaskContent.appendChild(subtaskInfoButton);
                    } else {
                        subtaskContent.appendChild(subtaskText);
                    }

                    subtaskElement.appendChild(subtaskCheckbox);
                    subtaskElement.appendChild(subtaskContent);

                    // Add event listener for subtask checkbox
                    subtaskCheckbox.addEventListener('change', () => {
                        subtask.completed = subtaskCheckbox.checked;
                        // Update main task completion status based on subtasks
                        task.completed = task.subtasks.every(st => st.completed);
                        checkbox.checked = task.completed;
                        saveToStorage();
                    });

                    subtasksContainer.appendChild(subtaskElement);
                });

                taskBody.appendChild(subtasksContainer);
                taskElement.appendChild(taskBody);
            }

            container.appendChild(taskElement);

            // Event listeners for main task
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                // Update all subtasks to match main task status
                if (task.subtasks) {
                    task.subtasks.forEach(subtask => {
                        subtask.completed = checkbox.checked;
                    });
                    renderTasks(tasks, container); // Re-render to update subtask checkboxes
                }
                saveToStorage();
            });
            
            deleteButton.addEventListener('click', () => {
                showConfirmDialog(
                    currentTranslation.confirmDelete.title,
                    currentTranslation.confirmDelete.message,
                    () => {
                        const category = categories.find(c => c.id === activeCategory);
                        if (category) {
                            category.tasks.splice(index, 1);
                            saveToStorage();
                            renderTasks(category.tasks, container);
                        }
                    }
                );
            });
            
            // Drag and drop events
            taskElement.addEventListener('dragstart', (e) => {
                taskElement.classList.add('dragging');
                e.dataTransfer.setData('text/plain', index.toString());
            });

            taskElement.addEventListener('dragend', () => {
                taskElement.classList.remove('dragging');
            });
        });

        // Add drag and drop container listeners
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            if (!draggingTask) return;
            
            const taskElements = [...container.querySelectorAll('.task:not(.dragging)')];
            const nextTask = taskElements.find(task => {
                const rect = task.getBoundingClientRect();
                const offset = e.clientY - rect.top - rect.height / 2;
                return offset < 0;
            });
            
            if (nextTask) {
                container.insertBefore(draggingTask, nextTask);
            } else {
                container.appendChild(draggingTask);
            }
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const tasks = categories.find(c => c.id === activeCategory).tasks;
            const [movedTask] = tasks.splice(sourceIndex, 1);
            
            const taskElements = [...container.querySelectorAll('.task')];
            const destinationIndex = taskElements.indexOf(e.target.closest('.task'));
            
            if (destinationIndex !== -1) {
                tasks.splice(destinationIndex, 0, movedTask);
            } else {
                tasks.push(movedTask);
            }
            
            saveToStorage();
            renderTasks(tasks, container);
        });
    }

    function toggleTask(taskId) {
        const category = categories.find(c => c.id === activeCategory);
        const task = category.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveToStorage();
        }
    }

    function deleteTask(taskId) {
        const category = categories.find(c => c.id === activeCategory);
        category.tasks = category.tasks.filter(t => t.id !== taskId);
        saveToStorage();
        // Re-render only the task list
        const taskList = content.querySelector('.task-list');
        if (taskList) {
            renderTasks(category.tasks, taskList);
        }
    }

    function deleteCategory(categoryId) {
        const index = categories.findIndex(c => c.id === categoryId);
        if (index === -1) return;

        categories = categories.filter(c => c.id !== categoryId);
        
        if (activeCategory === categoryId) {
            activeCategory = categories.length > 0 ? categories[0].id : null;
        }

        saveToStorage();
        renderAll();
    }

    function saveToStorage() {
        chrome.storage.local.set({ categories: categories });
    }

    // Drag and Drop Functions
    let draggedItem = null;
    let draggedItemIndex = -1;

    function handleDragStart(e) {
        draggedItem = e.target;
        draggedItemIndex = Array.from(draggedItem.parentNode.children).indexOf(draggedItem);
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        draggedItem = null;
        draggedItemIndex = -1;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (e.target.classList.contains('task-item')) {
            e.target.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        if (e.target.classList.contains('task-item')) {
            e.target.classList.remove('drag-over');
        }
    }

    // OpenAI API Configuration
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    
    async function generateTasksFromGoal(goal) {
        try {
            const apiKey = window.getApiKey();
            console.log('API Key length:', apiKey ? apiKey.length : 0);
            if (!apiKey) {
                throw new Error(currentTranslation.errors.apiError);
            }

            const requestBody = {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are a detailed task breakdown assistant for beginners. You MUST respond with ONLY a JSON object in this EXACT format, with NO additional text:
{
    "title": "Brief Goal Title (max 100 chars)",
    "tasks": [
        {
            "text": "Main Task Title (max 100 chars)",
            "description": "Provide a detailed explanation that includes: 
                          - Why this task is important
                          - What prerequisites are needed
                          - What tools or resources to use
                          (max 300 chars)",
            "subtasks": [
                {
                    "text": "Detailed Subtask Title (max 100 chars)",
                    "description": "Step-by-step instructions that include:
                                  - Exact commands or actions needed
                                  - Expected results at each step
                                  - Links to helpful resources
                                  - Practice exercises
                                  (max 300 chars)"
                }
            ]
        }
    ]
}

Guidelines:
1. Create 6-8 main tasks
2. Each task should have 2-4 detailed subtasks
3. Assume NO prior knowledge
4. Use clear, simple language
5. Include specific examples and practice exercises
6. Add links to recommended tools and resources
7. Response must be in ${currentTranslation.language} language
8. ONLY return the JSON object, no other text`
                    },
                    {
                        role: "user",
                        content: `Create a very detailed, beginner-friendly task breakdown for: ${goal}. Remember to ONLY respond with the JSON object, no other text.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 10000
            };

            console.log('Request body:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(e => ({ error: 'Failed to parse error response' }));
                console.error('OpenAI API Error Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData,
                    message: errorData.error?.message || 'Unknown error'
                });
                throw new Error(errorData.error?.message || currentTranslation.errors.apiError);
            }

            const rawResponse = await response.json();
            
            if (!rawResponse.choices || !rawResponse.choices[0] || !rawResponse.choices[0].message) {
                console.error('Invalid API response structure:', rawResponse);
                throw new Error(currentTranslation.errors.apiError);
            }

            const content = rawResponse.choices[0].message.content;
            
            try {
                const parsedContent = JSON.parse(content);
                if (!parsedContent.title || !Array.isArray(parsedContent.tasks)) {
                    console.error('Invalid content structure:', parsedContent);
                    throw new Error(currentTranslation.errors.apiError);
                }

                // Process tasks and add IDs
                const processedTasks = parsedContent.tasks.map(task => ({
                    ...task,
                    id: Date.now().toString() + Math.random(),
                    completed: false,
                    subtasks: (task.subtasks || []).map(subtask => ({
                        ...subtask,
                        id: Date.now().toString() + Math.random(),
                        completed: false
                    }))
                }));

                return {
                    title: parsedContent.title,
                    tasks: processedTasks
                };
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError, 'Content:', content);
                throw new Error(currentTranslation.errors.apiError);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // Load translation and data when the app starts
    await loadFromStorage();
    await loadTranslation();
    await setupLanguageSelector();
    goalInput.placeholder = currentTranslation.placeholders.detailedGoal || 'Example: I want to learn WordPress in 3 months to work as a freelance web developer. I want to learn all the design and development basics that will make me successful.';
    renderAll();
});
