# Article Management Application
## Description
A simple article management application built using Node.js, Express, and MongoDB. Users can create, view, edit, and delete articles. Articles are written in Markdown and converted to HTML with automatic sanitization for security.

## Features
Create, edit, view, and delete articles.
Automatically generate a URL-friendly slug based on the article title.
Markdown-to-HTML conversion for article content.
HTML sanitization to prevent XSS attacks.

## Technologies Used
Node.js: JavaScript runtime for building the application.
Express: Web framework for routing and server management.
MongoDB: NoSQL database to store articles.
Mongoose: Object Data Modeling (ODM) library for MongoDB.
Marked: Markdown parser to convert markdown content to HTML.
DOMPurify: Sanitizes HTML content to prevent XSS attacks.
Slugify: Converts article titles to URL-friendly slugs.
EJS: Template engine to render dynamic HTML.
