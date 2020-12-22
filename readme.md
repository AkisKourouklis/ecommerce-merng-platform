# To start the development version for the first time do

- docker-compose up --build

# To start the development version afterwards do

- docker-compose up

# For Production

## You need to create a 2 sub-domains called

1. admin.sovrakofanela.site
1. api.sovrakofanela.site

## You need to put the ssl certificates under

ssl_certificate /etc/letsencrypt/live/admin.sovrakofanela.site/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/admin.sovrakofanela.site/privkey.pem;

## To run the application to

- docker-compose -f docker-compose-prod.yml up --build
