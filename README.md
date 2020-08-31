# Introduction

This project was written as a submission for a Front-End Engineer Skill Assessment. It is a dashboard view of the fictional book club web application.

## Instructions 

The main entry point is the `index.html` file in the root folder. There are other files in thier various folders. 
To get up and running, the `index.html` needs to be ran on a server because I rendered the books from a `data.json` file using javascript. I used Visual studio codes (VSCode) live server. Run it on the server and Vscode would automatically open a new tab in the port 5500.

## Installation and Development

To get this project up and running you need the `index.html` file to be ran on a server, I recommend using VScode's live server. It should run properly.

## Assumptions

* The major assumption I made about the project is that the data would be coming from a backend server in form of a json file. So I hardcoded the `data.json` file with all the information I thought would be need to render the details about the books and rendered it using vanilla javascript.
* I also assumed the user that was logged in was the admin user.

Asides both of these I tried as much as possible to recreate the UI look.

## Requirements

All the requirements according to the assesment were met. The Pages work fine on both Desktop and mobile.

## Issues

The major issue I faced was the hamburger menu. Having to show a hamburger icon and hide the rest of the menu. because I used pure CSS, I found that the checkbox couldn't control other elements unless they came after it in the heirarchy of the mark up.

## Feedback

The Icons for the website, I think maybe they should be provided. I couldn't find anyone that looked exactly like the logo so I created it. The other icons I got them from font-awesome, and not all of them were exactly like the ones in the UI design.
