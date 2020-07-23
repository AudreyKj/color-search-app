CREATE TABLE register(
id SERIAL PRIMARY KEY,
username VARCHAR(255)  UNIQUE CHECK (username != ''),
email VARCHAR(255)  UNIQUE CHECK (email != ''),
password VARCHAR(255)  CHECK (password != ''),
EXTERNAL_TYPE varchar(16),   
EXTERNAL_ID   varchar(64),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
