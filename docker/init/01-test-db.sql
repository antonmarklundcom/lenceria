-- La base de tests la borra y recrea el runner de vitest en cada corrida;
-- acá sólo nos aseguramos de que el usuario `lenceria` pueda hacerlo.
CREATE DATABASE IF NOT EXISTS `lenceria_test` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON `lenceria_test`.* TO 'lenceria'@'%';
GRANT CREATE, DROP ON *.* TO 'lenceria'@'%';
FLUSH PRIVILEGES;
