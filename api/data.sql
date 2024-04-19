-- Criação do banco de dados
CREATE DATABASE waiterappflask;

-- Conexão com o banco de dados
\c waiterappflask;

-- Criação da tabela categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10) NOT NULL
);

-- Inserção dos dados na tabela categories
INSERT INTO categories (name, icon) VALUES
('Pizza', '🍕'),
('Bebidas', '🍻'),
('Burgers', '🍔'),
('Promoções', '🏷');

-- Criação da tabela products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    imagePath VARCHAR(255),
    price NUMERIC(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    ingredients INTEGER[] REFERENCES ingredients(id) ON DELETE SET NULL
);

-- Inserção de alguns dados de exemplo na tabela products
INSERT INTO products (name, description, imagePath, price, category_id, ingredients) VALUES
('Margherita', 'Pizza com molho de tomate, muçarela e manjericão', 'margherita.png', 10.99, 1, '{1, 2}'),
('Coca-Cola', 'Refrigerante de cola em lata', 'cola.png', 2.5, 2, NULL),
('Cheeseburger', 'Hambúrguer com queijo, alface, tomate e maionese', 'cheeseburger.png', 8.99, 3, '{2, 3}');

-- Criação da tabela orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    table_number VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('WAITING', 'IN_PRODUCTION', 'DONE')),
    products INTEGER[] NOT NULL
);

-- Inserção de alguns dados de exemplo na tabela orders
INSERT INTO orders (order_id, table_number, status, products) VALUES
('6372d5dcf9ebdda354700c95', 'Table 1', 'WAITING', '{1, 3}'),
('6372d5dcf9ebdda354700c96', 'Table 2', 'IN_PRODUCTION', '{2}');
