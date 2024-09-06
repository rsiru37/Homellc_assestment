DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS homes;
DROP TABLE IF EXISTS user_interests;

CREATE TABLE users (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(100) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    UNIQUE(`email`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE homes (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) DEFAULT NULL,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE user_interests (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `home_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`home_id`) REFERENCES `homes`(`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `users` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

INSERT INTO `homes` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

INSERT INTO `user_interests` (`user_id`, `home_id`) 
SELECT u.id,h.id
FROM 
  user_home uh JOIN users u ON uh.username = u.username AND uh.email = u.email JOIN homes h ON
  uh.street_address = h.street_address 
            AND uh.state = h.state
            AND uh.zip = h.zip
            AND uh.sqft = h.sqft
            AND uh.beds = h.beds
            AND uh.baths = h.baths
            AND uh.list_price = h.list_price;

DROP TABLE IF EXISTS user_home;