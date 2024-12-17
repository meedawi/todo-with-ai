const translations = {
    ar: {
        language: 'ar',
        direction: 'rtl',
        appTitle: "قائمة المهام",
        addNewCategory: "إضافة تصنيف جديد",
        addTask: "أضف مهمة جديدة",
        generateTasks: "تحليل الهدف وتوليد المهام",
        loading: "جاري تحليل الهدف...",
        inputPlaceholder: "اشرح هدفك بالتفصيل...",
        inputHint: "اشرح هدفك بالتفصيل... كلما كان الشرح أكثر تفصيلاً، كانت المهام المقترحة أكثر دقة ومساعدة.",
        errors: {
            emptyGoal: "الرجاء إدخال الهدف أولاً",
            apiError: "حدث خطأ أثناء تحليل الهدف. الرجاء المحاولة مرة أخرى.",
            invalidResponse: "تنسيق الاستجابة غير صالح. الرجاء المحاولة مرة أخرى."
        },
        taskStatus: {
            completed: "مكتمل",
            pending: "قيد التنفيذ"
        },
        buttons: {
            add: "إضافة",
            delete: "حذف",
            edit: "تعديل",
            save: "حفظ",
            cancel: "إلغاء"
        },
        defaultGoal: {
            brief: '',
            detailed: ''
        },
        placeholders: {
            addTask: "أضف مهمة جديدة",
            categoryName: "اسم التصنيف",
            goal: 'خطة السيطرة على العالم (من غرفتي، بدون مقابلة أحد) 🌍',
            detailedGoal: 'أريد خطة مفصلة للسيطرة على العالم في خمس سنوات من غرفتي، بدون مقابلة أحد 🌍',
            category: 'اسم الفئة الجديدة...'
        },
        headers: {
            taskDescription: "تفاصيل المهمة",
            subtasks: "المهام الفرعية"
        },
        tooltips: {
            taskInfo: "عرض التفاصيل",
            dragHandle: "اسحب لتغيير الترتيب",
            description: "انقر لعرض الوصف"
        },
        emptyState: {
            noCategories: "لا توجد تصنيفات. أضف تصنيفاً جديداً للبدء!",
            noTasks: "لا توجد مهام في هذا التصنيف",
            noSubtasks: "لا توجد مهام فرعية"
        },
        confirmDelete: {
            title: "تأكيد الحذف",
            message: "هل أنت متأكد من حذف هذه المهمة وجميع مهامها الفرعية؟"
        },
        languageSelector: "اختر اللغة",
        simplified: "مبسطة",
        withAI: "بالذكاء الاصطناعي",
        defaultCategories: {
            priorities: 'أولويات',
            daily: 'يومية',
            work: 'عمل',
            personal: 'شخصي',
            reading: 'قراءات'
        },
        defaultTasks: {
            callMom: "اتصل بأمك",
            beBetter: "كن أفضل من الأمس",
            rememberGod: "اذكر الله"
        }
    },
    en: {
        language: 'en',
        direction: 'ltr',
        appTitle: "Task List",
        addNewCategory: "Add New Category",
        addTask: "Add New Task",
        generateTasks: "Analyze Goal & Generate Tasks",
        loading: "Analyzing goal...",
        inputPlaceholder: "Explain your goal in detail...",
        inputHint: "Explain your goal in detail... The more detailed your explanation, the more accurate and helpful the suggested tasks will be.",
        errors: {
            emptyGoal: "Please enter your goal first",
            apiError: "An error occurred while analyzing the goal. Please try again.",
            invalidResponse: "Invalid response format. Please try again."
        },
        taskStatus: {
            completed: "Completed",
            pending: "Pending"
        },
        buttons: {
            add: "Add",
            delete: "Delete",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel"
        },
        defaultGoal: {
            brief: '',
            detailed: ''
        },
        placeholders: {
            addTask: "Add new task",
            categoryName: "Category name",
            goal: 'World domination plan (from my room, without meeting anyone) 🌍',
            detailedGoal: 'I need a detailed 5-year plan to rule the world from my room, without meeting anyone 🌍',
            category: 'New category name...'
        },
        headers: {
            taskDescription: "Task Details",
            subtasks: "Subtasks"
        },
        tooltips: {
            taskInfo: "View Details",
            dragHandle: "Drag to reorder",
            description: "Click to view description"
        },
        emptyState: {
            noCategories: "No categories. Add a new category to get started!",
            noTasks: "No tasks in this category",
            noSubtasks: "No subtasks"
        },
        confirmDelete: {
            title: "Confirm Delete",
            message: "Are you sure you want to delete this task and all its subtasks?"
        },
        languageSelector: "Select Language",
        simplified: "Simplified",
        withAI: "with AI",
        defaultCategories: {
            priorities: 'Priorities',
            daily: 'Daily',
            work: 'Work',
            personal: 'Personal',
            reading: 'Reading'
        },
        defaultTasks: {
            callMom: "Call your mother",
            beBetter: "Be better than yesterday",
            rememberGod: "Remember God"
        }
    },
    es: {
        language: 'es',
        direction: 'ltr',
        appTitle: "Lista de Tareas",
        addNewCategory: "Añadir Nueva Categoría",
        addTask: "Añadir Nueva Tarea",
        generateTasks: "Analizar Objetivo y Generar Tareas",
        loading: "Analizando objetivo...",
        inputPlaceholder: "Explica tu objetivo en detalle...",
        inputHint: "Explica tu objetivo en detalle... Cuanto más detallada sea tu explicación, más precisas y útiles serán las tareas sugeridas.",
        errors: {
            emptyGoal: "Por favor, introduce tu objetivo primero",
            apiError: "Ocurrió un error al analizar el objetivo. Por favor, inténtalo de nuevo.",
            invalidResponse: "Formato de respuesta inválido. Por favor, inténtalo de nuevo."
        },
        taskStatus: {
            completed: "Completado",
            pending: "Pendiente"
        },
        buttons: {
            add: "Añadir",
            delete: "Eliminar",
            edit: "Editar",
            save: "Guardar",
            cancel: "Cancelar"
        },
        defaultGoal: {
            brief: '',
            detailed: ''
        },
        placeholders: {
            addTask: "Añadir nueva tarea",
            categoryName: "Nombre de categoría",
            goal: 'Plan de dominación mundial (desde mi habitación, sin ver a nadie) 🌍',
            detailedGoal: 'Necesito un plan detallado de 5 años para dominar el mundo desde mi habitación, sin ver a nadie 🌍',
            category: 'Nombre de nueva categoría...'
        },
        headers: {
            taskDescription: "Detalles de la Tarea",
            subtasks: "Subtareas"
        },
        tooltips: {
            taskInfo: "Mostrar detalles",
            dragHandle: "Arrastra para reordenar",
            description: "Haz clic para ver la descripción"
        },
        emptyState: {
            noCategories: "No hay categorías. ¡Añade una nueva categoría para empezar!",
            noTasks: "No hay tareas en esta categoría",
            noSubtasks: "No hay subtareas"
        },
        confirmDelete: {
            title: "Confirmar Eliminación",
            message: "¿Estás seguro de que deseas eliminar esta tarea y todas sus subtareas?"
        },
        languageSelector: "Seleccionar Idioma",
        simplified: "Simplificada",
        withAI: "con IA",
        defaultCategories: {
            priorities: 'Prioridades',
            daily: 'Diario',
            work: 'Trabajo',
            personal: 'Personal',
            reading: 'Lectura'
        },
        defaultTasks: {
            callMom: "Llama a tu madre",
            beBetter: "Sé mejor que ayer",
            rememberGod: "Recuerda a Dios"
        }
    },
    fr: {
        language: 'fr',
        direction: 'ltr',
        appTitle: "Liste des Tâches",
        addNewCategory: "Ajouter une Nouvelle Catégorie",
        addTask: "Ajouter une Nouvelle Tâche",
        generateTasks: "Analyser l'Objectif et Générer des Tâches",
        loading: "Analyse de l'objectif...",
        inputPlaceholder: "Expliquez votre objectif en détail...",
        inputHint: "Expliquez votre objectif en détail... Plus votre explication sera détaillée, plus les tâches suggérées seront précises et utiles.",
        errors: {
            emptyGoal: "Veuillez d'abord saisir votre objectif",
            apiError: "Une erreur s'est produite lors de l'analyse de l'objectif. Veuillez réessayer.",
            invalidResponse: "Format de réponse invalide. Veuillez réessayer."
        },
        taskStatus: {
            completed: "Terminé",
            pending: "En cours"
        },
        buttons: {
            add: "Ajouter",
            delete: "Supprimer",
            edit: "Modifier",
            save: "Enregistrer",
            cancel: "Annuler"
        },
        defaultGoal: {
            brief: '',
            detailed: ''
        },
        placeholders: {
            addTask: "Ajouter une nouvelle tâche",
            categoryName: "Nom de la catégorie",
            goal: 'Plan de domination mondiale (depuis ma chambre, sans voir personne) 🌍',
            detailedGoal: 'J\'ai besoin d\'un plan détaillé sur 5 ans pour dominer le monde depuis ma chambre, sans voir personne 🌍',
            category: 'Nom de nouvelle catégorie...'
        },
        headers: {
            taskDescription: "Détails de la Tâche",
            subtasks: "Sous-tâches"
        },
        tooltips: {
            taskInfo: "Afficher les détails",
            dragHandle: "Faire glisser pour réorganiser",
            description: "Cliquez pour afficher la description"
        },
        emptyState: {
            noCategories: "Aucune catégorie. Ajoutez une nouvelle catégorie pour commencer !",
            noTasks: "Aucune tâche dans cette catégorie",
            noSubtasks: "Aucune sous-tâche"
        },
        confirmDelete: {
            title: "Confirmer la Suppression",
            message: "Êtes-vous sûr de vouloir supprimer cette tâche et toutes ses sous-tâches ?"
        },
        languageSelector: "Sélectionner la Langue",
        simplified: "Simplifiée",
        withAI: "avec l'IA",
        defaultCategories: {
            priorities: 'Priorités',
            daily: 'Quotidien',
            work: 'Travail',
            personal: 'Personnel',
            reading: 'Lecture'
        },
        defaultTasks: {
            callMom: "Appelle ta mère",
            beBetter: "Sois meilleur qu'hier",
            rememberGod: "Souviens-toi de Dieu"
        }
    },
    zh: {
        language: 'zh',
        direction: 'ltr',
        appTitle: "任务清单",
        addNewCategory: "添加新类别",
        addTask: "添加新任务",
        generateTasks: "分析目标并生成任务",
        loading: "正在分析目标...",
        inputPlaceholder: "详细说明您的目标...",
        inputHint: "详细说明您的目标...解释越详细，建议的任务就越准确和有帮助。",
        errors: {
            emptyGoal: "请先输入您的目标",
            apiError: "分析目标时出错。请重试。",
            invalidResponse: "无效的响应格式。请重试。"
        },
        taskStatus: {
            completed: "已完成",
            pending: "进行中"
        },
        buttons: {
            add: "添加",
            delete: "删除",
            edit: "编辑",
            save: "保存",
            cancel: "取消"
        },
        defaultGoal: {
            brief: '',
            detailed: ''
        },
        placeholders: {
            addTask: "添加新任务",
            categoryName: "类别名称",
            goal: '世界统治计划（在我房间里，不见任何人）🌍',
            detailedGoal: '我需要一个从房间里统治世界的五年详细计划，无需见任何人 🌍',
            category: '新类别名称...'
        },
        headers: {
            taskDescription: "任务详情",
            subtasks: "子任务"
        },
        tooltips: {
            taskInfo: "显示详情",
            dragHandle: "拖动以重新排序",
            description: "点击查看描述"
        },
        emptyState: {
            noCategories: "没有类别。添加新类别开始！",
            noTasks: "此类别中没有任务",
            noSubtasks: "没有子任务"
        },
        confirmDelete: {
            title: "确认删除",
            message: "您确定要删除此任务和所有子任务吗？"
        },
        languageSelector: "选择语言",
        simplified: "简化版",
        withAI: "使用人工智能",
        defaultCategories: {
            priorities: '优先事项',
            daily: '每日',
            work: '工作',
            personal: '个人',
            reading: '阅读'
        },
        defaultTasks: {
            callMom: "给妈妈打电话",
            beBetter: "比昨天更好",
            rememberGod: "记住上帝"
        }
    }
};

