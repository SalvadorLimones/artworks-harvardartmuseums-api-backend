# backend-szinyei-artworks


# Login Server

loginserver.js              Elérés  -----  localhost:3101
users.json - ből szedi az adatokat

----------szerkezete, plusz titkosítás még átbeszélésre vár !!!!!!!!!!!--------------

Lekérdezések:

localhost:3101                         -----   Metropolitan artwork API Login Server  
                                               Teszt jelleggel.

localhost:3101/api/users               -----   Összes User adata
                                               Teszt jelleggel.

locahost:3101/api/users/id/:userid     -----   Egy adott ID-ű user adatait adja vissza
                                               Teszt jelleggel.

localhost:3101/api/users/email/:email  -----   Kikeresi a küldött email címet, és visszaküldi a password-öt, és ID-t.            Teszt jelleggel.







localhost:3101/api/user/reg            -----   Regisztráció post típusú request.
                                               A body-ban várunk adatokat.
                                               username, email, password
                                               images: [] hozzáadásra kerül a reg során.







localhost:3101/api/user/login          -----   Login. 

Post típusú request.Headerben várunk 'Authorization' cimke alatt username és password-öt.  &&& karakerláncal elválasztva.








localhost:3101/api/picture/save       -----   User adat mentése.

Post típusú request.Headerben várunk 'Authorization' cimke alatt username és password-öt.  &&& karakerláncal elválasztva. Ez alapján megkeressük a usert az adatbázisban. Találat esetén a bodyban küldöt object lementésre kerül. Ha nincs ilyen user 401 es hiba megy vissza.Ha nincs adat akkor 400-as hiba megy vissza.
A vár object szerkezete:

savedImage = {
    lastupdate: data.lastupdate,
    title: data.title,
    classification: data.classification,
    century: data.century,
    culture: data.culture,
    dated: data.dated,
    department: data.department,
    dimensions: data.dimensions,
    division: data.division,
    medium: data.medium,
    period: data.period,

    images: [
      {
        baseimageurl: data.images[0].baseimageurl,
        alttext: data.images[0].alttext,
        description: data.images[0].description,
        technique: data.images[0].technique,
      },
    ],
    people: [{ displayname: data.people[0].displayname }],
    worktypes: [{ worktype: data.worktypes[0].worktype }],

  };








