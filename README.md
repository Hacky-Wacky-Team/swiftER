# SwiftER

Decrease ER wait times once and for all!!!


## ⭐️ Inspiration
Picture this: a stuffy room filled with strangers who are all sick and hopelessly waiting for a doctor. This unfortunately is the reality of hundreds of thousands of Ontarionians each day. Ontario’s healthcare system is prized for its accessibility due to its free healthcare, however there are flaws to every system. Ontario is plagued by the lack of resources to streamline proper care of patients who are in need of emergency aid. With this, our team decided to come up with SwiftER, a WebApp that allows users to track live waiting times and initiate the pre-screening process before arriving at the hospital. With this, we hope to make the lives of Ontarionian’s better each day. As people who have dealt with the firsthand effects of the Emergency Room, we believe that SwiftER has the possibility of shaping Ontario’s healthcare into a system that supports everyone regardless of their background.

## ❤️ What it does
SwiftER enables users to easily access live waiting times of over 20 hospitals around the GTA and start their pre-screening questions before arriving at the hospital. With its easy to use interface, our platform allows anyone regardless of age to access it. Furthermore, users are able to contact these hospitals and visit crucial sites that may help a users decision in where to go when they need emergency aid. Our site successfully teaches users how to distinguish between the need to go to the ER and the need to utilize 811. Ultimately, SwiftER truly streamlines the process and we are confident that if it were integrated with Ontario’s healthcare system, it would improve the lives of thousands of people.

## 🛠️ Features
### Home Page
Our home page drew inspiration from various websites, which we studied to create a user interface using HTML, CSS, and JS. The result is a design that is both fitting and seamless for the SwiftER experience. We also ensured that our users clearly understand how our website operates and how it benefits them by helping them locate the nearest hospital with the shortest ER wait times.

### Map Section
We decided to use MapBox to display our expansive full-screen map due to its great free plan and ease of use. We drew inspiration from various map websites such as apple maps to come up with a beautiful design using HTML, CSS, and JS. We stored the large list of hospitals with their addresses in a json file and linked it to the sidebar, displaying hospitals in southern ontario. The data also includes ER wait times that dynamically updates as new data is received.

### Backend
For the wait times, we initially tried to use beautifulsoup on python to try to scrape the data. This caused multiple problems since some sites had dynamic elements and others had images for the wait times. We solved these problems by switching to selenium to scrape the data. Using python we went through the data and set it into the format that is used for the map. To connect the data gathered by python and our front end we sent the data to a JSON file and fetched it using javascript.

### Question Section
We utilized a lot of open-source UI elements to better the user experience. We used the HTML form element to create the question forms. Buttons were also used to navigate the whole site. We spent a long time ensuring that the buttons were in the correct orientation, were the correct colors and led to the correct pages. This was extremely hard for us as we were new to programming with this language.

## What's next for SwiftER
We hope to incorporate SwiftER with Ontario’s healthcare system. This is our biggest goal, and a goal we truly hope to accomplish as we are aware of the struggles people face with the waiting times of the Emergency Room. To do this, we hope to better improve the functionality of SwiftER by fixing parts of the map and fully integrating the pre-screening process to actually connect it to local hospitals around Ontario!
