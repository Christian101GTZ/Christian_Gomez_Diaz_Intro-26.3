# Christian_Gomez_Diaz_Intro-26.3

Portfolio Project for Intro to Programming course with Code the Dream.

Christian Alejandro Gomez Diaz

## Project Overview

This repository contains my personal portfolio website, including an Open API weather page.

The portfolio includes:

* About
* Experience
* Skills
* Projects
* Connect
* Leave a Message
* Local Weather Open API page

## Local Weather Open API

The Local Weather page uses the Open-Meteo API and browser geolocation.

Users can:

* Allow location access for local weather data
* View a 7-day weather forecast
* View weather from the same 7-day period one year ago
* Switch between the two weather views

The page uses two separate Open-Meteo endpoints:

* Forecast API for upcoming weather
* Historical Weather API for past weather

Each weather view makes a separate GET request to the appropriate Open-Meteo endpoint each time the user selects it.

## How to Run

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. If you do not already have it installed, open the **Extensions** panel in VS Code and install the **Live Server** extension.
4. Open `index.html`.
5. Right-click `index.html`.
6. Select **Open with Live Server**.
7. The portfolio will open in your browser.
8. Select **Local Weather** from the navigation bar.

Using Live Server is recommended because the weather page uses browser location services.

## How to Test the Local Weather Page

1. Click **Use My Location**.
2. Allow the browser to access your location.
3. Wait until the page displays **Location ready.**
4. Click **7-Day Forecast** to view the upcoming weather.
5. Click **Weather History** to view weather from the same 7-day period one year ago.
6. Click either weather button again to make another GET request and refresh that view.

If location permission is denied, the page displays an error message and prevents weather requests until location access is available.
