// Main JavaScript functionality for Natural Flow

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initSafetyBubble();
  initRippleBackground();
  
  // Initialize page-specific features
  if (document.querySelector('.home-view')) {
    initHomeView();
  } else if (document.querySelector('.prep-flow')) {
    initPrepFlow();
  } else if (document.querySelector('.journal-view')) {
    initJournalView();
  } else if (document.querySelector('.trip-mode')) {
    initTripMode();
  }
});

// Safety bubble functionality (available on all pages)
function initSafetyBubble() {
  const safetyButton = document.querySelector('.safety-button');
  const safetyPopup = document.querySelector('.safety-popup');
  const closeButton = document.querySelector('.safety-popup .close-btn');
  
  if (!safetyButton || !safetyPopup) return;
  
  safetyButton.addEventListener('click', () => {
    safetyPopup.classList.toggle('active');
  });
  
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      safetyPopup.classList.remove('active');
    });
  }
  
  // Close popup when clicking outside
  document.addEventListener('click', (e) => {
    if (!safetyButton.contains(e.target) && 
        !safetyPopup.contains(e.target) && 
        safetyPopup.classList.contains('active')) {
      safetyPopup.classList.remove('active');
    }
  });
  
  // Emergency hide function
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.body.classList.toggle('emergency-hide');
    }
  });
}

// Background ripple animation
function initRippleBackground() {
  const rippleContainer = document.querySelector('.background-ripple-container');
  if (!rippleContainer) return;
  
  function createRipple() {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const size = Math.random() * 200 + 100;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    rippleContainer.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 8000);
  }
  
  // Create initial ripples
  for (let i = 0; i < 3; i++) {
    setTimeout(createRipple, i * 2000);
  }
  
  // Continue creating ripples at intervals
  setInterval(createRipple, 6000);
}

// Home view with tree growth
function initHomeView() {
  const treeContainer = document.querySelector('.tree-container');
  if (!treeContainer) return;
  
  // Get trip count from localStorage or default to 0
  const tripCount = parseInt(localStorage.getItem('tripCount') || '0');
  updateTree(tripCount);
  
  // Update tree based on number of trips
  function updateTree(count) {
    // Define tree growth stages
    const treeStages = [
      'seedling', // 0 trips
      'sapling',  // 1-2 trips
      'young',    // 3-5 trips
      'mature',   // 6-9 trips
      'flourishing' // 10+ trips
    ];
    
    let stageIndex = 0;
    if (count >= 1 && count <= 2) stageIndex = 1;
    else if (count >= 3 && count <= 5) stageIndex = 2;
    else if (count >= 6 && count <= 9) stageIndex = 3;
    else if (count >= 10) stageIndex = 4;
    
    const stageName = treeStages[stageIndex];
    treeContainer.className = `tree-container tree-${stageName}`;
    
    // Update tree description
    const treeDesc = document.querySelector('.tree-description');
    if (treeDesc) {
      const descriptions = [
        "Your journey is just beginning. Plant your first intention.",
        "Your practice is taking root. Continue nurturing your growth.",
        "Your understanding is developing. The path is becoming clearer.",
        "Your inner wisdom is flourishing. The journey continues to unfold.",
        "Your practice has deepened. Your tree of wisdom stands tall."
      ];
      treeDesc.textContent = descriptions[stageIndex];
    }
  }
  
  // Journey button functionality
  const journeyButton = document.querySelector('.begin-journey-btn');
  if (journeyButton) {
    journeyButton.addEventListener('click', () => {
      document.querySelector('.home-content').classList.add('slide-out');
      setTimeout(() => {
        window.location.href = '/prep';
      }, 500);
    });
  }
}

