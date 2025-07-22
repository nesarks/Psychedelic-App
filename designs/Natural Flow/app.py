from flask import Flask, render_template, request, jsonify, session
import os
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'natural_flow_secret_key'  # Change in production

# In-memory data storage (replace with database in production)
USERS = {}

@app.route('/')
def home():
    """Render the home page with the growing tree"""
    return render_template('index.html')

@app.route('/prep')
def prep():
    """Render the preparation flow"""
    return render_template('prep.html')

@app.route('/journal')
def journal():
    """Render the journal view"""
    return render_template('journal.html')

@app.route('/trip')
def trip():
    """Render the trip mode view"""
    return render_template('trip.html')

@app.route('/anchor_tools')
def anchor_tools():
    """Render the anchor tools modal"""
    return render_template('anchor_modal.html')

@app.route('/start_trip', methods=['POST'])
def start_trip():
    """Handle the trip preparation form submission"""
    user_id = session.get('user_id', 'anonymous')
    
    # Extract form data
    intention = request.form.get('intention', '')
    mood = request.form.get('mood', '')
    concerns = request.form.get('concerns', '')
    environment_ready = request.form.get('environment_ready', 'no')
    environment_notes = request.form.get('environment_notes', '')
    support_person = request.form.get('support_person', 'no')
    comfort_item = request.form.get('comfort_item', '')
    timer_duration = request.form.get('timer_duration', 'none')
    
    # Create trip data
    trip_data = {
        'start_time': datetime.now().isoformat(),
        'intention': intention,
        'mood': mood,
        'concerns': concerns,
        'environment_ready': environment_ready,
        'environment_notes': environment_notes,
        'support_person': support_person,
        'comfort_item': comfort_item,
        'timer_duration': timer_duration,
        'messages': []
    }
    
    # Store in user data
    if user_id not in USERS:
        USERS[user_id] = {'trips': []}
    
    USERS[user_id]['trips'].append(trip_data)
    session['current_trip_index'] = len(USERS[user_id]['trips']) - 1
    
    return jsonify({'success': True})

@app.route('/log_trip', methods=['POST'])
def log_trip():
    """Log the completion of a trip"""
    user_id = session.get('user_id', 'anonymous')
    trip_index = session.get('current_trip_index', 0)
    
    if user_id in USERS and trip_index < len(USERS[user_id]['trips']):
        USERS[user_id]['trips'][trip_index]['end_time'] = datetime.now().isoformat()
        
        # Update tree growth in user profile
        trip_count = len(USERS[user_id]['trips'])
        tree_stage = 'seedling'
        
        if trip_count >= 1 and trip_count <= 2:
            tree_stage = 'sapling'
        elif trip_count >= 3 and trip_count <= 5:
            tree_stage = 'young'
        elif trip_count >= 6 and trip_count <= 9:
            tree_stage = 'mature'
        elif trip_count >= 10:
            tree_stage = 'flourishing'
        
        if 'profile' not in USERS[user_id]:
            USERS[user_id]['profile'] = {}
        
        USERS[user_id]['profile']['tree_stage'] = tree_stage
        USERS[user_id]['profile']['trip_count'] = trip_count
        
        return jsonify({'success': True, 'tree_stage': tree_stage})
    
    return jsonify({'success': False, 'error': 'No active trip found'})

@app.route('/ai_message', methods=['POST'])
def ai_message():
    """Process a message to the AI assistant"""
    data = request.json
    message = data.get('message', '')
    context = data.get('context', 'trip')
    
    # In a real implementation, this would call an AI service
    # For now, we'll return predefined responses based on context
    
    if context == 'trip':
        # Simple keywords to demonstrate different response types
        if 'anxious' in message.lower() or 'scared' in message.lower():
            response = "It's completely normal to feel anxious. Try taking three deep breaths with me. Remember that you're safe, and this feeling will pass. What's one thing you can see right now that brings you comfort?"
        elif 'beautiful' in message.lower() or 'amazing' in message.lower():
            response = "I'm glad you're having a positive experience. What aspects feel most meaningful to you right now?"
        elif 'confused' in message.lower():
            response = "Confusion can be part of the process. There's no need to understand everything right now. Can you describe what you're experiencing without trying to analyze it?"
        else:
            response = "I'm here with you. Take your time to explore what you're experiencing. Would you like to share more about what you're noticing?"
    
    elif context == 'journal':
        # AI suggestions for journaling
        if len(message) < 50:
            response = "Consider expanding on your thoughts. What emotions came up during your experience? What insights feel most significant?"
        elif 'insight' in message.lower() or 'realize' in message.lower():
            response = "That sounds like an important insight. How might this understanding affect your daily life moving forward?"
        else:
            response = "You might want to reflect on how this experience connects to patterns in your life. Are there specific actions or changes you feel inspired to make?"
    
    # Store message in current trip if in trip context
    user_id = session.get('user_id', 'anonymous')
    trip_index = session.get('current_trip_index', 0)
    
    if context == 'trip' and user_id in USERS and trip_index < len(USERS[user_id]['trips']):
        USERS[user_id]['trips'][trip_index]['messages'].append({
            'time': datetime.now().isoformat(),
            'user': message,
            'ai': response
        })
    
    return jsonify({'message': response})

