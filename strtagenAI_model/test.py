from flask import Flask, request, jsonify
from transformers import pipeline, set_seed
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the seed for reproducibility
set_seed(42)

generator = None

try:
    # Create a text generation pipeline using the Llama-2-7B marketing model
    generator = pipeline("text-generation", model="dekomori09/llama-2-7b-marketing", device=0)  # Device 0 indicates CPU, change to -1 for GPU if available
except RuntimeError as e:
    print("Error:", e)
    generator = None

@app.route('/api/generate', methods=['POST'])
def generate_text():
    try:
        # Check if the generator is initialized
        if generator is None:
            return jsonify({"error": "Model is not available"}), 500

        # Get input text from the request
        input_text = request.json.get('input_text', '')

        # Generate response using the model
        response = generator(input_text, max_length=50, num_return_sequences=1)

        # Extract generated text from the response
        generated_text = response[0]['generated_text']

        # Return the generated text as JSON response
        return jsonify({"generated_text": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
