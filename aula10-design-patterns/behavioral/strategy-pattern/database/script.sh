docker run \
      --name postgres \
      -e POSTGRES_USER=edsonbruno \
      -e POSTGRES_PASSWORD="senha123" \
      -e POSTGRES_DB=heroes \
      -p 5432:5432 \
      -d \
      postgres

docker logs postgres
docker exec -it postgres psql --username edsonbruno --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;
DELETE FROM warriors;

docker run \
       --name mongodb \
       -e MONGO_INITDB_ROOT_USERNAME=edsonbruno \
       -e MONGO_INITDB_ROOT_PASSWORD="mongo123" \
       -p 27017:27017 \
       -d \
       mongo:4

docker logs mongodb
docker exec -it mongodb bash

mongo -u edsonbruno -p mongo123
use heroes
db.getName();
db.dropDatabase();

