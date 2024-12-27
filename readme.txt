# Anleitung zur Installation und Start

Hier erkläre ich kurz, Wie Sie das Projekt selber lokal installieren und starten können.

Zunächst der grobe Aufbau: 
- frontend -> React (Vite)
- backend -> Django (Django Rest Framework)
- database -> PostgreSQL (Supabase)

Wir haben uns dafür entschieden, dass wir das Frontend und das Backend getrennt voneinander entwickeln.
Anstelle das wir das Frontend(HTML, CSS, JS) direkt über Django rendern, haben wir uns für 
React (Vite) entschieden, welches nur über eine REST API mit Django verbunden ist. 
-> Dadurch haben wir die Möglichkeit, die Webseite dynamisch zu rendern (React)  
-> Mehr Bibliotheken können verwendet werden 
-> Bessere Skalierbarkeit, da abgekapselte Systeme 
-> Vorerfahrung mit React 

Frontend (Starten):
-> In den passenden Verzeichnisse gehen (frontend) (cd frontend )
-> Anlegen einer .env Datei mit Variablen (siehe sample.env)
   Hierfür wird ein Supabase Konto benötigt, welches ein Storage Bucket mit den Namen "railwail" besitzt.
   Dieses Bucket wird benötigt, um die Bilder zu speichern und an die Nutzer auszuspielen
   Die URL zu diesem Bucket wird entsprechend in der .env Datei eingetragen
-> npm i (installieren aller Pakete)
-> npm run dev (startet den Vite Server im Entwicklungsmodus)
-> npm run build (erstellt eine Produktionsversion des Frontends)
-> npm run preview (startet die Produktionsversion des Frontends)

Backend (Starten):
-> In den passenden Verzeichnisse gehen (backend) (cd backend)
-> Pyhton Umgebung aktivieren 
   source venv/bin/activate (Bei Windows entsprechend anders)
-> Pakete installieren: pip install -r requirements.txt
-> Anlegen einer .env Datei mit Variablen (siehe sample.env)
   Hierfür wird ebenfalls ein Supabase Konto (Postgres DB und S3 Bucket) benötigt, welches ein Storage Bucket mit den Namen "railwail" besitzt.
   Zudem brauchen wir entsprechend die API Keys von Supabase, welche uns dazu 
   autorisiert, auf die Datenbank zuzugreifen.

   Neben Supabase, brauchen wir noch ein Replicate Konto, welches uns ermöglicht,
   entsprechende AI Modelle zu verwenden. Hierfür benötigen wir ebenfalls einen API Key,
   welche in der .env Datei eingetragen werden muss.

   Als letzes brauchen wir ein Konto bei Resend, welches uns ermöglicht, E-Mails zu versenden, was für 
   das zurücksetzen des Passwords benötigt wird. 
-> DB Schema erstellen: python manage.py makemigrations
-> DB Schema anwenden: python manage.py migrate
   Nun wird bei Supabase entsprechend die Tabellen eingetragen und 
   bereits vorab mit Daten gefüllt.
-> python manage.py runserver (startet den Django Server)

