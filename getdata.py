from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

def get_data():
    #setting up the ChromeDriver
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    #creating the chromedriver
    service = Service('chromedriver')
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        #opening the site on replit
        driver.get("https://howlongwilliwait.com/")

        #waits for the grid items to load
        wait = WebDriverWait(driver, 10)
        grid_items = wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "grid-item"))
        )

        #gets grid items and their location
        items_with_positions = []
        for item in grid_items:
            location = item.location
            items_with_positions.append((item, location['y']))

        #sorts items based on their location
        items_with_positions.sort(key=lambda x: x[1])

        #gets the text in each grid item
        sorted_items_list = [item[0].text for item in items_with_positions]

        #sorts through the list and adds each wait time to each hospital in a dictionary (also removes click)
        data = {}
        for i in range(0, len(sorted_items_list), 3):
            if (sorted_items_list[i+1] != "Not available"):
                if not sorted_items_list[i+1].startswith("Closed"):
                    hospital_name = sorted_items_list[i]
                    times = sorted_items_list[i+1].split(" ")
                    wait_time = times[0] + 'h ' + times[2] + 'm'
                    data[hospital_name] = wait_time

        info = []
        try:
            with open("info.json", "r") as file:
              info = json.load(file)
        except FileNotFoundError:
            print("File not found.")

        results = []

        #adding each thing from info to points if it exists in data
        for thing in info:
            hospital_name = thing['properties']['title']
            if hospital_name in data:
                time = data[hospital_name]
                results.append(
                    {
                        "type": "Feature",
                        "geometry": {
                          "type": "Point",
                          "coordinates": [thing["geometry"]["coordinates"]]
                        },
                        "properties": {
                          "title": thing['properties']['title'],
                          "description": data[hospital_name],
                          "address": thing["properties"]["address"]
                        }
                      }
                )
        
        #sending the data to data file
        try:
            with open('data.json', 'w') as json_file:
                json.dump(data, json_file, indent=2)
                print("Data written to data.json")
        except Exception as e:
            print(f"error writing to file: {e}")

        #sending data to points file
        try:
            with open('points.json', 'w') as json_file:
                json.dump(results, json_file, indent=2)
                print("sent to points")
        except Exception as e:
            print(f"error writing to file: {e}")
        
    finally:
        driver.quit()
