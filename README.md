# CoreBuild – Számítógép-építő webalkalmazás

A **CoreBuild** egy React alapú, teljes funkcionalitású webalkalmazás, amely lehetővé teszi a felhasználók számára, hogy egyedi számítógép-konfigurációkat állítsanak össze, majd azokat megrendeljék. Az oldal emellett profilt, admin felületet és reszponzív, letisztult dizájnt is tartalmaz.

## Főbb jellemzők

- 🖥️ **Interaktív számítógép-építő** – tíz különböző alkatrészkategória közül választhatsz, dinamikus legördülő menük segítségével.
- 📋 **Összesítő panel** – a kiválasztott alkatrészek listája és a megrendelés véglegesítése.
- 👤 **Felhasználói fiókkezelés** – regisztráció, bejelentkezés, kijelentkezés, profiloldal.
- 🛒 **Megrendelés** – kiválasztott alkatrészek kosárba helyezése nélkül, közvetlen rendelésleadás fizetési mód megadásával.
- 🔐 **Admin felület** – felhasználók és rendelések listázása, törlés (admin jogosultsággal).
- 📱 **Reszponzív dizájn** – Bootstrap 5 és saját CSS segítségével mobilon, tableten és asztali gépen is jól használható.
- 🎨 **Modern megjelenés** – animált háttér (GIF), üveghatású panelek, átmenetek és lebegő animációk.
- 🗺️ **Beágyazott Google Térkép** – a cég címének megjelenítése a Kapcsolat szekcióban.

### Kezdőlap (`/` – `Kezdolap.jsx`)
- Az alkalmazás nyitóoldala.
- Tartalma:
  - **Logó** és egy **animált háttérkép** (Core_build_background.gif).
  - Szlogen: „building the future, one line at a time”.
  - Egyetlen gomb: **„KEZDD EL AZ ÉPÍTÉST”** – a `/login` oldalra navigál.


### Bejelentkezés (`/login` – `Login.jsx`)
- Űrlap **email** és **jelszó** megadásához (`InputMezo` komponensekkel).
- **„BEJELENTKEZÉS”** gomb:
  - Ellenőrzi, hogy minden mező ki van-e töltve.
  - Meghívja a `login()` API függvényt.
  - Sikeres bejelentkezés esetén rövid késleltetés után átirányít a `/homepage` oldalra.
  - Hiba esetén hibaüzenetet jelenít meg (pl. hibás adatok, backend elérhetetlenség).
- Link a regisztrációs oldalra: **„Még nincs fiókod? Regisztrálj!”**.


### Regisztráció (`/register` – `RegPage.jsx`)
- Űrlap mezők: **E-mail**, **Felhasználónév**, **Telefonszám**, **Jelszó**, **Jelszó megerősítése**.
- **„REGISZTRÁLOK”** gomb:
  - Ellenőrzi az összes mező kitöltöttségét és a két jelszó egyezését.
  - Meghívja a `register()` API függvényt.
  - Sikeres regisztráció után átirányít a bejelentkezés oldalra.
- Link a bejelentkezéshez: **„Már van fiókod? Jelentkezz be!”**.


### Főoldal (`/homepage` – `Homepage.jsx`)
- **Navigációs sáv (`NavBar` komponens)**: minden oldal tetején megjelenik, tartalma a bejelentkezési állapottól és a szerepkörtől függ (lásd lentebb).
- **Bal oldali blokk**:
  - Címsor: „Építsd meg az álmaid gépét”.
  - Leírás: szolgáltatás rövid bemutatása.
  - **„Irány a tervező”** gomb – a `/tervezo` oldalra visz.
- **„Népszerű termékek” körhinta**:
  - Négy előre definiált termékkártya (Gamer PC PRO, RTX 4070 Ti, Killer CORE PC, 32GB RAM Kit).
  - Automatikusan 4 másodpercenként vált, de a pöttyökkel kézzel is lehet lapozni.
  - Minden kártyán van **„Kosárba”** gomb – jelenleg dekoratív, nem rendel hozzá funkció.
- **„Rólunk” szekció** (`#rolunk`):
  - Cégbemutató szöveg.
  - Kiemelt jellemzők: 3 év garancia, ingyenes kiszállítás, élettartam támogatás, prémium szolgáltatás.
  - Statisztikák: 5000+ elégedett ügyfél, 4.9 Google értékelés, 3 év garancia.
- **„Kapcsolat” szekció** (`#kapcsolat`):
  - Három információs kártya: Cím (4030 Debrecen, Budai Ézsaiás u. 8/A.), Telefon, Email.
  - Beágyazott **Google Térkép** a cég címével.
- A navigációs sáv **Rólunk** és **Kapcsolat** linkjei az oldalon belüli szekciókhoz görgetnek (sima `<a>` hivatkozással és JavaScript görgetéssel).


### Profil (`/profile` – `Profile.jsx`)
- Csak **bejelentkezett felhasználók** érik el; ha nincs bejelentkezve, átirányít a `/login` oldalra.
- Megjeleníti a felhasználó adatait: **Felhasználónév**, **Email**, **Telefonszám**.
- Gombok:
  - **„Vissza a főoldalra”** – `/homepage`-re navigál.
  - **„Kijelentkezés”** – meghívja a `logout()` API-t és a kezdőlapra visz.
  - **„Profil módosítása”** – jelenleg nincs mögöttes funkció.


