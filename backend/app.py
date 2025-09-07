from flask import Flask, request, jsonify
from partitions import getPartitions
from filters import getPartitionsOfLength, getPartitionsWithInclusion, getPartitionsWithExclusion
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_combinations', methods=['POST'])
def get_combinations():
    data = request.get_json()
    sum_value = data.get('sum_value')
    length = data.get('length')
    inclusion_numbers = data.get('inclusion_numbers', [])
    exclusion_numbers = data.get('exclusion_numbers', [])
    
    # Step 1: Get partitions
    partitions = getPartitions(sum_value)
    length_filtered = getPartitionsOfLength(length, partitions)
    # print("length_filtered-- ", length_filtered)

    # Step 2: Apply inclusion filter
    inclusion_filtered = []
    if inclusion_numbers:
        inclusion_filtered = getPartitionsWithInclusion(inclusion_numbers, length_filtered)
    else:
        inclusion_filtered = length_filtered
    # print("inclusion_filtered-- ", inclusion_filtered)

    # Step 3: Apply exclusion filter
    exclusion_filtered = []
    if exclusion_numbers:
        exclusion_filtered = getPartitionsWithExclusion(exclusion_numbers, inclusion_filtered)
    else:
        exclusion_filtered = inclusion_filtered
    # print("exclusion_filtered-- ", exclusion_filtered)

    # Check if combinations are possible
    if not exclusion_filtered:
        return jsonify({"error": "No combinations possible with the given input values."}), 200

    # Highlight inclusion numbers in the combinations
    highlighted_combinations = [
        {"combination": partition, "highlighted": [num in inclusion_numbers for num in partition]}
        for partition in exclusion_filtered
    ]
    # print("highlighted_combinations-- ", highlighted_combinations)

    # Return result
    return jsonify({
        "partitions": highlighted_combinations
    })

if __name__ == "__main__":
    app.run(debug=True)
