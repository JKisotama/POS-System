# POS System

A Point of Sale (POS) system web application built with Angular and Angular Material.

## Table of Contents
- [Installation](#installation)
- [Run the Project](#run-the-project)

---

## Installation

### Prerequisites
Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/pos-system.git
    cd pos-system
    ```

2. **Install Dependencies**

    2.1 **Install all the required dependencies by running:**

    ```bash
    npm install
    npm intall -g json-server
    ```

    2.2 **Install and configure Angular Material:**

    ```bash
    ng add @angular/material
    ```

    2.3 **During the setup, you can select the following options:**

    - Choose a prebuilt theme (choose any or use the default).
    - Add global typography styles (Yes).
    - Set up global Angular Material styles (Yes).
  
   
## Run the Project
- Once everything is set up, you can run the frontend of the POS system using the following steps:

1. **Start the Development Server**
    ```bash
    json-server --watch db.json
    ng serve --open
    ```
    - For now Json Server is using due to BE not completely publish
    - If you prefer not to open the browser automatically, simply run:
    
    ```bash
    ng serve
    ```
    - Then open your browser and navigate to http://localhost:4200.
