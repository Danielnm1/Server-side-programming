-- Drop tables if they already exist to start clean
DROP TABLE IF EXISTS wsk_cats;
DROP TABLE IF EXISTS wsk_users;

-- 1. Create Users Table
CREATE TABLE wsk_users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

-- 2. Create Cats Table
CREATE TABLE wsk_cats (
  cat_id INT AUTO_INCREMENT PRIMARY KEY,
  cat_name VARCHAR(100) NOT NULL,
  weight DOUBLE NOT NULL,
  owner INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  FOREIGN KEY (owner) REFERENCES wsk_users(user_id) ON DELETE CASCADE
);

-- 3. Insert Sample Users
INSERT INTO wsk_users (name, username, email, password, role) VALUES
('John Doe', 'johndoe', 'john@example.com', 'password123', 'admin'),
('Jane Smith', 'janesmith', 'jane@example.com', 'password123', 'user');

-- 4. Insert Sample Cats
INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES
('Frank', 5.5, 1, 'cat1.jpg', '2020-04-15'),
('Garfield', 7.2, 2, 'cat2.jpg', '2019-06-19');