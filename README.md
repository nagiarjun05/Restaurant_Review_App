Setup Instructions for Restaurant Review Node.js Application Project:

Before proceeding with the setup instructions, please ensure that your system meets the following prerequisites:

Node.js: Ensure that Node.js is installed on your system. You can download the latest version from the official Node.js website (https://nodejs.org) and follow the installation instructions specific to your operating system.

Database: Set up a database system MySQL according to our project requirements. Install and configure the database server on your machine.

Once you have met the prerequisites, follow the steps below to set up and run the Restaurant Review Node.js application:


Clone the Repository:

Clone the repository to your local machine using the 'git clone'  command, or download the project as a ZIP file and extract it to a directory of your choice.



Install Dependencies:

Open your terminal or command prompt and navigate to the project directory.
Run the command 'npm install' to install the required dependencies specified in the project's package.json file. This will download and install all the necessary libraries and modules.



Configure the Database:

Open the project directory and create a new file named .env. The file name must start with a period (.) to ensure it is hidden.
Open the .env file using a text editor of your choice.
Inside the file, define the configurations you want to customize for your application. Each configuration should be written in the format KEY=VALUE, where KEY is the configuration name and VALUE is its corresponding value.
Update the configuration settings with the credentials and connection details of your database server.
Save the .env file once you have added all your desired configurations.



Run Database Migrations:

In the terminal or command prompt, execute the command 'npx sequelize-cli db:migrate' to run the database migrations or you can comment out the sequlize.sync() and comment in the sequelize.sync({force:true}) at line number 32 in app.js file then this will create the necessary tables and schema for the application.


Start the Server:

Run the command 'npm start' to start the Node.js server.
The application will now be running on the port localhost:8000 as configured in the project.


Access the Application:

Open a web browser and navigate to localhost:8000/index.html  to access the Restaurant Review application.
You should see the landing page of the application.
Congratulations! You have successfully set up the Restaurant Review Node.js application on your machine.