// Prep flow with multi-step wizard
function initPrepFlow() {
  const steps = document.querySelectorAll('.prep-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const progressBar = document.querySelector('.progress-bar-fill');
  
  if (!steps.length) return;
  
  let currentStep = 0;
  updateProgress();
  
  // Next button functionality
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Validate current step if needed
      steps[currentStep].classList.add('slide-out');
      setTimeout(() => {
        steps[currentStep].classList.remove('active', 'slide-out');
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        steps[currentStep].classList.add('active', 'slide-in');
        setTimeout(() => {
          steps[currentStep].classList.remove('slide-in');
        }, 500);
        updateProgress();
      }, 500);
    });
  });
  
  // Previous button functionality
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      steps[currentStep].classList.add('slide-out-right');
      setTimeout(() => {
        steps[currentStep].classList.remove('active', 'slide-out-right');
        currentStep = Math.max(currentStep - 1, 0);
        steps[currentStep].classList.add('active', 'slide-in-left');
        setTimeout(() => {
          steps[currentStep].classList.remove('slide-in-left');
        }, 500);
        updateProgress();
      }, 500);
    });
  });
  
  // Update progress bar
  function updateProgress() {
    if (progressBar) {
      const percentage = (currentStep / (steps.length - 1)) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }
  
  // Final step submission
  const submitButton = document.querySelector('.submit-prep');
  if (submitButton) {
    submitButton.addEventListener('click', async () => {
      // Collect data from all steps
      const formData = new FormData(document.querySelector('.prep-form'));
      
      try {
        const response = await fetch('/start_trip', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          window.location.href = '/trip';
        } else {
          console.error('Error starting trip');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    });
  }
}

// Journal view functionality
function initJournalView() {
  const journalEditor = document.querySelector('.journal-editor');
  const saveButton = document.querySelector('.save-journal');
  const aiSuggestionButton = document.querySelector('.ai-suggestion');
  
  if (!journalEditor) return;
  
  // Load existing journal entry if available
  loadJournalEntry();
  
  // Auto-save periodically
  let typingTimer;
  journalEditor.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      localStorage.setItem('journal_draft', journalEditor.value);
    }, 1000);
  });
  
  // Save button functionality
  if (saveButton) {
    saveButton.addEventListener('click', async () => {
      const journalContent = journalEditor.value;
      const journalType = document.querySelector('input[name="journal_type"]:checked').value;
      
      try {
        const response = await fetch('/save_journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: journalContent,
            type: journalType
          })
        });
        
        if (response.ok) {
          showNotification('Journal saved successfully!');
        } else {
          showNotification('Error saving journal', 'error');
        }
      } catch (error) {
        console.error('Network error:', error);
        showNotification('Network error, saved locally', 'warning');
      }
    });
  }
  
  // AI suggestion functionality
  if (aiSuggestionButton) {
    aiSuggestionButton.addEventListener('click', async () => {
      const journalContent = journalEditor.value;
      
      try {
        const response = await fetch('/ai_message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: journalContent,
            context: 'journal'
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          showAiSuggestion(data.message);
        }
      } catch (error) {
        console.error('Error getting AI suggestion:', error);
      }
    });
  }
  
  // Load journal entry from server or localStorage
  async function loadJournalEntry() {
    try {
      const response = await fetch('/get_journal');
      if (response.ok) {
        const data = await response.json();
        journalEditor.value = data.content;
      } else {
        // Fall back to localStorage
        const savedDraft = localStorage.getItem('journal_draft');
        if (savedDraft) {
          journalEditor.value = savedDraft;
        }
      }
    } catch (error) {
      console.error('Error loading journal:', error);
      const savedDraft = localStorage.getItem('journal_draft');
      if (savedDraft) {
        journalEditor.value = savedDraft;
      }
    }
  }
  
  // Show AI suggestion in UI
  function showAiSuggestion(message) {
    const suggestionBox = document.querySelector('.ai-suggestion-box') || 
                          document.createElement('div');
    
    if (!suggestionBox.classList.contains('ai-suggestion-box')) {
      suggestionBox.classList.add('ai-suggestion-box');
      journalEditor.parentNode.insertBefore(suggestionBox, journalEditor.nextSibling);
    }
    
    suggestionBox.innerHTML = `
      <div class="suggestion-content">
        <p>${message}</p>
        <div class="suggestion-actions">
          <button class="use-suggestion">Use This</button>
          <button class="dismiss-suggestion">Dismiss</button>
        </div>
      </div>
    `;
    
    suggestionBox.classList.add('active');
    
    // Handle suggestion actions
    suggestionBox.querySelector('.use-suggestion').addEventListener('click', () => {
      journalEditor.value += '\n\n' + message;
      suggestionBox.classList.remove('active');
    });
    
    suggestionBox.querySelector('.dismiss-suggestion').addEventListener('click', () => {
      suggestionBox.classList.remove('active');
    });
  }
  
  // Show notification message
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Trip mode functionality
function initTripMode() {
  const chatContainer = document.querySelector('.chat-container');
  const messageInput = document.querySelector('.message-input');
  const sendButton = document.querySelector('.send-message');
  const micButton = document.querySelector('.mic-button');
  
  if (!chatContainer || !messageInput) return;
  
  // Send message functionality
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      sendMessage();
    });
  }
  
  // Send message on Enter key
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Voice input functionality (placeholder)
  if (micButton) {
    micButton.addEventListener('click', () => {
      // In the future, this would activate voice recognition
      micButton.classList.toggle('active');
      if (micButton.classList.contains('active')) {
        showNotification('Voice recognition activated');
      } else {
        showNotification('Voice recognition deactivated');
      }
    });
  }
  
  // Send message to the AI and display in chat
  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    messageInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai typing';
    typingIndicator.innerHTML = '<div class="dot-typing"></div>';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    try {
      // Send message to AI
      const response = await fetch('/ai_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          context: 'trip'
        })
      });
      
      // Remove typing indicator
      typingIndicator.remove();
      
      if (response.ok) {
        const data = await response.json();
        addMessageToChat('ai', data.message);
      } else {
        addMessageToChat('ai', "I'm having trouble connecting. Take a deep breath, and try again in a moment.");
      }
    } catch (error) {
      // Remove typing indicator
      typingIndicator.remove();
      console.error('Error sending message:', error);
      addMessageToChat('ai', "I seem to be disconnected. Remember you're safe, and this will pass.");
    }
  }
  
  // Add message to the chat container
  function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.textContent = message;
    
    messageElement.appendChild(textElement);
    chatContainer.appendChild(messageElement);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}