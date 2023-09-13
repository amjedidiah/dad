--------------------
--------------------
-- TABLE SCHEMAS ---
--------------------
--------------------

-- Users Table Schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(255) UNIQUE,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Books Table Schema
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  average_rating DECIMAL DEFAULT 0,
  back_cover VARCHAR(255) NOT NULL,
  copies_sold INTEGER DEFAULT 0,
  foreword_author_name VARCHAR(255),
  foreword_author_title VARCHAR(255),
  foreword_content VARCHAR(5000),
  front_cover VARCHAR(255) NOT NULL,
  is_best_selling BOOLEAN DEFAULT FALSE,
  price NUMERIC(10, 2) NOT NULL,
  publish_date DATE,
  publisher VARCHAR(255),
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_title UNIQUE(title)
);

-- Ratings Table Schema
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content_id INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL CHECK (type IN ('book')),
  review TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (content_id) REFERENCES books(id) ON DELETE CASCADE
);



--------------------
--------------------
----- INDEXES ------
--------------------
--------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone_number ON users(phone_number);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_content_id ON ratings(content_id);
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_title ON books(title);



--------------------
--------------------
----- FUNCTIONS ----
--------------------
--------------------

-- Create a function that calculates and updates the average rating
CREATE OR REPLACE FUNCTION calculate_average_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE books
  SET average_rating = (
    SELECT AVG(rating) FROM ratings WHERE content_id = NEW.content_id AND approved = TRUE
  )
  WHERE id = NEW.content_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function that updates the best-selling book
CREATE OR REPLACE FUNCTION update_best_selling_book()
RETURNS TRIGGER AS $$
BEGIN
  -- Find the book with the highest copies_sold
  DECLARE
    best_selling_book_id INT;
  BEGIN
    SELECT id INTO best_selling_book_id
    FROM books
    ORDER BY copies_sold DESC
    LIMIT 1;

    -- Update is_best_selling for all books
    UPDATE books
    SET is_best_selling = (id = best_selling_book_id);
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function to generate a slug from the title
CREATE OR REPLACE FUNCTION generate_book_slug(title VARCHAR(255))
RETURNS VARCHAR(255) AS $$
DECLARE
  result_slug VARCHAR(255);
BEGIN
  -- Remove special characters and spaces from the title
  result_slug := regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g');

  -- Convert to lowercase
  result_slug := lower(result_slug);

  RETURN result_slug;
END;
$$ LANGUAGE plpgsql;

-- Create a function to generate cover URLs from the slug
CREATE OR REPLACE FUNCTION generate_cover_url_from_slug(slug VARCHAR(255), cover_type VARCHAR(10))
RETURNS VARCHAR(255) AS $$
DECLARE
  base_url VARCHAR(255) := '/images/books/';
  result_url VARCHAR(255);
BEGIN
  -- Construct the final URL based on cover type (front or back)
  IF cover_type = 'front' THEN
    result_url := base_url || slug || '/front_cover.webp';
  ELSIF cover_type = 'back' THEN
    result_url := base_url || slug || '/back_cover.webp';
  ELSE
    -- Handle other cases or validation if needed
    result_url := '';
  END IF;

  RETURN result_url;
END;
$$ LANGUAGE plpgsql;



--------------------
--------------------
----- TRIGGERS -----
--------------------
--------------------
-- Create a trigger that fires after every INSERT or UPDATE on the ratings table
CREATE TRIGGER update_average_rating
AFTER INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION calculate_average_rating();

-- Create a trigger that fires after every INSERT or UPDATE on the books table
CREATE TRIGGER trigger_update_best_selling_book_books
AFTER UPDATE ON books
FOR EACH ROW
WHEN (OLD.copies_sold IS DISTINCT FROM NEW.copies_sold)
EXECUTE FUNCTION update_best_selling_book();

-- Create a trigger that generates a slug before inserting a book record
CREATE OR REPLACE FUNCTION generate_slug_before_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate the slug from the title
  NEW.slug := generate_book_slug(NEW.title);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires before every INSERT on the books table
CREATE TRIGGER trigger_generate_slug_before_insert
BEFORE INSERT ON books
FOR EACH ROW
EXECUTE FUNCTION generate_slug_before_insert();

-- Create a trigger that generates the front cover URL before inserting a book record
CREATE OR REPLACE FUNCTION generate_front_cover_url_from_slug_before_insert()
RETURNS TRIGGER AS $$
BEGIN

  -- Generate the slug from the title
  NEW.slug := generate_book_slug(NEW.title);

  -- Generate the front cover URL from the slug
  NEW.front_cover := generate_cover_url_from_slug(NEW.slug, 'front');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that generates the back cover URL before inserting a book record
CREATE OR REPLACE FUNCTION generate_back_cover_url_from_slug_before_insert()
RETURNS TRIGGER AS $$
BEGIN

  -- Generate the slug from the title
  NEW.slug := generate_book_slug(NEW.title);

  -- Generate the back cover URL from the slug
  NEW.back_cover := generate_cover_url_from_slug(NEW.slug, 'back');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers that fire before every INSERT on the books table
CREATE TRIGGER trigger_generate_front_cover_url_from_slug_before_insert
BEFORE INSERT ON books
FOR EACH ROW
EXECUTE FUNCTION generate_front_cover_url_from_slug_before_insert();

CREATE TRIGGER trigger_generate_back_cover_url_from_slug_before_insert
BEFORE INSERT ON books
FOR EACH ROW
EXECUTE FUNCTION generate_back_cover_url_from_slug_before_insert();



--------------------
--------------------
---- INSERTIONS ----
--------------------
--------------------
-- Books Insertion
INSERT INTO books (title, price, publisher, publish_date, foreword_author_name, foreword_author_title, foreword_content, copies_sold)
VALUES ('The Royal Bride', 1.99, 'Change Publications Limited', '2021-08-01', 'Camillus Ukah', 'President, Association of Nigerian Authors (ANA)', '<p>Innovative and compelling, the story touches the other side of romance when a very eligible bachelor, who had made a hobby of rejecting professionally accomplished and elegant young ladies, finds love in a forbidden place. The author sheds a new light on the function of the story as escort</p>', 20);
