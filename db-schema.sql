CREATE EXTENSION ltree;


DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (
  "id" SERIAL,
  "postKey" ltree NOT NULL,
  "title" varchar(150) NOT NULL,
  "text" text NOT NULL,
  "url" varchar(250) NOT NULL,
  "investors" text[],
  "investment" int NOT NULL,
  "username" varchar(24) NOT NULL,
  "commentCount" int NOT NULL,
  "html" text,
  "thumbnail" varchar(255),
  "timestamp" bigint NOT NULL,
  "sticky" boolean NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Votes;
CREATE TABLE Votes (
  "id" SERIAL,
  "userId" int NOT NULL,
  "postId" int NOT NULL,
  "timestamp" bigint NOT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS Forums;
CREATE TABLE Forums (
  "id" SERIAL,
  "name" varchar(150) NOT NULL,
  "description" varchar(1000) NOT NULL,
  "rules" varchar(1000) NOT NULL,
  "administrator" varchar(24) NOT NULL,
  "timestamp" bigint NOT NULL,
  PRIMARY KEY ("id")
);


CREATE TYPE rank AS ENUM ('newbie', 'hero');
CREATE TYPE status AS ENUM ('user', 'mod', 'admin');
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  "id" SERIAL,
  "username" varchar(24) NOT NULL,
  "email" varchar(64) NOT NULL,
  "passwordHash" varchar(44) NOT NULL,
  "salt" varchar(24) NOT NULL,
  "key" varchar(64) NOT NULL,
  "address" varchar(35) NOT NULL,
  "balance" int NOT NULL,
  "joined" bigint NOT NULL,
  "rank" rank,
  "status" status,
  PRIMARY KEY ("id")
);




DROP TABLE IF EXISTS Payments;
CREATE TABLE Payments (
  "id" SERIAL,
  "amount" int NOT NULL,
  "transactionHash" varchar(64) NOT NULL,
  "username" varchar(24),
  "kind" varchar(24),
  "timestamp" bigint NOT NULL,
  PRIMARY KEY ("id")
);



DROP TABLE IF EXISTS Wallet;
CREATE TABLE Wallet (
  "id" SERIAL,
  "key" varchar(64) NOT NULL,
  "address" varchar(35) NOT NULL,
  "balance" int NOT NULL,
  "username" varchar(24),
  PRIMARY KEY ("id")
);
