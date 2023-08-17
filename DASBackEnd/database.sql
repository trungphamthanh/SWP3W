CREATE DATABASE DAS

USE DAS;

CREATE TABLE Users( ID INT IDENTITY(1,1) PRIMARY KEY, UserName NVARCHAR(100), PhoneNum NVARCHAR(100), Gender NVARCHAR(100), Information NVARCHAR(100), Descriptions NVARCHAR(100))

CREATE TABLE Account( ID INT IDENTITY(1,1) PRIMARY KEY, userId INT, Username NVARCHAR(100) UNIQUE, Password VARCHAR(100), roleId INT, accountStatus VARCHAR(100), workingStatus VARCHAR(100))

CREATE TABLE DAServices( ID INT IDENTITY(1,1) PRIMARY KEY, ServiceName NVARCHAR(100), Intro NVARCHAR(1000), Contents NVARCHAR(1000), Outro NVARCHAR(1000), lowPrice DECIMAL(18,2), advancedPrice DECIMAL(18,2), topPrice DECIMAL(18,2), imgUrl VARCHAR(100), accountId INT)

CREATE TABLE Booking( ID INT PRIMARY KEY, CustomerName NVARCHAR(100), bookingStatus VARCHAR(100), accountId INT, slotId INT,serviceId INT) 

CREATE TABLE BookingDetail (ID INT IDENTITY(1,1) PRIMARY KEY, bookingId INT, serviceId INT)

CREATE TABLE Slot (ID INT IDENTITY(1,1) PRIMARY KEY, SlotStart VARCHAR(100), SlotEnd VARCHAR(100) , slotStatus VARCHAR(100), date Datetime, accountId INT)

CREATE TABLE Roles (ID INT PRIMARY KEY, roleName VARCHAR(100))

ALTER TABLE Slot
ADD FOREIGN KEY (accountId) REFERENCES Account(ID);

ALTER TABLE DAServices
ADD FOREIGN KEY (accountId) REFERENCES Account(ID);

ALTER TABLE Booking
ADD FOREIGN KEY (accountId) REFERENCES Account(ID);

ALTER TABLE Booking
ADD FOREIGN KEY (slotId) REFERENCES Slot(ID);

ALTER TABLE BookingDetail
ADD FOREIGN KEY (serviceId) REFERENCES DAServices(ID);

ALTER TABLE BookingDetail
ADD FOREIGN KEY (bookingId) REFERENCES Booking(ID);

ALTER TABLE Account
ADD FOREIGN KEY (userId) REFERENCES Users(ID);

ALTER TABLE Account
ADD FOREIGN KEY (roleId) REFERENCES Roles(ID);

INSERT INTO Roles(ID, roleName)
VALUES (1,'admin');

INSERT INTO Roles(ID, roleName)
VALUES (2,'manager');

INSERT INTO Roles(ID, roleName)
VALUES (3,'customer');

INSERT INTO Roles(ID, roleName)
VALUES (4,'doctor');

INSERT INTO Users(UserName, PhoneNum, Gender)
VALUES ('Hoàng Nam','0396258901', 'Nam');

INSERT INTO Users(UserName, PhoneNum, Gender)
VALUES ('Hoàng Minh','0396258102', 'Nam');

INSERT INTO Users(UserName, PhoneNum, Gender)
VALUES ('Nguyễn Tuân','0396218112', 'Nam');

INSERT INTO Users(UserName, PhoneNum, Gender)
VALUES ('Hoàng Hiếu','0396244312', 'Nam');

INSERT INTO Users(UserName, PhoneNum, Gender)
VALUES ('Thanh Tùng','0396224222', 'Nam');


INSERT INTO Account(roleId, userId, Username, Password, workingStatus, accountStatus)
VALUES((SELECT ID FROM Roles WHERE ID=2),(SELECT ID FROM Users WHERE ID=1), 'namthse01','123','working','isActive')

INSERT INTO Account(roleId, userId, Username, Password,workingStatus, accountStatus)
VALUES((SELECT ID FROM Roles WHERE ID=1),(SELECT ID FROM Users WHERE ID=2), 'minh','123','working','isActive')

INSERT INTO Account(roleId, userId, Username, Password, accountStatus)
VALUES((SELECT ID FROM Roles WHERE ID=3),(SELECT ID FROM Users WHERE ID=3), 'tuan','123','isActive')

