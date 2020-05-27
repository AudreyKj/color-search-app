CREATE table user_profiles(
  id SERIAL PRIMARY KEY,
  age INT,
  country VARCHAR,
  gender VARCHAR,
  user_id INT NOT NULL UNIQUE REFERENCES register(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
