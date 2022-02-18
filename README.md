# backend-szinyei-artworks


# Login Server

loginserver.js              Elérés  -----  localhost:3101
users.json - ből szedi az adatokat

----------szerkezete, plusz titkosítás még átbeszélésre vár !!!!!!!!!!!--------------

Lekérdezések:

localhost:3101                         -----   Metropolitan artwork API Login Server

localhost:3101/api/users               -----   Összes User adata

locahost:3101/api/users/id/:userid     -----   Egy adott ID-ű user adatait adja vissza

localhost:3101/api/users/email/:email  -----   Kikeresi a küldött email címet, és visszaküldi a password-öt, és ID-t.




# Data Server

server.js                      Elérés  -----  localhost:3100
data.json - ből szedi az adatokat

----------szerkezete még átbeszélésre vár !!!!!!!!!!!-------------

Lekérdezések:

localhost:3100                         -----   Metropolitan artwork API Data Server

localhost:3100/api/userDatas           -----   Összes user mentett adatát adja vissza

locahost:3100/api/byUserId/:userid     -----   Egy adott ID-ű user mentett adatait adja vissza