@app.route('/save_journal', methods=['POST'])
def save_journal():
    """Save a journal entry"""
    data = request.json
    content = data.get('content', '')
    journal_type = data.get('type', 'reflection')
    
    user_id = session.get('user_id', 'anonymous')
    trip_index = session.get('current_trip_index', 0)
    
    if user_id not in USERS:
        USERS[user_id] = {'trips': [], 'journals': []}
    elif 'journals' not in USERS[user_id]:
        USERS[user_id]['journals'] = []
    
    journal_entry = {
        'content': content,
        'type': journal_type,
        'created_at': datetime.now().isoformat(),
        'trip_index': trip_index if journal_type == 'reflection' else None
    }
    
    USERS[user_id]['journals'].append(journal_entry)
    
    return jsonify({'success': True})

@app.route('/get_journal', methods=['GET'])
def get_journal():
    """Retrieve the latest journal entry"""
    user_id = session.get('user_id', 'anonymous')
    
    if user_id in USERS and 'journals' in USERS[user_id] and USERS[user_id]['journals']:
        latest_journal = USERS[user_id]['journals'][-1]
        return jsonify(latest_journal)
    
    return jsonify({'content': '', 'type': 'intention'})

@app.route('/save_anchor', methods=['POST'])
def save_anchor():
    """Save user's comfort anchors"""
    data = request.json
    image = data.get('image', '')
    mantra = data.get('mantra', '')
    quote = data.get('quote', '')
    
    user_id = session.get('user_id', 'anonymous')
    
    if user_id not in USERS:
        USERS[user_id] = {}
    
    if 'anchors' not in USERS[user_id]:
        USERS[user_id]['anchors'] = {}
    
    USERS[user_id]['anchors'] = {
        'image': image,
        'mantra': mantra,
        'quote': quote,
        'updated_at': datetime.now().isoformat()
    }
    
    return jsonify({'success': True})

# Helper route to create a demo user account
@app.route('/demo_account', methods=['GET'])
def create_demo_account():
    """Create a demo account with some sample data"""
    demo_id = 'demo_user'
    session['user_id'] = demo_id
    
    # Create sample data
    USERS[demo_id] = {
        'profile': {
            'name': 'Demo User',
            'tree_stage': 'sapling',
            'trip_count': 2
        },
        'trips': [
            {
                'start_time': '2025-07-20T10:00:00',
                'end_time': '2025-07-20T12:30:00',
                'intention': 'To explore my creativity and find new perspectives',
                'mood': 'curious',
                'messages': []
            },
            {
                'start_time': '2025-07-22T09:00:00',
                'intention': 'To connect more deeply with myself and understand my patterns',
                'mood': 'open',
                'messages': []
            }
        ],
        'journals': [
            {
                'content': 'I want to approach this experience with openness and curiosity. My intention is to better understand my creative blocks.',
                'type': 'intention',
                'created_at': '2025-07-20T09:30:00'
            },
            {
                'content': 'Today\'s journey showed me how I\'ve been limiting myself with fear of judgment. I saw clearly how this pattern developed in childhood.',
                'type': 'reflection',
                'created_at': '2025-07-20T13:00:00',
                'trip_index': 0
            }
        ],
        'anchors': {
            'image': 'forest',
            'mantra': 'I am safe in this moment',
            'quote': 'The only way out is through.'
        }
    }
    
    session['current_trip_index'] = 1
    
    return jsonify({'success': True, 'message': 'Demo account created'})

if __name__ == '__main__':
    app.run(debug=True)