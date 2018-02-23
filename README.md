# amazon-partner-api-server

## Goal
Amazon api partner is an awesome way to show product related to content.
But api is very verbose, with a lot of data I don't need.

I just want to have a json with pictures, title, link and price.

## Install

Of course ...

``
npm install
` `

Edit the generated conf.js file, to put your amazaon partner credentials

## Use it
Go to
``
http://localhost:1337/anything you want
``

And you will obtain a json like:
``
{
    "asin":[
        "B00TR8ZM86"
    ],
    "title":[
        "Funko - POP TV - Doctor Who - 6" TARDIS"
    ],
    "url":[
        "https://www.amazon.fr/Funko-POP-Doctor-Who-TARDIS/dp/B00TR8ZM86?psc=1&SubscriptionId=AKIAILCDWDHURXF775TQ&tag=gkdv-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B00TR8ZM86"
    ],
    "pictures":{
        "small":{
            "url":[
                "https://images-eu.ssl-images-amazon.com/images/I/419IQeztj4L._SL75_.jpg"
            ],
            "height":75,
            "width":52
        },
        "medium":{
            "url":[
                "https://images-eu.ssl-images-amazon.com/images/I/419IQeztj4L._SL160_.jpg"
            ],
            "height":160,
            "width":110
        },
        "large":{
            "url":[
                "https://images-eu.ssl-images-amazon.com/images/I/419IQeztj4L.jpg"
            ],
            "height":500,
            "width":345
        }
    },
    "price":{
        "currency":"EUR",
        "amountInCents":1357,
        "amount":13.57
    }
}
``
