/**
 * Journal functionality for Mindful Journey
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sample data (in a real app, this would come from your Flask backend)
    let journalEntries = [
        {
            id: 1,
            title: "First Mushroom Journey",
            content: "Today I experienced my first psilocybin journey. The visuals were breathtaking, and I felt a deep connection to nature. During the peak, I had a profound realization about my relationship with my parents and how much their love has shaped me.\n\nI felt emotions I hadn't accessed in years, both joy and some sadness about past regrets. But overall, there was a sense of acceptance and peace that I want to carry forward.\n\nKey insights:\n- Nature connection feels vital to my wellbeing\n- I need to express gratitude to my parents more often\n- My anxiety seems connected to fear of disappointing others",
            type: "reflection",
            date: "2025-07-15",
            private: false
        },
        {
            id: 2,
            title: "Healing Intention",
            content: "I'm setting an intention to explore childhood memories and heal past wounds. I want to approach this with openness and self-compassion, knowing that whatever arises is part of my healing journey.\n\nSpecific intentions:\n1. Understand the root of my fear of abandonment\n2. Connect with my authentic self without judgment\n3. Release patterns that no longer serve me",
            type: "intention",
            date: "2025-07-10",
            private: true
        }
    ];
    
    // Load journal entries from localStorage if available
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
        journalEntries = JSON.parse(storedEntries);
    }
    
    // Also check for any insights captured during trip mode
    const tripInsights = JSON.parse(localStorage.getItem('insights') || '[]');
    if (tripInsights.length > 0) {
        tripInsights.forEach(insight => {
            const date = new Date(insight.timestamp);
            journalEntries.push({
                id: Date.now() + Math.floor(Math.random() * 1000),
                title: "Trip Insight",
                content: insight.text + "\n\n---\nCaptured during journey on " + date.toLocaleDateString(),
                type: "reflection",
                date: date.toISOString().split('T')[0],
                private: false,
                user: insight.user || 'nesarks',
                created: insight.created || '2025-07-22 06:24:43'
            });
        });
        // Clear the trip insights after importing
        localStorage.removeItem('insights');
        // Save the updated journal entries
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    }
    
    // Display journal entries
    function displayEntries(filter = 'all') {
        const entriesList = document.getElementById('entriesList');
        const emptyState = document.getElementById('emptyState');
        
        // Filter entries if needed
        let filteredEntries = journalEntries;
        if (filter !== 'all') {
            filteredEntries = journalEntries.filter(entry => entry.type === filter);
        }
        
        // Sort entries by date (newest first)
        filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Show empty state if no entries
        if (filteredEntries.length === 0) {
            emptyState.classList.remove('hidden');
            entriesList.innerHTML = '';
            entriesList.appendChild(emptyState);
            return;
        }
        
        // Hide empty state and display entries
        emptyState.classList.add('hidden');
        entriesList.innerHTML = '';
        
        filteredEntries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'entry-item p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors duration-200 cursor-pointer';
            entryElement.dataset.id = entry.id;
            
            // Format date for display
            const date = new Date(entry.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            // Determine tag color based on entry type
            let tagClass = '';
            switch(entry.type) {
                case 'reflection':
                    tagClass = 'bg-primary-100 text-primary-800';
                    break;
                case 'intention':
                    tagClass = 'bg-secondary-100 text-secondary-800';
                    break;
                case 'microdose':
                    tagClass = 'bg-yellow-100 text-yellow-800';
                    break;
                default:
                    tagClass = 'bg-neutral-100 text-neutral-800';
            }
            
            // Capitalize entry type for display
            const displayType = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);
            
            entryElement.innerHTML = `
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-medium text-neutral-800">${entry.title}</h3>
                    <span class="text-xs text-neutral-500">${formattedDate}</span>
                </div>
                <div class="flex items-center mb-2">
                    <span class="text-xs ${tagClass} rounded-full px-2 py-0.5">${displayType}</span>
                    ${entry.private ? '<span class="text-xs ml-2 bg-red-100 text-red-800 rounded-full px-2 py-0.5">Private</span>' : ''}
                </div>
                <p class="text-neutral-600 text-sm line-clamp-2">${entry.content}</p>
            `;
            
            // Add click event to view entry
            entryElement.addEventListener('click', () => {
                viewEntry(entry.id);
            });
            
            entriesList.appendChild(entryElement);
        });
    }
    
    // View entry details
    function viewEntry(id) {
        const entry = journalEntries.find(e => e.id == id);
        if (!entry) return;
        
        document.getElementById('modalEntryTitle').textContent = entry.title;
        document.getElementById('modalEntryContent').textContent = entry.content;
        
        // Format date
        const date = new Date(entry.date);
        document.getElementById('modalEntryDate').textContent = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        // Set entry type
        const entryTypeEl = document.getElementById('modalEntryType');
        const displayType = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);
        entryTypeEl.textContent = displayType;
        
        // Set tag color
        entryTypeEl.className = 'text-xs rounded-full px-2 py-0.5 mr-2';
        switch(entry.type) {
            case 'reflection':
                entryTypeEl.classList.add('bg-primary-100', 'text-primary-800');
                break;
            case 'intention':
                entryTypeEl.classList.add('bg-secondary-100', 'text-secondary-800');
                break;
            case 'microdose':
                entryTypeEl.classList.add('bg-yellow-100', 'text-yellow-800');
                break;
            default:
                entryTypeEl.classList.add('bg-neutral-100', 'text-neutral-800');
        }
        
        // Store the current entry ID for edit/delete operations
        document.getElementById('viewEntryModal').dataset.entryId = id;
        
        // Show the modal
        document.getElementById('viewEntryModal').classList.remove('hidden');
    }
    
    // Save journal entry
    document.getElementById('saveJournal').addEventListener('click', function() {
        const title = document.getElementById('journalTitle').value.trim();
        const content = document.getElementById('journalContent').value.trim();
        const type = document.getElementById('entryType').value;
        const isPrivate = document.getElementById('privateEntry').checked;
        
        if (!title || !content) {
            alert('Please enter a title and content for your journal entry.');
            return;
        }
        
        const newEntry = {
            id: Date.now(),
            title,
            content,
            type,
            date: new Date().toISOString().split('T')[0],
            private: isPrivate,
            user: 'nesarks',
            created: '2025-07-22 06:24:43'
        };
        
        journalEntries.push(newEntry);
        
        // Save to localStorage
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        
        // In a real app, you would also save to your Flask backend if not private
        // if (!isPrivate) {
        //     fetch('/api/journal', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newEntry),
        //     });
        // }
        
        // Clear form
        document.getElementById('journalTitle').value = '';
        document.getElementById('journalContent').value = '';
        
        // Update entries display
        displayEntries(document.getElementById('entriesFilter').value);
        
        // Show confirmation
        showNotification('Journal entry saved successfully!');
    });
    
    // Filter entries
    document.getElementById('entriesFilter').addEventListener('change', function() {
        displayEntries(this.value);
    });
    
    // Close entry view modal
    document.getElementById('closeViewModal').addEventListener('click', function() {
        document.getElementById('viewEntryModal').classList.add('hidden');
    });
    
    document.getElementById('closeEntry').addEventListener('click', function() {
        document.getElementById('viewEntryModal').classList.add('hidden');
    });
    
    // Delete entry
    document.getElementById('deleteEntry').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
            const entryId = document.getElementById('viewEntryModal').dataset.entryId;
            journalEntries = journalEntries.filter(entry => entry.id != entryId);
            
            // Update localStorage
            localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
            
            // Close modal and update display
            document.getElementById('viewEntryModal').classList.add('hidden');
            displayEntries(document.getElementById('entriesFilter').value);
            
            // Show confirmation
            showNotification('Journal entry deleted.');
        }
    });
    
    // Edit entry
    document.getElementById('editEntry').addEventListener('click', function() {
        const entryId = document.getElementById('viewEntryModal').dataset.entryId;
        const entry = journalEntries.find(e => e.id == entryId);
        
        if (entry) {
            // Fill form with entry data
            document.getElementById('journalTitle').value = entry.title;
            document.getElementById('journalContent').value = entry.content;
            document.getElementById('entryType').value = entry.type;
            document.getElementById('privateEntry').checked = entry.private;
            
            // Close modal
            document.getElementById('viewEntryModal').classList.add('hidden');
            
            // Delete the original entry
            journalEntries = journalEntries.filter(e => e.id != entryId);
            localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
            
            // Scroll to form
            document.getElementById('journalTitle').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('journalTitle').focus();
            
            // Show message
            showNotification('Editing entry. Save to update.');
        }
    });
    
    // Toggle AI suggestions
    document.getElementById('aiSuggest').addEventListener('click', function() {
        const suggestionsPanel = document.getElementById('promptSuggestions');
        suggestionsPanel.classList.toggle('hidden');
        
        // Change button text
        if (suggestionsPanel.classList.contains('hidden')) {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Get Reflection Prompts</span>
            `;
        } else {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Hide Prompts</span>
            `;
        }
    });
    
    // Use prompt in journal
    document.querySelectorAll('.prompt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const prompt = this.textContent;
            const textarea = document.getElementById('journalContent');
            
            // Add prompt to textarea, with a newline if there's already content
            if (textarea.value) {
                textarea.value += '\n\n' + prompt + '\n';
            } else {
                textarea.value = prompt + '\n';
            }
            
            // Focus textarea and scroll to end
            textarea.focus();
            textarea.scrollTop = textarea.scrollHeight;
        });
    });
    
    // Dynamic prompt loading based on entry type
    document.getElementById('entryType').addEventListener('change', function() {
        const promptType = this.value;
        const promptsContainer = document.getElementById('promptSuggestions').querySelector('ul');
        
        // Different prompts based on entry type
        let prompts = [];
        
        switch(promptType) {
            case 'reflection':
                prompts = [
                    "What insights about yourself did you gain from this experience?",
                    "How did this experience compare to your initial intentions?",
                    "What emotions came up that surprised you?",
                    "What aspects of the experience would you like to integrate into your daily life?",
                    "If you could tell your pre-journey self one thing, what would it be?"
                ];
                break;
            case 'intention':
                prompts = [
                    "What are you hoping to learn or discover through this experience?",
                    "What patterns or behaviors would you like to examine?",
                    "How might this experience contribute to your personal growth?",
                    "What emotional or psychological barriers are you hoping to address?",
                    "What would a positive outcome from this journey look like for you?"
                ];
                break;
            case 'microdose':
                prompts = [
                    "How did today's microdose affect your mood and energy levels?",
                    "Did you notice any changes in your creativity or problem-solving abilities?",
                    "How was your social connectivity and empathy today?",
                    "Did you experience any physical sensations worth noting?",
                    "What tasks or activities felt different while microdosing?"
                ];
                break;
            default:
                prompts = [
                    "What's on your mind today?",
                    "What emotions are you experiencing right now?",
                    "What insights or realizations have you had recently?",
                    "How is your relationship with yourself evolving?",
                    "What are you grateful for at this moment?"
                ];
        }
        
        // Update the prompts in the UI
        promptsContainer.innerHTML = '';
        prompts.forEach(prompt => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <span class="text-primary-500 mr-2">•</span>
                <button class="prompt-btn text-left hover:text-primary-700 transition-colors duration-200">${prompt}</button>
            `;
            promptsContainer.appendChild(li);
        });
        
        // Re-attach event listeners to new prompt buttons
        document.querySelectorAll('.prompt-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const prompt = this.textContent;
                const textarea = document.getElementById('journalContent');
                
                if (textarea.value) {
                    textarea.value += '\n\n' + prompt + '\n';
                } else {
                    textarea.value = prompt + '\n';
                }
                
                textarea.focus();
                textarea.scrollTop = textarea.scrollHeight;
            });
        });
    });
    
    // Initialize entries display
    displayEntries();
    
    // Set current date
    const today = new Date();
    document.getElementById('journalTitle').placeholder = `Entry for ${today.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    })}`;
    
    // Check for entry from trip mode to pre-populate
    const currentTripData = JSON.parse(localStorage.getItem('tripPreparation') || '{}');
    if (currentTripData.intention && currentTripData.intention.details) {
        // Pre-populate with intention from trip prep
        if (document.getElementById('journalContent').value === '') {
            document.getElementById('journalContent').value = `My intention for this journey was:\n\n"${currentTripData.intention.details}"\n\nReflections on the experience:\n`;
        }
    }
    
    // Show notification
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
    
    // Handle clicks outside the entry modal
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('viewEntryModal');
        const modalContent = modal.querySelector('div');
        
        if (modal && !modal.classList.contains('hidden') && !modalContent.contains(e.target)) {
            modal.classList.add('hidden');
        }
    });
    
    // Export journal entries
    window.exportJournal = function() {
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "journal_export_" + new Date().toISOString().split('T')[0] + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
    
    // Import journal entries
    window.importJournal = function(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedEntries = JSON.parse(e.target.result);
                if (Array.isArray(importedEntries)) {
                    // Merge with existing entries or replace them
                    if (confirm('Would you like to merge these entries with your existing journal? Click Cancel to replace all entries.')) {
                        // Merge
                        const existingEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
                        const mergedEntries = [...existingEntries, ...importedEntries];
                        localStorage.setItem('journalEntries', JSON.stringify(mergedEntries));
                    } else {
                        // Replace
                        localStorage.setItem('journalEntries', JSON.stringify(importedEntries));
                    }
                    
                    // Reload entries
                    journalEntries = JSON.parse(localStorage.getItem('journalEntries'));
                    displayEntries();
                    showNotification('Journal entries imported successfully!');
                } else {
                    throw new Error('Invalid format');
                }
            } catch (error) {
                showNotification('Error importing journal: Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    };
});