### Admin oldal (`/admin` – `Admin.jsx`)
- Csak **admin szerepkörű felhasználók** számára jelenik meg a navigációs sávban (a `NavBar` komponens ellenőrzi a `user.role === 'admin'` értéket).
- **Felhasználók táblázata**: ID, Email, Felhasználónév, Telefonszám, Szerepkör oszlopokkal.
  - Minden sorban **„Módosít”** gomb (jelenleg nem működik) és **„Töröl”** gomb.
  - A **„Töröl”** gomb meghívja a `deleteFelh(id)` API függvényt, majd eltávolítja a felhasználót a listából.
- **Rendelések táblázata**: Rendelés ID, Felhasználó ID.
  - Minden sorban **„Töröl”** gomb (funkció jelenleg nincs bekötve).
- **„Vissza a főoldalra”** gomb alul.


### Tervező (`/tervezo` – `Test.jsx`)
- Ez a számítógép-építő modul, ahol a felhasználó összeállíthatja a saját konfigurációját.
- **Fejléc**: logó és „TERVEZŐ” felirat.
- **Alkatrészlista**: 11 kategória, mindegyik egy-egy sorban:
  1. Processzor
  2. Processzor hűtő
  3. Alaplap
  4. Videókártya
  5. Memória (RAM)
  6. SSD meghajtó 1
  7. SSD meghajtó 2
  8. Merevlemez (HDD)
  9. Tápegység
  10. Számítógépház
  11. Rendszer hűtő (ventilátor)
- **Működés**:
  - Minden sorban egy **legördülő gomb** található. A gombra kattintva megjelenik a kategóriához tartozó alkatrészek listája (az adatokat a backend szolgáltatja).
  - A listából egy elemre kattintva a kiválasztás megtörténik, a gomb felirata a termék nevére változik, a dropdown pedig bezárul.
  - Az SSD2 és HDD kategóriákban elérhető egy **„Nincs / Később”** opció, amivel üresen hagyható a választás.
- **Összesítő panel**:
  - Megjeleníti a kiválasztott alkatrészek listáját (kategória név + termék név formában).
  - **„Összes törlése”** gomb – törli az összes eddigi választást.
  - **„Megrendelés”** gomb:
    - Ellenőrzi, hogy a felhasználó be van-e jelentkezve. Ha nincs, figyelmeztet és átirányít a `/login` oldalra.
    - Felugró ablakban bekéri a **fizetési módot** (`kartya`, `utanvet`, `atutalas`).
    - Végigmegy az összes kiválasztott terméken, és mindegyikhez külön `POST` kérést küld a backend `/orders/create` végpontjára.
    - A folyamat végén összegző üzenetet jelenít meg a sikeres és sikertelen rendelésekről.
- A háttérben animált GIF és a navigációs sáv itt is elérhető.


## Komponensek leírása

### `NavBar.jsx` – Navigációs sáv
- Minden oldalon megjelenik a fejlécben.
- Bal oldalon a **logó**, jobbra pedig menüpontok (linkek):
  - **Kezdőlap** (`/homepage`)
  - **Rólunk** (`#rolunk` – oldalon belüli hivatkozás)
  - **Kapcsolat** (`#kapcsolat` – oldalon belüli hivatkozás)
- Ha a felhasználó **nincs bejelentkezve**:
  - **Bejelentkezés** (`/login`)
  - **Regisztráció** (`/register`)
- Ha a felhasználó **be van jelentkezve**:
  - **Adminoldal** link (`/admin`) – csak akkor jelenik meg, ha a felhasználó szerepköre `admin`.
  - **Profil ikon** (`/profile` – egy felhasználó ikon formájában).
- A komponens props-ként kapja meg a `user` objektumot és az `onLogout` függvényt.


### `InputMezo.jsx` – Űrlapmező
- Egy újrafelhasználható komponens, amely egy `<label>` és egy `<input>` mezőt jelenít meg.
- Props: `label`, `type`, `value`, `setValue`, `placeholder`.
- Használják a bejelentkezés és a regisztráció oldalak.

### `UserInfo.jsx` – Felhasználói sor (admin táblázathoz)
- Egy táblázatsort jelenít meg a felhasználó adataival: ID, email, felhasználónév, telefonszám, szerepkör.
- Két gombot tartalmaz soronként:
  - **„Módosít”** (funkció jelenleg nincs hozzárendelve).
  - **„Töröl”** – meghívja a szülőtől kapott `onDelete` függvényt a felhasználó ID-jával.

### `OrderInfo.jsx` – Rendelési sor (admin táblázathoz)
- Megjeleníti a rendelés ID-t és a felhasználó ID-t.
- **„Töröl”** gomb (jelenleg nincs hozzárendelt eseménykezelő).


## Összegzés

A CoreBuild egy teljes körű, felhasználóbarát webes alkalmazás, amely lehetővé teszi a számítógép-összeszerelés folyamatának digitális támogatását: a komponensek kiválasztásától kezdve a regisztráción át egészen a rendelés leadásáig. Az admin felület segítségével a felhasználók és rendelések menedzselése is megoldott. Az oldal modern technológiákra épül, és reszponzív kialakításának köszönhetően bármilyen eszközön kényelmesen használható.


-----------------------
Készítette: [Szabó Attila, Szanyi Balázs] – CORE Build | Iskolai projekt, 2026.