INSERT INTO Account(roleId, userId, Username, Password, accountStatus)
VALUES((SELECT ID FROM Roles WHERE ID=3),(SELECT ID FROM Users WHERE ID=4), 'hieu','123','isActive')

INSERT INTO Account(roleId, userId, Username, Password,workingStatus, accountStatus)
VALUES((SELECT ID FROM Roles WHERE ID=4),(SELECT ID FROM Users WHERE ID=5), 'tung','123','working','isActive')

INSERT INTO DAServices(ServiceName,Intro,Contents,Outro,lowPrice,advancedPrice,topPrice,accountId)
VALUES ('Implants',
'Welcome to King Dental Clinic, your destination for revolutionary dental solutions through our Implants service. We understand that missing teeth can impact both your confidence and oral health. Our dedicated team is here to guide you on a transformative journey toward a restored smile with the stability and aesthetics that dental implants can provide.',
'Our Implants service offers a permanent solution for replacing missing teeth by surgically placing titanium implants into your jawbone. These implants fuse with the bone over time, providing a sturdy foundation for crowns, bridges, or dentures. Our experienced implant specialists utilize state-of-the-art techniques to ensure precise placement and optimal results. Whether you missing a single tooth or several, our personalized approach to implant dentistry guarantees a comfortable, secure, and natural-looking restoration.',
'Rediscover the joy of a complete smile with Implants Dental Clinic. Our commitment to innovation and patient satisfaction means that you will receive a customized treatment plan designed to address your unique needs. Say goodbye to the challenges of missing teeth and embrace a newfound sense of confidence and functionality. Schedule your consultation today to explore how our Implants service can transform your smile, enhance your quality of life, and stand the test of time.',
3000000,4000000,8000000,1)

INSERT INTO DAServices(ServiceName,Intro,Contents,Outro,lowPrice,advancedPrice,topPrice,accountId)
VALUES ('Exams',
'Embark on a journey towards optimal oral health with our comprehensive Exams dental service. Your smile is our priority, and our dedicated team is here to provide you with thorough and personalized examinations that lay the foundation for a lifetime of healthy teeth and gums.',
'Our Exams dental service is designed to assess the health of your teeth, gums, and overall oral cavity. During your examination, our experienced dentists will carefully evaluate each tooth''s condition, screen for cavities, check the health of your gums, and perform a comprehensive oral cancer screening. We utilize advanced diagnostic tools to ensure a detailed understanding of your oral health, allowing us to tailor treatment recommendations to your specific needs. Regular dental exams are essential for detecting potential issues early and preventing more extensive problems down the line.',
'Invest in the longevity of your smile with Exams at King''s Teeth Dental Clinic. Our commitment to excellence in dental care means that you''ll receive the attention and expertise needed to maintain optimal oral health. Schedule your appointment today to experience the benefits of routine examinations that contribute to a vibrant smile and overall well-being, all under the care of our dedicated dental professionals.',
1000000,2000000,4000000,1)

INSERT INTO DAServices(ServiceName, Intro,Contents,Outro,lowPrice,advancedPrice,topPrice,accountId)
VALUES('Hygeine & Periodontal Health',
'Welcome to King''s Teeth Dental Clinic, where we prioritize your Hygiene & Periodontal Health through our dedicated dental service. A healthy smile starts with the foundation of clean gums and excellent oral hygiene practices. Our experienced team is committed to helping you achieve and maintain optimal gum health for a lifetime of strong teeth and a radiant smile.',
'Our Hygiene & Periodontal Health service is designed to prevent and treat gum disease, also known as periodontal disease. Our skilled dental hygienists specialize in gentle yet thorough cleanings to remove plaque, tartar, and bacteria that can lead to gum issues. Regular appointments for hygiene maintenance play a crucial role in preventing gum disease, ensuring that your gums remain pink, firm, and free from inflammation. We also provide personalized guidance on maintaining proper oral hygiene practices at home to further promote your gum health.',
'Invest in the well-being of your gums and smile with our Hygiene & Periodontal Health service at King''s Teeth Dental Clinic. Your comfort and oral health are our priorities, and we''re here to offer you the expertise and care needed to keep your gums in optimal condition. Schedule your appointment today to experience the benefits of a clean, healthy mouth that contributes to overall wellness and the confidence of a beautiful smile.',
3000000,3500000,5000000,1)
