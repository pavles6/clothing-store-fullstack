## ClothingStore app

### Pokretanje iz lokalnog okruzenja

#### Preduslovi
* Instaliran Docker

#### Koraci
1. Klonirajte repozitorijum
2. Pokrenite `cp .env.example .env` i izmenite env varijable u `.env` fajlu
2. Pokrenite `docker-compose up` da pokrente aplikaciju u lokalnom okruzenju
3. U zavisnosti od vrednosti $APP_PORT npr. 3000, aplikacija ce biti dostupna na: `http://localhost:3000`


### Dijagram baze podataka
![diagram](https://github.com/user-attachments/assets/c9accb39-5201-4571-80c3-96854acb7170)

### API dokumentacija
Postman kolekcija u JSON formatu se nalazi u root-u projekta
