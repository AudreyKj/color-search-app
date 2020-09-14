CREATE TABLE saved(
  id SERIAL PRIMARY KEY,
  palette VARCHAR,
  tag VARCHAR,
  user_id INT NOT NULL REFERENCES register(id),
  username VARCHAR,
  shared VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
