<p align='center'>
    <img src='https://i.imgur.com/mIpwsMK.png'/>
</p>

<h1 align='center'>Chat App</h1>

<p>&nbsp</p>

<p>An instant messager application, made with Next JS in the front end and Firebase in the back end. You can view a video <a href='https://www.youtube.com/watch?v=DXW1n6yU4QU'>here</a> or click the <strong>website</strong> shield to access it on vercel!</p>

<p>&nbsp</p>

<div align='center'>

<a href='https://chat-app-sigma-one.vercel.app/'>
      
<img src='https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white'/>

</a>

<img src='https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black'/>
<img src='https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white'/>
<img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'/>
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'/>
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'/>
<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'/>
<img src='https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white'/>
        

</div>

<p>&nbsp</p>

<h2></h2>

<h3 align="center"> Folder structure </h3>

<p>
 This app follows the NEXT JS create next project folder struture. The pages folder holds the file with the name that refers to the webapp subdirectory. Using this method, the NEXT framwork allows us to route without using tools like react router or alike.
</p>
<p>
 In this folder, you will also find the 'chat' folder, with refers to the subdomain chat, and in this folder a file with a especial name '[id].js'. This file is a dinamic url path. The [s in next is a way to indicate to this framework that this path will change, and inside the [s, to pass its name as a variable, with can be used inside the app as a request paramn.
</p>
<p>
The components folder holds all the pages react components, with are used to dinamiccly render the webpages using a single template with variable content. 
</p>
<p>
The 'public' folder holds assets that are used across the whole application. In this project it holds only the website favicon and a 'notification.mp3' file, with is played when the user is in another tab and a new message arrives. 
</p>
<p>
 The styles folder holds the 'global.css' file, with contains css styles that must be applied across the entire pages structure.
</p>
<p>
The lib page contains only the 'getEmail.js' file, that is used to export a function to obtain users email from the database.
</p>



 <p>&nbsp</p>

<h2></h2>

<h3 align="center"> Main functionality </h3>

<h4 align="center">The _app.js file</h4>
<p> 
This is the main NEXT file, the one that makes the connection between NEXT and a HTML file, allowing us to use react JSX strutures. In this file is the authorization protection of the whole webapp: by testing if the user is logged before redirecting to the requested page, we can redirect the user only to authorized pages or to a login page.
</p>
<p> In this page also it's implemented a loading function, in with we use the firebase hook 'useAuthState' to test if the authentication is completed or if it's loading.
</p>
<p>In this file were created a component and a page , but the first is only the loading spinner page, with is simple a npm package better-react-spinners. The other is the 'login.js' page, with loads a html page with a button that opens the Google Authorization from Firebase, logges the user and redirects back to 'index.js'.</p>

<p>&nbsp</p>

<h4 align="center">The index.js file</h4>
<p> This file is responsible for rendering the root folder of the application (http://www.example.com/). In this file were used 2 components:
</p>
<h5 align='center'>ChatSelector.js</h5>
<p>This components is responsible for the sidebar structure. In this sidebar the user will be able to alter between diferent chats and to add new contacts.</p>
<p>This is acomplished by using the npm package email-validator, to check if the user provides a valid email when adding a contact, besides checking if the user is trying to add himself as a contact or a contact that he already has in the contacts list </p>
<p>This page also holds the event listener to check if the application tab is on focus in the users browser, to know if it should play or not a notification sound. That's because this page is present in all the webapp pages.</p>
<p>This component, as the whole app, is designed using minimalist neomorphims and material ui icons</p>
<p>This file calls for 2 other components:</p>
<h6 align='center'>AddChat.js</h6>
<p>This components holds a html modal form, in witch the user can insert the email of the person he wants to add as a contact and it will be passed to the ChatSelector's function addChat and will be added to the contact list.</p>
<h6 align='center'>Chat.js</h6>
<p>This component receives a contact info and renders it in html, it's a component to allow us to dinamicaly render contacts as they are adeed </p>
<h5 align='center'>MainPageView.js</h5>
<p>This components contains the homepage body block. It's a simple JSX react function that renders some instructions in how to use the application.</p>

<p>&nbsp</p>

<h4 align="center">The [id].js file</h4>
<p>Like it was already estated, this is a dinamic subdomain page. It loads with each chat id. This page calls for the ChatSelector component and a ChatView component.</p>
<p>The ChatView component it's where the users will exchange messages, this component writes and reads the chats messages in the firebase database and loads the in the correct format, the timeago-react npm package was used to format the timestamps of the messages and lastseens in this component.</p>
<p>It's here that is also rendered the button to delete a chat, using the id in the url, the trash can button deletes the chat from the firebase database</p>
<p>For displaying the messages, this components uses another component named Message. The Message component makes a sound when rendering, if the user is in another tab, and classifies the messages by the receiver and the sender, so it will be correctly displayed in the UI</p>

 <p>&nbsp</p>

<h2></h2>

<h3 align="center"> Why Next JS </h3>
<p>I choose this framework to work with for a variate of reasons. The first is the speeding of the development process. With the folder struture rendering this framework makes coding faster and less troublesome, making it easier to debug and test</p>
<p>Another reason is the server side rendering beeing available. This allows for the user altering the chat with no render delay, by making a serve side render of the chats content, when the user go from one chat to another, the messages are already there, making the application UX better</p>
<p>The third and final reason for my choise is that I never had done anything using Next JS, so it made me go by the docs and bang my head against the monitor until I got the app running like desired. And is by challenging myself and pushing foward in the face of adversity that we grow and become better developers.</p>
 <p>&nbsp</p>

<h2></h2>

<h3 align='center'>Is this webapp finished?</h3>
<p>Short answer: no. I don't consider any project really finished, that's always some new featured to be implemented, some refactoring that could be done and some minor bugs that fly over our heads. But it's in a usable state and I am glad and proud of out it come out in this stage!</p>
 <p>&nbsp</p>

<h2></h2>

<h3 align='center'>Know issues</h3>
<ul>
<li>Notification sound playing when chaging between chats were that's new messages that arrived before the user loaded the page.</li>
<li>Sporadic glitchs in the auto scroll that should triggers every time a new message arrives</li>
</ul>
