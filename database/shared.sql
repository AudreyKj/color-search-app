CREATE TABLE shared(
  id SERIAL PRIMARY KEY,
  palette VARCHAR,
  username VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
