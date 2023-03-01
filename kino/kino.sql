SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `screen` int(11) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `movies` (`id`, `name`, `screen`, `time`, `date`) VALUES
(1, 'BatMan', 1, '12:00:00', '2021-10-19'),
(2, 'Resident Evil', 2, '15:45:00', '2021-10-20'),
(3, 'Transformers', 3, '12:00:00', '2021-10-15');

CREATE TABLE `reservations` (
  `seat` int(11) NOT NULL,
  `row` int(11) NOT NULL,
  `movie` int(11) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `reservations` (`seat`, `row`, `movie`, `user`) VALUES
(5, 10, 1, 1),
(6, 10, 1, 3),
(3, 1, 2, 3),
(4, 1, 2, 3),
(5, 1, 2, 3),
(6, 1, 2, 3),
(7, 1, 2, 3),
(7, 1, 2, 3),
(8, 1, 2, 3),
(4, 1, 2, 3),
(5, 1, 2, 3),
(5, 13, 2, 3),
(7, 13, 2, 3),
(5, 14, 2, 3),
(6, 14, 2, 3),
(7, 14, 2, 3),
(5, 15, 2, 3),
(7, 15, 2, 3),
(5, 4, 1, 3),
(6, 4, 1, 3),
(7, 4, 1, 3),
(6, 7, 2, 3),
(7, 8, 2, 3),
(8, 9, 2, 3),
(7, 5, 1, 3),
(8, 5, 1, 3),
(4, 2, 3, 3),
(5, 2, 3, 3),
(7, 2, 3, 3),
(6, 2, 3, 3),
(5, 7, 1, 3),
(6, 8, 1, 3),
(7, 9, 1, 3),
(7, 14, 1, 3),
(8, 14, 1, 3),
(9, 14, 1, 3),
(13, 5, 2, 4),
(17, 5, 2, 4),
(12, 6, 2, 4),
(14, 6, 2, 4),
(16, 6, 2, 4),
(18, 6, 2, 4),
(11, 7, 2, 4),
(15, 7, 2, 4),
(19, 7, 2, 4),
(12, 8, 2, 4),
(18, 8, 2, 4),
(13, 9, 2, 4),
(17, 9, 2, 4),
(14, 10, 2, 4),
(16, 10, 2, 4),
(15, 11, 2, 4),
(1, 8, 2, 4),
(5, 6, 2, 4),
(6, 6, 2, 4),
(7, 6, 2, 4),
(8, 6, 2, 4),
(8, 6, 3, 4),
(10, 6, 3, 4),
(9, 6, 3, 4);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `mail` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `username`, `password`, `phonenumber`, `mail`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '123456789', 'admin@admin.com'),
(3, 'aa', '4124bc0a9335c27f086f24ba207a4912', '123456789', 'aa@aa'),
(4, 'janczek', '7eacf3ec79755216acffe658efa6ab70', '123412341', 'krzysiek@gmail.com');

ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `reservations`
  ADD KEY `movie` (`movie`),
  ADD KEY `user` (`user`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`movie`) REFERENCES `movies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;