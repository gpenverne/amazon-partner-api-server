# amazon-partner-api-server

## Goal
Amazon api partner is an awesome way to show product related to content.
But api is very verbose, with a lot of data I don't need.

I just want to have a json with pictures, title, link and price.

## Install

Of course ...

``
npm install
``

Edit the generated conf.js file, to put your amazaon partner credentials

## Use it

Go to
``
http://localhost:1337/anything you want
``

And you will obtain a json like:
```json
{"asin":"B073LGMWG9","title":"COFFRET 2017 l'intégrale DOCTEUR WHO SAISONS 1 à 9 + 2 épisodes spéciaux + en bonus : les secrets du docteur enfin révélés !","url":"https://www.amazon.fr/COFFRET-lint%C3%A9grale-DOCTEUR-%C3%A9pisodes-sp%C3%A9ciaux/dp/B073LGMWG9?SubscriptionId=AKIAILCDWDHURXF775TQ&tag=gkdv-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B073LGMWG9","pictures":{"small":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL._SL75_.jpg","height":54,"width":75},"medium":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL._SL160_.jpg","height":115,"width":160},"large":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL.jpg","height":359,"width":500}},"price":{"currency":"EUR","amountInCents":7107,"amount":71.07}}
```
st
