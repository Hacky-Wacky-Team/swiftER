import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait as Wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options

def get_data():
    options = Options()
    options.add_argument('--headless')
    service = ChromeService()
    driver = webdriver.Chrome(service=service, options=options)

    driver.get("https://howlongwilliwait.com/")  

    wait = Wait(driver, 10)
    grid_items = wait.until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "hospital-item"))
    )

    data = {}
    for item in grid_items:
        try:
            name_el = item.find_element(By.CSS_SELECTOR, ".hospital-name")
            hospital_name = name_el.text.strip()

            wait_el = item.find_element(By.CSS_SELECTOR, ".wait-time-value")
            raw_wait = wait_el.text.strip()  

            parts = raw_wait.split()
            if len(parts) >= 2 and parts[1] == 'hr':
                if 'less' in raw_wait.lower():
                    wait_time = parts[0] + 'h or less'
                else:
                    wait_time = parts[0] + 'h ' + parts[2] + 'm'
                data[hospital_name] = wait_time
        except:
            continue

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

