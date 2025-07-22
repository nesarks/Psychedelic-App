/**
 * Core app functionality for Mindful Journey
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transition effect
    document.body.classList.add('page-transition');
    
    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking elsewhere
        document.addEventListener('click', function() {
            if (!userMenu.classList.contains('hidden')) {
                userMenu.classList.add('hidden');
            }
        });
    }
    
    // Emergency Resources modal
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeEmergencyModal = document.getElementById('closeEmergencyModal');
    
    if (emergencyBtn && emergencyModal) {
        emergencyBtn.addEventListener('click', function() {
            emergencyModal.classList.remove('hidden');
        });
        
        closeEmergencyModal.addEventListener('click', function() {
            emergencyModal.classList.add('hidden');
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !emergencyModal.classList.contains('hidden')) {
                emergencyModal.classList.add('hidden');
            }
        });
    }
    
    // Privacy toggle
    const privacyToggle = document.getElementById('privacyToggle');
    if (privacyToggle) {
        const privacyCheckbox = document.getElementById('privacy');
        const toggleSpan = privacyToggle.querySelector('span.relative');
        
        privacyToggle.addEventListener('click', function(e) {
            e.preventDefault();
            privacyCheckbox.checked = !privacyCheckbox.checked;
            
            // Update toggle appearance
            if (privacyCheckbox.checked) {
                toggleSpan.classList.add('bg-primary-500');
                toggleSpan.classList.remove('bg-neutral-200');
                toggleSpan.querySelector('span').classList.add('translate-x-5');
                
                // Store privacy preference
                localStorage.setItem('privacyMode', 'local-only');
                
                // Show confirmation
                showNotification('Local-only mode enabled. Your data will only be stored on this device.');
            } else {
                toggleSpan.classList.remove('bg-primary-500');
                toggleSpan.classList.add('bg-neutral-200');
                toggleSpan.querySelector('span').classList.remove('translate-x-5');
                
                // Store privacy preference
                localStorage.setItem('privacyMode', 'cloud');
                
                // Show confirmation
                showNotification('Cloud sync enabled. Your data will be securely stored and available across devices.');
            }
        });
        
        // Initialize toggle state from localStorage
        if (localStorage.getItem('privacyMode') === 'local-only') {
            privacyCheckbox.checked = true;
            toggleSpan.classList.add('bg-primary-500');
            toggleSpan.classList.remove('bg-neutral-200');
            toggleSpan.querySelector('span').classList.add('translate-x-5');
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Quick exit with Escape key (when not in a modal)
        if (e.key === 'Escape' && !document.querySelector('.modal:not(.hidden)')) {
            if (confirm('Are you sure you want to exit?')) {
                window.location.href = 'index.html';
            }
        }
        
        // Ctrl+/ or Cmd+/ for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showHelpOverlay();
        }
    });
    
    // Load user info
    loadUserInfo();
    
    // Check for dark mode preference
    checkDarkModePreference();
});

/**
 * Show a temporary notification
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-20 opacity-0 z-50';
    
    // Set background color based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-primary-500', 'text-white');
    }
    
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('translate-y-20', 'opacity-0');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Load user information from localStorage
 */
function loadUserInfo() {
    const userName = document.getElementById('userName');
    const userInitial = document.getElementById('userInitial');
    
    if (userName && userInitial) {
        const storedName = localStorage.getItem('userName') || 'Friend';
        userName.textContent = storedName;
        userInitial.textContent = storedName[0] || 'F';
    }
}

/**
 * Check user's dark mode preference
 */
function checkDarkModePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // User prefers dark mode
        // You could add a class to the body to activate dark mode
        // or set it in Tailwind config
    }
    
    // Listen for changes in color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            // Changed to dark mode
            // document.body.classList.add('dark-mode');
        } else {
            // Changed to light mode
            // document.body.classList.remove('dark-mode');
        }
    });
}

/**
 * Show help overlay with keyboard shortcuts
 */
function showHelpOverlay() {
    // Create help overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    overlay.id = 'helpOverlay';
    
    overlay.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 class="text-xl font-medium text-neutral-800 mb-4">Keyboard Shortcuts</h2>
            <div class="space-y-3 mb-6">
                <div class="flex items-center justify-between">
                    <span class="text-neutral-600">Close/Exit</span>
                    <span class="px-2 py-1 bg-neutral-100 rounded text-sm">Esc</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-neutral-600">Show Help</span>
                    <span class="px-2 py-1 bg-neutral-100 rounded text-sm">Ctrl+/</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-neutral-600">Quick Breathing</span>
                    <span class="px-2 py-1 bg-neutral-100 rounded text-sm">Ctrl+B</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-neutral-600">Quick Journal</span>
                    <span class="px-2 py-1 bg-neutral-100 rounded text-sm">Ctrl+J</span>
                </div>
            </div>
            <button id="closeHelpOverlay" class="w-full py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-200">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add close button functionality
    document.getElementById('closeHelpOverlay').addEventListener('click', function() {
        document.getElementById('helpOverlay').remove();
    });
    
    // Close with Escape key
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            document.getElementById('helpOverlay').remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    
    document.addEventListener('keydown', escHandler);
}

/**
 * Format a date string for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Safety check for substance information
 * @param {string} substance - The substance name
 * @returns {object} Safety information
 */
function getSubstanceInfo(substance) {
    const substanceInfo = {
        'psilocybin': {
            fullName: 'Psilocybin Mushrooms',
            dosageUnits: 'g',
            microdoseRange: '0.05g - 0.3g',
            standardDose: '1g - 3.5g',
            onsetTime: '30-60 minutes',
            duration: '4-6 hours',
            interactions: ['SSRIs', 'MAOIs', 'Lithium', 'Alcohol'],
            safetyNotes: 'Start low, especially if you\'re sensitive. Not recommended for those with personal or family history of psychosis.'
        },
        'lsd': {
            fullName: 'LSD',
            dosageUnits: 'μg',
            microdoseRange: '5μg - 20μg',
            standardDose: '100μg - 200μg',
            onsetTime: '30-90 minutes',
            duration: '8-12 hours',
            interactions: ['SSRIs', 'Lithium', 'MAOIs', 'Alcohol'],
            safetyNotes: 'Test your substance. LSD has a longer duration than many other psychedelics. Plan accordingly.'
        },
        // More substances could be added
    };
    
    return substanceInfo[substance.toLowerCase()] || {
        fullName: substance,
        safetyNotes: 'Please research this substance thoroughly before use.'
    };
}