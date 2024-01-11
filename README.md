# Babylon Micro-bot

## Description
Using the OpenAI API, this is a chat bot trained to assist with Babylon Micro-Farms primary product, the Galleri Micro-Farm. It includes additional features such as adjusting to your devices light/dark mode settings, using speech to text recognition, and supporting various screen sizes ranging from a laptop to a phone. 

## To Use
### To Install
Download the code from the GitHub repository
Open it within your IDE of choice

### Required downloads
You will need to ensure you have various packages downloaded onto your computer before running. `npm install` should download all required packages, but if there are errors, run the following commands:
* npm install react
* npm install openai
* npm install -D tailwindcss postcss autoprefixer
* npm install react-icons
* npm install reactjs-popup

### To Run
* Open your terminal, navigate to the project directory ‘cd BabylonChatbot’
* Run the command ‘npm install’ to install the required dependencies
* Once complete, you can run the command ‘npm run dev’ to set up the site for the application
* Open your browser and navigate to the site where the chatbot is hosted
* Interact with the chatbot on the site

### Needed Environment Variables (.env file included in .gitignore)
* VITE_OPENAI_API_KEY
* VITE_ASSISTANT_ID *if you are creating your assistant within the code, this is not necessary

### External Setup needed
Creating an OpenAI account and setting up an assistant (not necessary if assistant ID is provided)


### File Structure of src Folder
* utils.js
    * Contains the functions for creating the thread, openAI, and getting the assistant from the assistant ID *(or assistant can be created here)
* App.jsx
    * This is where the ChatInterface.jsx component, header section, some background and styling aspects, and the side bar containing the feedback popup and FAQ button are rendered.
* Index.css
    * Contains the @tailwind directives for inserting Tailwind’s base, components, and utilities styles into the CSS.
* Assets folder
    * Contains the required images, such as the Babylon logos, as well as the star, microphone, and user icons.
* Components
    * ChatInterface.jsx
        * Contains the core functionality of the bot. It creates a thread and then sends user messages to a new run. It outputs all messages in the thread while also using tailwind to style visible components on the screen
    * PopUp.jsx
        * Contains the popup functionality and styling
    * StarRating.jsx
        * Contains the feedback functionality within the popup, including allowing a user to rate the chatbot through stars, which will return a corresponding message to the user


## Credits
* Programs Used: Vite, React, OpenAI, Tailwind CSS
* Forge Crash Course SWE for guidance
* Special thanks to lead instructor Byron and teaching assistant Simon for guiding us throughout this project


### Contributors
* Ahmed Mohamed
* Andrey Fernandez
* Maggie Hollis
* Shalmali Rao
