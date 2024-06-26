## BookNest.In

### Project Overview
**BookNest.In** is an innovative e-commerce platform designed to revolutionize the online book retail market by integrating offline bookstores into the digital marketplace. This project aims to provide tools for managing inventory efficiently and offers a Machine Learning (ML) recommendation system for buyers, enhancing their online book purchasing experience.

### Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [System Design and Architecture](#system-design-and-architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Work](#future-work)
- [Contributors](#contributors)
- [License](#license)

### Introduction
**Objective:** 
To create an online platform that integrates offline bookstores, enabling them to sell their books online and reach a broader audience.

**Motivation and Problem Statement:**
This project addresses the limited reach of offline bookstores by offering an online platform to expand their customer base and increase sales. It leverages technologies such as React, Django, Pandas, and Machine Learning.

**Intended Users:**
- **Offline Book Sellers:** Gain a new avenue to sell their books and reach more customers.
- **Buyers:** Benefit from an enhanced user experience and the convenience of purchasing books online with personalized recommendations.

### Features
- **Book Recommendation System:** Utilizes Machine Learning to recommend books to buyers based on their preferences and search keywords.
- **User-Friendly Interface:** Designed for a seamless experience for both sellers and buyers.
- **Inventory Management:** Tools for book sellers to manage their stock and sales efficiently.
- **Dynamic Quote Generator:** Engages users with dynamic quotes on the homepage.
- **Pagination:** Handles large datasets efficiently to improve performance and user experience.

### System Design and Architecture
**Backend Server (Django):**
- Handles requests from the frontend and provides necessary data.
- Manages database storage, retrieval, and manipulation.
- Implements the Machine Learning model for book recommendations.

**Frontend (React):**
- Provides a dynamic and responsive user interface.
- Utilizes Axios and Fetch for asynchronous requests to the backend API.

**Data Processing and ML:**
- Uses Pandas and Python for data processing and recommendation system implementation.

### Technologies Used
- **Frontend:** React, Bootstrap, CSS, JavaScript
- **Backend:** Django, Python
- **Data Processing and ML:** Pandas, Numpy
- **APIs:** REST API for client-server communication

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BookNest-In.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BookNest-In
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Install backend dependencies:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```
5. Start the development servers:
   ```bash
   # In the frontend directory
   npm start

   # In the backend directory
   python manage.py runserver
   ```

### Usage
1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. Use the interface to browse books, receive recommendations, and manage inventory.

### Challenges and Solutions
- **Handling Large JSON Responses:** Implemented pagination to improve performance and prevent out-of-memory issues on the frontend.
- **Efficient Data Handling:** Utilized Pandas for data processing to ensure smooth operation of the recommendation system.

### Future Work
- **Scalability Enhancements:** Further optimize the backend and database architecture as the user base grows.
- **Advanced Recommendation Algorithms:** Implement collaborative filtering or deep learning models for more accurate recommendations.
- **Expanded Features:** Include user reviews, ratings, and integration with additional payment gateways.
- **Mobile Apps:** Android and iOS applications are currently under development to extend the platform's accessibility.

### Contributors
- **Backend:** Roushan Mondal
- **Web Frontend:** Rahul Roy
- **Android and iOS App Development:** Ardhendu Sarkar

### License
This project is licensed under the MIT License.

---

*BookNest.In* - Bringing the offline book market online, enhancing sales, and offering a convenient shopping experience for book lovers.

For more detailed information, refer to the [Project Report]([Final Project Group 15 Report..pdf](https://github.com/RoushanStarboy/book-shop-ecommerce/blob/5b0736768ce596630dd45e0e0b7f097d56d62743/Final%20Project%20Group%2015%20Report..pdf)).
