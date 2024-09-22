from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import csv


# # from webdriver_manager.chrome import ChromeDriverManager
import time
# # Open Google
#

keywords = []
with open('keyword.csv', mode='r') as keyword_file:
    reader = csv.reader(keyword_file)
    for row in reader:
        keywords.append(row[0])
# Create/open the CSV file
print(keywords)

chrome_options = Options()
chrome_options.add_argument("--headless")  # Enables headless mode
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
#
driver = webdriver.Chrome(options=chrome_options)
driver.get("https://www.google.com")
#
# # Search for a keyword
# search_box = driver.find_element("name", "q")
# search_box.send_keys("trial")
# search_box.send_keys(Keys.RETURN)
#
# time.sleep(2)  # Wait for results to load
#
# # Extract URLs from search results
# search_url = driver.current_url
# print("Search URL:", search_url)
#
# driver.quit()

###################################################

# keywords = ["python web scraping", "selenium automation", "machine learning"]

# Set up the WebDriver
# driver = webdriver.Chrome(ChromeDriverManager().install())

with open('url_list.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["URL"])  # Write header row

    # Loop through each keyword and perform a search
    for keyword in keywords:
        driver.get("https://www.google.com")

        # Find the search box and enter the keyword
        search_box = driver.find_element("name", "q")
        search_box.clear()  # Clear any previous input
        search_box.send_keys(keyword)
        search_box.send_keys(Keys.RETURN)

        # Allow time for the search to complete
        time.sleep(2)

        # Extract the current search result URL
        search_url = driver.current_url
        print(f"Search URL for '{keyword}': {search_url}")

        # Write the search URL into the CSV file
        writer.writerow([search_url])
print("the URLs are extracted")
# Close the driver
driver.quit()