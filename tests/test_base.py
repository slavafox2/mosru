import allure
import pytest
import requests
import urllib3
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from allure_commons.types import AttachmentType
from requests.exceptions import MissingSchema, InvalidSchema, InvalidURL


def try_exception_for_tags(driver, tag):
    try:
        finded = driver.find_element(By.TAG_NAME, tag).tag_name
        return finded == tag
    except Exception as e:
        print(f'\n warning message: TEST FAIL: No finded tag: {tag}')
        with allure.step('make screenshot'):
            allure.attach(driver.get_screenshot_as_png(), name='Screenshot',  attachment_type=AttachmentType.PNG)
        assert False

@pytest.fixture(scope='session')
def driver():

    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    _driver = webdriver.Chrome(executable_path=r'C:\Users\SL\Documents\PycharmProjects\chromedriver_win32\chromedriver.exe')
    # _driver.get('https://mos.ru')
    _driver.get('https://www.booking.com')
    _driver.implicitly_wait(4)
    yield _driver
    _driver.quit()


@allure.story('tag testing: header')
def test_search_tag_header(driver):
    tag = 'header'
    assert try_exception_for_tags(driver, tag)


@allure.story('tag testing: footer')
def test_search_tag_footer(driver):
    tag = 'footer'
    assert try_exception_for_tags(driver, tag)


@allure.story('research links')
def test_research_links(driver):
    broken_links = 0
    valid_links = 0
    c = 1
    links = driver.find_elements(By.CSS_SELECTOR, "a")

    for link in links:
        print(f'\n Link number {c}')
        try:
            request = requests.head(link.get_attribute('href'))
            print("Status of " + link.get_attribute('href') + " is " + str(request.status_code))
            if (request.status_code == 404):
                broken_links = (broken_links + 1)
            else:
                valid_links = (valid_links + 1)
        except requests.exceptions.MissingSchema:
            print("Encountered MissingSchema Exception")
        except requests.exceptions.InvalidSchema:
            print("Encountered InvalidSchema Exception")
        except:
            print("Encountered Some other execption")

        if c == 200: break
        else: c += 1


    print(f"\n Detection of broken links completed with {str(broken_links)} broken links and {str(valid_links)} valid links")



