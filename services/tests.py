from django.test import TestCase
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

class SearchTest(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        chrome_options = Options()
        chrome_options.add_argument('--headless')  # Optional: Run Chrome in headless mode
        chrome_options.add_argument('--disable-gpu')  # Optional: Disable GPU acceleration

        cls.selenium = webdriver.Chrome(options=chrome_options, executable_path='path/to/chromedriver')
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def perform_login(self):
        # Open the web page
        self.selenium.get(self.live_server_url)

        # user login and get the token
        email_input = self.selenium.find_element_by_name('email')
        password_input = self.selenium.find_element_by_name('password')
        email_input.send_keys('selinuim@test.dz')
        password_input.send_keys('this is the test')
        password_input.send_keys(Keys.RETURN)

        # Waiting for the auth to complete
        time.sleep(3)

    def test_search_in_elasticsearch(self):
        self.perform_login()

        # Perform a search
        search_input = self.selenium.find_element_by_name('search_input')
        search_input.send_keys('title:sofiane')
        search_input.send_keys(Keys.RETURN)

        # Wait for the search results to load (adjust as needed)
        time.sleep(3)

        # Assert that the expected results are displayed on the page
        search_results = self.selenium.find_elements_by_css_selector('.search-result-item')
        self.assertTrue(len(search_results) > 0)
