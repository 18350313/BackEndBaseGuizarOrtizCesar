-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Asphalt8`
--

DROP TABLE IF EXISTS `Asphalt8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Asphalt8` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Marca` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Color` varchar(255) NOT NULL,
  `Clase` char(1) NOT NULL,
  `RangoInicial` int(5) NOT NULL,
  `RangoMax` int(5) NOT NULL,
  `Aceleracion` double(3,2) NOT NULL,
  `VelocidadMax` double(4,1) NOT NULL,
  `Manejo` double(4,3) NOT NULL,
  `Nitro` double(3,1) NOT NULL,
  `Precio` int(7) NOT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Asphalt8`
--

LOCK TABLES `Asphalt8` WRITE;
/*!40000 ALTER TABLE `Asphalt8` DISABLE KEYS */;
INSERT INTO `Asphalt8` VALUES (5,'Lamborghini','Terzo Millennion','Auto','Gris','S',1313,1806,2.50,299.9,1.300,10.0,420000,'S','2022-11-15 16:30:02','2022-11-15 16:30:02'),(6,'cxvxcdv','xdscsacs','Auto','Gris','S',1313,1806,2.50,299.9,1.300,10.0,420000,'S','2022-11-16 16:08:34','2022-11-16 16:08:34');
/*!40000 ALTER TABLE `Asphalt8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'abdiel.esteban@yopmail.com','Abdiel Esteban','Alfonso Chavez',22,'M','123','2000-08-06','S','2022-10-11 15:41:52','2022-10-11 15:41:52'),(2,'zahid.de.jesus@yopmail.com','Zahid de Jesus','Avalos Hernandez',21,'M','zad12345','2001-05-06','N','2022-10-11 15:41:52','2022-10-24 15:46:29'),(9,'erika@yopmail.com','Erika','Zarate Gutierrez',20,'F','erika123','2002-04-18','S','2022-10-26 15:16:08','2022-10-26 15:16:08'),(10,'pablo@yopmail.com','pablo','lol',30,'','pablo123','1900-01-01','S','2022-10-26 15:49:26','2022-10-27 15:47:36'),(11,'juan@yopmail.com','Juan','Carlos Angel',25,'M','$2a$10$S3mws2pKrEdMIXxNOimB/.HnZSxcJ.wn9bO1NxCI2sfTuXP86XnNW','1900-01-01','S','2022-10-28 15:38:54','2022-10-28 15:38:54'),(12,'luis@yopmail.com','Luis Angel','Ricardo Toledo',20,'M','$2a$10$v8z9/2EiEqy3drSb5V3lvON6CXwGuEe9VnTqX6kL/akx7frMuLgcG','1900-01-01','S','2022-10-28 15:41:26','2022-10-28 15:41:26'),(13,'jose@yopmail.com','jose','Ortega',17,'','$2a$10$qEJ5YUHh7nirbTar/NjIbu2d.afj9Ulqke3CHNqnAlD3Ec9s4AdGS','1900-01-01','S','2022-11-03 16:29:25','2022-11-03 16:31:43'),(14,'xd@yopmail.com','dwdadf','asfdasf',20,'M','$2a$10$p1pzVlq/BrcF3bK8CxixMO3v1F4RHHVBvaTVXm/gvDnSPoGaHEMO2','2022-06-09','S','2022-11-07 18:39:49','2022-11-17 16:48:05');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 10:17:11
