import requests
from bs4 import BeautifulSoup
import re

def sunnybrook_time():

  site = "https://sunnybrook.ca/extras/edwaittimes/"
  html = requests.get(site).content
  soup = BeautifulSoup(html, 'html.parser') #gets all the html stuff
  time = soup.find('p', attrs={'class': 'maxwidth90'}).text #finds the text in the p tag with the class "maxwidth90" (use inspect element on the page and select the item you want to scrape then find the class and whether its a 'div' or 'p' or other tag infront of the class.)

  time_match = re.search(r'(\d+) hours? and (\d+) minutes?', time) #finds the hours and minutes in the text. The hours? makes the s optional so it searches for the word hour and the word hours (also applies to minutes?). 

  sunnybrook_hours = 0
  sunnybrook_minutes = 0

  if time_match:
    sunnybrook_hours = time_match.group(1)  # Extract the first group (hours)
    sunnybrook_minutes = time_match.group(2)  # Extract the second group (minutes)

  print(sunnybrook_hours)
  print(sunnybrook_minutes)
  return sunnybrook_hours, sunnybrook_minutes #return a list 

sunnybrook = sunnybrook_time()
sunnybrook_hours = (sunnybrook[0])
sunnybrook_minutes = (sunnybrook[1])