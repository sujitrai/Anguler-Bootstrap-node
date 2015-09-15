-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 14, 2015 at 04:20 PM
-- Server version: 5.5.44
-- PHP Version: 5.3.10-1ubuntu3.19

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `myDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(500) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `skills` varchar(500) NOT NULL,
  `employer` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `name`, `type`, `password`, `skills`, `employer`) VALUES
('abc@xyz.com', 'abc xyz', 'candidate', 'a9993e364706816aba3e25717850c26c9cd0d89d', 'javascript,hadoop,.net', '---'),
('ac@jfkjjrr.com', 'pavan kumar', 'candidate', '87d8a17a753ed3949de363a7a1322291bf7290d7', 'DS,js', ''),
('pavak@gmail.com', 'pavan kumar', 'candidate', '87d8a17a753ed3949de363a7a1322291bf7290d7', 'DS,js', 'sujit--'),
('sujitrai.09@gmail.com', 'sujit', 'admin', '87d8a17a753ed3949de363a7a1322291bf7290d7', 'javascript,hadoop', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
