from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import json
import math
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3001"}})

# Enable debug mode if in development
if os.getenv('FLASK_ENV') == 'development':
    app.config['DEBUG'] = True

# --- Mock Data ---
# In a real application, this would come from a database.
def load_mock_posts():
    """Loads mock posts from a JSON file."""
    try:
        # Using a separate file for mock data to keep app.py clean.
        with open('mock_posts.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except (IOError, json.JSONDecodeError):
        # Return an empty list if the file doesn't exist or is invalid
        return []

# Load posts on startup and reload them if file changes
def get_posts_data():
    """Get posts data, reloading from file each time in development mode."""
    if app.config.get('DEBUG'):
        return load_mock_posts()
    else:
        # In production, cache the posts
        if not hasattr(get_posts_data, 'cached_posts'):
            get_posts_data.cached_posts = load_mock_posts()
        return get_posts_data.cached_posts

# --- API Routes ---

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to confirm the API is running."""
    return jsonify({
        "status": "ok", 
        "service": "backend-api",
        "debug_mode": app.config.get('DEBUG', False)
    })

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Endpoint to get all posts with pagination."""
    mock_posts = get_posts_data()
    
    if not mock_posts:
        return jsonify({
            "data": [],
            "pagination": { "page": 1, "limit": 10, "total": 0, "totalPages": 0 }
        })

    # Get query params for pagination, with default values
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except (ValueError, TypeError):
        page = 1
        limit = 10

    # Filter posts by category if provided
    category = request.args.get('category')
    filtered_posts = [post for post in mock_posts if not category or category == 'all' or post['category'] == category]

    total_posts = len(filtered_posts)
    total_pages = math.ceil(total_posts / limit)
    start_index = (page - 1) * limit
    end_index = start_index + limit
    
    paginated_posts = filtered_posts[start_index:end_index]
    
    response = {
        "data": paginated_posts,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total_posts,
            "totalPages": total_pages
        }
    }
    
    return jsonify(response)

@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Endpoint to get a single post by its ID."""
    mock_posts = get_posts_data()
    post = next((post for post in mock_posts if post['id'] == post_id), None)
    if post is None:
        abort(404, description=f"Post with id {post_id} not found")
    return jsonify(post)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """
    Endpoint to get all categories with their post counts.
    """
    mock_posts = get_posts_data()
    
    if not mock_posts:
        return jsonify([])
        
    category_counts = {}
    for post in mock_posts:
        cat = post['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1

    # Based on the frontend's categoryInfo
    category_info = {
      'xss': { 'name': 'XSS', 'icon': '🔥' },
      'sqli': { 'name': 'SQL Injection', 'icon': '💉' },
      'csrf': { 'name': 'CSRF', 'icon': '🔐' },
      'auth': { 'name': 'Authentication', 'icon': '🗝️' },
      'pentest': { 'name': 'Penetration Testing', 'icon': '⚔️' }
    }
    
    response_data = []
    for slug, info in category_info.items():
        response_data.append({
            "id": slug,
            "name": info['name'],
            "slug": slug,
            "icon": info['icon'],
            "post_count": category_counts.get(slug, 0)
        })
        
    return jsonify(response_data)

# --- Main execution ---
if __name__ == '__main__':
    # Running on port 5001 to avoid conflict with other services
    app.run(host='0.0.0.0', port=5001, debug=True) 