// Get user's browser language
function getBrowserLanguage() {
    const defaultLanguage = 'en';
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : defaultLanguage;
}

// Get or set current language from storage
async function getCurrentLanguage() {
    const result = await chrome.storage.sync.get('language');
    return result.language || getBrowserLanguage();
}

// Set language in storage
async function setLanguage(language) {
    await chrome.storage.sync.set({ language });
    return language;
}

// Get translation for current language
async function getTranslation() {
    const currentLang = await getCurrentLanguage();
    return translations[currentLang] || translations.en;
}

// Update all UI elements with new language
async function updateUILanguage() {
    const translation = await getTranslation();
    
    // Update direction based on language
    document.documentElement.dir = translation.direction || 'ltr';
    document.body.dir = translation.direction || 'ltr';
    
    // Update static UI elements
    document.getElementById('appTitle').textContent = translation.appTitle;
    document.getElementById('addCategoryBtn').textContent = translation.addNewCategory;
    document.getElementById('generateTasks').textContent = translation.generateTasks;
    document.getElementById('goalInput').placeholder = translation.inputPlaceholder;
    document.querySelector('.input-hint').textContent = translation.inputHint;
    document.querySelector('.loading p').textContent = translation.loading;
    
    // Update any existing tasks status text
    document.querySelectorAll('.task-status').forEach(status => {
        const isCompleted = status.closest('.task').querySelector('input[type="checkbox"]').checked;
        status.textContent = isCompleted ? translation.taskStatus.completed : translation.taskStatus.pending;
    });
    
    // Update mode buttons
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        const mode = btn.dataset.mode;
        if (mode === 'simple') {
            btn.textContent = translation.simplified;
        } else if (mode === 'ai') {
            btn.textContent = translation.withAI;
        }
    });
}
