from flask import Flask, request, jsonify
from flask_cors import CORS
import math
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Constants for tolerance calculation
TOLERANCE_DECAY_RATES = {
    "lsd": 0.27,  # Exponential decay constant for LSD
    "psilocybin": 0.32  # Exponential decay constant for psilocybin
}


@app.route('/api/calculate-tolerance', methods=['POST'])
def calculate_tolerance():
    try:
        data = request.json

        # Extract data from the request
        substance = data['substance'].lower()
        last_dose_date_str = data['lastDoseDate']
        last_dose_amount = float(data['lastDoseAmount'])
        current_date_str = data['currentDate']
        desired_effect = float(data['desiredEffect'])

        # Convert string dates to datetime objects
        last_dose_date = datetime.strptime(last_dose_date_str, '%Y-%m-%d')
        current_date = datetime.strptime(current_date_str, '%Y-%m-%d')

        # Calculate days since last dose
        days_since_last_dose = (current_date - last_dose_date).days

        # Get the decay rate for the selected substance
        k = TOLERANCE_DECAY_RATES.get(substance, 0.27)  # Default to LSD if substance not found

        # Calculate tolerance (percentage)
        tolerance_factor = math.exp(-k * days_since_last_dose)
        tolerance_percentage = tolerance_factor * 100

        # Calculate recommended dose for equivalent effect
        recommended_dose = last_dose_amount / (1 - tolerance_factor + 0.001) * desired_effect

        # Generate tolerance decay data points for graph (14 days)
        graph_data = []
        for day in range(15):  # 0 to 14 days
            tolerance = math.exp(-k * day) * 100
            graph_data.append({
                'day': day,
                'tolerance': round(tolerance, 2)
            })

        return jsonify({
            'daysSinceLastDose': days_since_last_dose,
            'tolerancePercentage': round(tolerance_percentage, 2),
            'recommendedDose': round(recommended_dose, 2),
            'graphData': graph_data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)