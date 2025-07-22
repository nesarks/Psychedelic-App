/**
 * Trip mode functionality for Mindful Journey
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load trip preparation data if available
    const tripPrep = JSON.parse(localStorage.getItem('tripPreparation') || '{}');
    
    // Display intention from trip preparation
    if (tripPrep.intention && tripPrep.intention.type) {
        document.getElementById('intentionDisplay').textContent = tripPrep.intention.type;
    }
    
    // Start time tracking
    let tripStartTime = new Date();
    let elapsedTimeInterval = setInterval(updateElapsedTime, 1000);
    
    function updateElapsedTime() {
        const now = new Date();
        const diff = now - tripStartTime;
        
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        document.getElementById('timeElapsed').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Emergency exit button
    document.getElementById('emergencyExitBtn').addEventListener('click', function() {
        document.getElementById('exitModal').classList.remove('hidden');
    });
    
    document.getElementById('stayInTripMode').addEventListener('click', function() {
        document.getElementById('exitModal').classList.add('hidden');
    });
    
    // Message input functionality
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessageToChat(message, 'user');
            input.value = '';
            
            // Send message to backend (simulated)
            handleMessage(message);
        }
    }
    
    function addMessageToChat(message, sender) {
        const chatContainer = document.getElementById('chatContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-glow bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 max-w-3xl mx-auto';
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex items-start flex-row-reverse">
                    <div class="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center ml-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-white mb-1">${message}</p>
                        <span class="text-xs text-neutral-400">${time}</span>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-white mb-1">${message}</p>
                        <span class="text-xs text-neutral-400">${time}</span>
                    </div>
                </div>
            `;
        }
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function handleMessage(message) {
        // This would normally call your Flask backend
        // For now, we'll simulate AI responses
        
        message = message.toLowerCase();
        
        setTimeout(() => {
            let response;
            
            // Basic pattern matching for common situations
            if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
                response = "I notice you're feeling anxious. Remember that anxiety is a normal part of the psychedelic experience. Try taking some deep breaths with me - breathe in for 4 counts, hold for 4, exhale for 4. Would you like to try our guided breathing exercise?";
            } 
            else if (message.includes('scared') || message.includes('fear') || message.includes('terrified')) {
                response = "It's okay to feel fear during your journey. Fear often has something to teach us. Can you try to approach it with curiosity rather than resistance? What specifically feels scary right now?";
            }
            else if (message.includes('beautiful') || message.includes('amazing') || message.includes('wow')) {
                response = "It sounds like you're having a beautiful experience. Stay present with these feelings and allow yourself to fully receive them. Would you like to describe what you're seeing or feeling in more detail?";
            }
            else if (message.includes('confused') || message.includes('lost') || message.includes("don't understand")) {
                response = "Confusion is common during psychedelic experiences. Try not to analyze too much in the moment - sometimes meaning becomes clear later. Focus on your breath and the present moment. What are you experiencing right now?";
            }
            else if (message.includes('music') || message.includes('song') || message.includes('playlist')) {
                response = "Music can be a wonderful guide during your journey. You can use the music controls on the right side of the screen to play calming sounds. What kind of music would feel supportive right now?";
            }
            else if (message.includes('breathe') || message.includes('breathing')) {
                response = "Focusing on your breath is an excellent anchor. Let's try a simple breathing exercise: breathe in slowly through your nose for 4 seconds, hold for 4, then exhale through your mouth for 6 seconds. I'll be here breathing with you.";
            }
            else if (message.includes('who am i') || message.includes('meaning') || message.includes('purpose')) {
                response = "These profound questions often arise during psychedelic experiences. Rather than seeking immediate answers, perhaps sit with the question itself. What feelings arise when you ask this? Sometimes the journey is about the question, not the answer.";
            }
            else if (message.includes('help') || message.includes('grounding')) {
                response = "I'm here to help you stay grounded. Remember that you've taken a substance and its effects are temporary. Try the 5-4-3-2-1 technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.";
            }
            else if (message.includes('intense') || message.includes('too much') || message.includes('overwhelming')) {
                                response = "When things feel intense or overwhelming, remember that you are safe and this feeling will pass. Try changing your environment slightly - perhaps adjust the lighting, change position, or focus on a simple object nearby. Would you like to try a grounding exercise?";
            }
            else if (message.includes('dying') || message.includes('death') || message.includes('die')) {
                response = "Thoughts about mortality can come up during psychedelic experiences and are actually quite common. Remember that you are physically safe. These thoughts often represent psychological transformation rather than literal concerns. Stay with your breath and remember this feeling will pass.";
            }
            else if (message.includes('love') || message.includes('loved') || message.includes('loving')) {
                response = "Love is one of the most profound experiences we can have, and psychedelics often open us to greater feelings of connection and compassion. Would you like to explore this feeling more deeply?";
            }
            else if (message.includes('memory') || message.includes('childhood') || message.includes('remember')) {
                response = "Memories often surface during psychedelic journeys. They may be showing up now because there's something important for you to understand or integrate. How does this memory feel in your body? Is there a message or meaning that seems important?";
            }
            else if (message.includes('thank you') || message.includes('thanks')) {
                response = "You're welcome. I'm here to support your journey whenever you need me. How are you feeling right now?";
            }
            else {
                // Default responses if no pattern matches
                const defaultResponses = [
                    "Thank you for sharing that. How is this experience making you feel in your body?",
                    "I'm here with you throughout this journey. What else are you noticing right now?",
                    "That's interesting. Would you like to explore that feeling or experience more deeply?",
                    "I hear you. Remember that whatever you're experiencing is temporary and part of your journey. Would it help to try a grounding exercise?",
                    "It sounds like you're having a meaningful experience. Is there anything you need support with right now?"
                ];
                response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            }
            
            addMessageToChat(response, 'ai');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
    }
    
    // Quick response buttons
    document.querySelectorAll('.quick-prompt').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('messageInput').value = this.textContent.trim();
            sendMessage();
        });
    });
    
    // Breathing exercise
    let breathingActive = false;
    let breathingInterval;
    
    document.getElementById('toggleBreathing').addEventListener('click', function() {
        const breathingCircle = document.getElementById('breathingCircle');
        const breathingText = document.getElementById('breathingText');
        
        if (!breathingActive) {
            // Start breathing exercise
            breathingActive = true;
            this.textContent = 'Stop';
            breathingCircle.style.animation = 'none'; // Reset animation
            
            let phase = 'inhale';
            let counter = 4;
            
            breathingInterval = setInterval(() => {
                if (phase === 'inhale') {
                    breathingText.textContent = `Breathe in... ${counter}`;
                    breathingCircle.style.transform = `scale(${1 + (0.2 * (4 - counter) / 4)})`;
                    counter--;
                    
                    if (counter < 0) {
                        phase = 'hold1';
                        counter = 4;
                    }
                } else if (phase === 'hold1') {
                    breathingText.textContent = `Hold... ${counter}`;
                    counter--;
                    
                    if (counter < 0) {
                        phase = 'exhale';
                        counter = 4;
                    }
                } else if (phase === 'exhale') {
                    breathingText.textContent = `Breathe out... ${counter}`;
                    breathingCircle.style.transform = `scale(${1.2 - (0.2 * (4 - counter) / 4)})`;
                    counter--;
                    
                    if (counter < 0) {
                        phase = 'hold2';
                        counter = 4;
                    }
                } else if (phase === 'hold2') {
                    breathingText.textContent = `Hold... ${counter}`;
                    counter--;
                    
                    if (counter < 0) {
                        phase = 'inhale';
                        counter = 4;
                    }
                }
            }, 1000);
        } else {
            // Stop breathing exercise
            breathingActive = false;
            this.textContent = 'Start';
            clearInterval(breathingInterval);
            breathingText.textContent = 'Breathe in...';
            breathingCircle.style.animation = 'breathe 8s ease-in-out infinite';
            breathingCircle.style.transform = 'scale(1)';
        }
    });
    
    // Music controls
    document.querySelectorAll('.music-toggle').forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.trim() === 'Play') {
                // Reset all buttons to "Play"
                document.querySelectorAll('.music-toggle').forEach(btn => {
                    btn.textContent = 'Play';
                    btn.classList.remove('bg-secondary-600');
                });
                
                // Set this button to "Stop"
                this.textContent = 'Stop';
                this.classList.add('bg-secondary-600');
                
                // In a real app, this would trigger playing the sound
                // playSound(this.dataset.sound);
                
                // Add feedback message to chat
                const musicType = this.parentElement.previousElementSibling.textContent;
                addMessageToChat(`${musicType} started playing. You can stop it anytime using the controls.`, 'ai');
            } else {
                this.textContent = 'Play';
                this.classList.remove('bg-secondary-600');
                // stopSound();
            }
        });
    });
    
    // Grounding techniques
    const groundingTechniques = {
        '5-4-3-2-1 Sensory Exercise': `
            <p class="mb-3">This technique helps anchor you to the present moment using your five senses:</p>
            <ol class="space-y-2">
                <li><strong>5 things you can see</strong> - Look around and name 5 things you can see</li>
                <li><strong>4 things you can touch/feel</strong> - Notice 4 things you can physically feel</li>
                <li><strong>3 things you can hear</strong> - Listen for 3 distinct sounds</li>
                <li><strong>2 things you can smell</strong> - Notice 2 things you can smell (or like to smell)</li>
                <li><strong>1 thing you can taste</strong> - Notice 1 thing you can taste right now</li>
            </ol>
            <p class="mt-3">Take your time with each step, fully experiencing each sensation.</p>
        `,
        'Box Breathing': `
            <p class="mb-3">Box breathing is a simple technique for regulating your breath:</p>
            <ol class="space-y-2">
                <li><strong>Inhale</strong> slowly through your nose for 4 seconds</li>
                <li><strong>Hold</strong> your breath for 4 seconds</li>
                <li><strong>Exhale</strong> slowly through your mouth for 4 seconds</li>
                <li><strong>Hold</strong> the empty breath for 4 seconds</li>
            </ol>
            <p class="mt-3">Repeat this cycle for 2-3 minutes or until you feel centered.</p>
        `,
        'Body Scan': `
            <p class="mb-3">A body scan helps you reconnect with physical sensations:</p>
            <p class="mb-2">Start by bringing awareness to your feet and slowly move up through your body.</p>
            <ul class="space-y-2">
                <li>Notice any sensations in your feet, legs, hips...</li>
                <li>Continue to your torso, back, chest, shoulders...</li>
                <li>Then to your arms, hands, neck, and finally your head</li>
            </ul>
            <p class="mt-3">For each area, simply notice any sensations without judgment - heaviness, lightness, warmth, tension, etc.</p>
        `
    };
    
    document.getElementById('grounding5things').addEventListener('click', function() {
        showGroundingModal('5-4-3-2-1 Sensory Exercise');
    });
    
    document.getElementById('groundingBreath').addEventListener('click', function() {
        showGroundingModal('Box Breathing');
    });
    
    document.getElementById('groundingBodyScan').addEventListener('click', function() {
        showGroundingModal('Body Scan');
    });
    
    function showGroundingModal(technique) {
        document.getElementById('groundingTitle').textContent = technique;
        document.getElementById('groundingContent').innerHTML = groundingTechniques[technique];
        document.getElementById('groundingModal').classList.remove('hidden');
        
        // Add message to chat
        addMessageToChat(`I've opened the ${technique} guidance for you. This can help you feel more grounded.`, 'ai');
    }
    
    document.getElementById('closeGroundingModal').addEventListener('click', function() {
        document.getElementById('groundingModal').classList.add('hidden');
    });
    
    // Insight journal
    document.getElementById('captureInsight').addEventListener('click', function() {
        document.getElementById('insightModal').classList.remove('hidden');
    });
    
    document.getElementById('closeInsightModal').addEventListener('click', function() {
        document.getElementById('insightModal').classList.add('hidden');
    });
    
    document.getElementById('saveInsight').addEventListener('click', function() {
        const insight = document.getElementById('insightText').value.trim();
        
        if (insight) {
            // Store in localStorage
            const insights = JSON.parse(localStorage.getItem('insights') || '[]');
            insights.push({
                text: insight,
                timestamp: new Date().toISOString(),
                user: 'nesarks',
                created: '2025-07-22 06:24:43'
            });
            localStorage.setItem('insights', JSON.stringify(insights));
            
            // Clear and close modal
            document.getElementById('insightText').value = '';
            document.getElementById('insightModal').classList.add('hidden');
            
            // Show confirmation
            addMessageToChat("Your insight has been saved to your journal for later reflection.", "ai");
        }
    });
    
    // Background animation effect
    function animateBackground() {
        const body = document.body;
        let hue = 260; // Start with purple
        
        setInterval(() => {
            hue = (hue + 0.1) % 360; // Slowly shift hue
            body.style.background = `linear-gradient(to bottom right, 
                hsl(${hue}, 70%, 20%), 
                hsl(${(hue + 60) % 360}, 70%, 15%))`;
        }, 100);
    }
    
    // Uncomment to enable animated background
    // animateBackground();
    
    // Add initial welcoming message after a short delay
    setTimeout(() => {
        // Get the substance type from preparation if available
        let substanceMessage = '';
        if (tripPrep.substance && tripPrep.substance.type) {
            substanceMessage = ` I see you're working with ${tripPrep.substance.type}. `;
        }
        
        const welcomeMessage = `I'm here to support your journey.${substanceMessage}How are you feeling as you begin?`;
        addMessageToChat(welcomeMessage, 'ai');
    }, 3000);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC key to show exit modal
        if (e.key === 'Escape') {
            document.getElementById('exitModal').classList.remove('hidden');
        }
        
        // Shortcut keys with Ctrl or Cmd
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'b' || e.key === 'B') {
                // Ctrl+B for breathing exercise
                e.preventDefault();
                document.getElementById('toggleBreathing').click();
            } else if (e.key === 'j' || e.key === 'J') {
                // Ctrl+J for journal
                e.preventDefault();
                document.getElementById('captureInsight').click();
            }
        }
    });
    
    // Simulated "typing" indicator for AI responses
    function showTypingIndicator() {
        const chatContainer = document.getElementById('chatContainer');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'message-glow bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 max-w-3xl mx-auto';
        
        typingDiv.innerHTML = `
            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div class="flex space-x-1">
                    <div class="w-2 h-2 rounded-full bg-white animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-2 h-2 rounded-full bg-white animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 rounded-full bg-white animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(typingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        return typingDiv;
    }
    
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Enhanced message handling with typing indicator
    const originalHandleMessage = handleMessage;
    handleMessage = function(message) {
        const typingIndicator = showTypingIndicator();
        
        // Simulate API call delay
        setTimeout(() => {
            removeTypingIndicator();
            originalHandleMessage(message);
        }, 1000 + Math.random() * 1500);
    };
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(elapsedTimeInterval);
        if (breathingInterval) {
            clearInterval(breathingInterval);
        }
    });
    
    // Initialize the time elapsed display
    updateElapsedTime();
});