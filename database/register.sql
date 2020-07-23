CREATE TABLE register(
id SERIAL PRIMARY KEY,
username VARCHAR(255)  UNIQUE CHECK (username != ''),
email VARCHAR(255)  UNIQUE CHECK (email != ''),
password VARCHAR(255)  CHECK (password != ''),
external_type varchar(255),
external_id   varchar(255) UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
