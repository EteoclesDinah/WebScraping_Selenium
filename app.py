from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Route to return a hello message from the backend
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello and Welcome!!'})


# Route to save URLs to a CSV file and run form.py script
@app.route('/api/extract_data', methods=['POST'])
def extract_data():
    data = request.get_json()

    if 'urls' in data:            #urls used instead of keyword. work is done for keyword
        urls = data['urls']
        # Save keyword to CSV file
        with open('keyword.csv', mode='w', newline='') as file:
            writer = csv.writer(file)
            for url in urls:
                writer.writerow([url])

        # First, run trying_keyword.py to extract the url of the given keyword
        try:

            result_trying_keyword = subprocess.run(['python', 'trying_keyword.py'], capture_output=True, text=True)

            # Print the output to diagnose any issues
            print(f"Trying_keyword.py STDOUT: {result_trying_keyword.stdout}")
            print(f"Trying_keyword.py STDERR: {result_trying_keyword.stderr}")
            print(f"Trying_keyword.py Return code: {result_trying_keyword.returncode}")

            if result_trying_keyword.returncode != 0:
                # If trying_keyword.py fails, return an error response
                return jsonify({'error': 'Failed to run trying_keyword.py', 'details': result_trying_keyword.stderr}), 500

        except Exception as e:
            return jsonify({'error': str(e)}), 500

        # Then, run form.py to extract content
        try:
            result_form = subprocess.run(['python', 'form.py'], capture_output=True, text=True)

            # Print the output to diagnose any issues
            print(f"Form.py STDOUT: {result_form.stdout}")
            print(f"Form.py STDERR: {result_form.stderr}")
            print(f"Form.py Return code: {result_form.returncode}")

            if result_form.returncode == 0:
                return jsonify({'message': 'Both scripts finished successfully!', 'output': 'Data has been scraped successfully.'}), 200
            else:
                return jsonify({'error': 'Failed to run form.py', 'details': result_form.stderr}), 500

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    else:
        return jsonify({'error': 'No URLs provided', 'output': 'Failed to save URLs'}), 400

if __name__ == '__main__':
    app.run(debug=True)