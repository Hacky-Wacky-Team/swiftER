<div align="center">
    <img src="Pictures/Logo.png" width=200 height=200>
    <h1>SwiftER</h1>
</div>

Decrease ER wait times once and for all!

Devpost: https://devpost.com/software/swifter-vleyic

Video Demo: https://youtu.be/jrorE0vLFqA


## ⭐️ Inspiration
Picture this: an overcrowded room filled with patients who are waiting for a doctor. This unfortunately is the reality of hundreds of thousands of Ontarionians each day. Ontario’s healthcare system is prized for its accessibility due to its free healthcare, however there are flaws to every system. Ontario is plagued by the lack of resources to streamline proper care of patients who are in need of emergency aid. With this, we decided to come up with SwiftER, a WebApp that allows users to track live waiting times and initiate the pre-screening process before arriving at the hospital. We hope to make the lives of Ontarionian’s better each day. As people who have dealt with the firsthand effects of the Emergency Room, we believe that SwiftER has the possibility of shaping Ontario’s healthcare into a system that supports everyone regardless of their background.

## ❤️ What it does
SwiftER enables users to easily access live waiting times of 40 hospitals in Ontario and start their pre-screening questions before arriving at the hospital. With its easy to use interface, our platform allows anyone regardless of age to access it. Furthermore, users are able to contact these hospitals and visit crucial sites that may help a users decision in where to go when they need emergency aid. Our site successfully teaches users how to distinguish between the need to go to the ER and the need to utilize 811. Ultimately, SwiftER truly streamlines the process and we are confident that if it were integrated with Ontario’s healthcare system, it would improve the lives of thousands of people.

## 🛠️ Features

<img width="1470" alt="homepage" src="https://github.com/user-attachments/assets/af6e68a8-0939-4b66-a992-1f1a4aad8daa">

### Map Section
We decided to use MapBox API to display all the hospitals on an expansive full-screen map. The map is fully interactive, allowing users to easily see the 20+ hospitals across Ontario with their live wait times. The hospital data includes ER wait times, scraped from online sources, that dynamically update as new data is received.

https://github.com/user-attachments/assets/9fb0d9f5-8e03-4267-98a0-356726801ddc

### Backend
For the wait times, we decided to use selenium to scrape the data. Using python we went through the data and set it into the format that is used for the map. To connect the data gathered by python and our front end we sent the data to a JSON file and fetched it using javascript.

### Pre-Screening Section
After the user selects the hospital, they are able to complete that specific hospital's prescreening. The user is prompted first with a confirmation question, ensuring that they understand that the ER is for emergencies only. They are also given different alternatives for help such as Ontario's 811. If they still need emergency care, they are able to answer the list of prescreening questions, including: Health Card Number, Symptoms, Date of Birth, Name, etc. Upon completing the questions, a ticket is generated for the user with a waiting number. This allows the user to wait in the comfort of their own home instead of the ER waiting room which is often overcrowded. (Unfortunately, because SwiftER is not implemented in any hospitals, this feature is just an example)

https://github.com/user-attachments/assets/b4905b60-c75b-411b-a408-05d9dd33db2e

## What's next for SwiftER
We hope to incorporate SwiftER with Ontario’s healthcare system. This is our biggest goal, and a goal we truly hope to accomplish as we are aware of the struggles people face with the waiting times of the Emergency Room. To do this, we hope to better improve the functionality of SwiftER by fixing parts of the map and fully integrating the pre-screening process to actually connect it to local hospitals around Ontario!
