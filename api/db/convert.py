import sqlite3
import pandas as pd

conn = sqlite3.connect("system.db.sqlite")
cursor = conn.cursor()
# 执行一条语句,创建 day_temperature 表
sql = "CREATE TABLE USER(MID CHAR(50) PRIMARY KEY NOT NULL, PASSWORD CHAR(50) NOT NULL)"
cursor.execute(sql)
sql = "CREATE TABLE STUDENTS(SID INT PRIMARY KEY NOT NULL, FIRSTNAME CHAR(50) NOT NULL, LASTNAME CHAR(50) NOT NULL)"
cursor.execute(sql)
sql = "CREATE TABLE EMAILS(SID INT PRIMARY KEY NOT NULL, EMAIL CHAR(50) NOT NULL)"
cursor.execute(sql)
sql = "CREATE TABLE COMPANYS(SID INT PRIMARY KEY NOT NULL, COMPANY CHAR(50) NOT NULL)"
cursor.execute(sql)
sql = "CREATE TABLE GRADES(SID INT PRIMARY KEY NOT NULL, GRADE BLOB NOT NULL, COUNTTEST INTEGER NOT NULL)"
cursor.execute(sql)
sql = "CREATE TABLE PHOTO(SID INT PRIMARY KEY NOT NULL, PIC BLOB)"
cursor.execute(sql)

start = read_json.JSONReader('ALL2.19.json1')
data = start.data_dict()