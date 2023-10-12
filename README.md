# ProiectBD
Proiect pentru: Baze de date




De instalat:
	- Visual Studio Code https://code.visualstudio.com/download
	- Visual Studio 2022 - Community
	- SourceTree https://www.sourcetreeapp.com/

Configurare:
	- node version 18.16.0
	SAU:
	- nvm :
		- https://github.com/coreybutler/nvm-windows/releases de aici scrolleaza pana la varianta .exe. Descarca versiunea .exe, accepta tot
		- Deschide un powershell cu drepturi de **admin** 
		- Ruleaza comanda `nvm install 18.16.0` apoi comanda `nvm use 18.16.0`
		- Deschide SourceTree -> Click "Clone" -> la Source Path: https://github.com/mihaelabiciin/ProiectBD.git, completeaza destination si name apoi Click Clone.
		- In target folder ar trebui sa se fi creat proiectul.
		- Deschide Backend, ruleaza Backend.sln (in Visual Studio 2022)
		- Click Run
		- Deschide Visual Studio Code
		- File -> Open Folder -> Selectam 'Fronend'
		- Terminal -> New Terminal -> scriem 'npm start'
		- Apasam enter si ar trebui sa ruleze 
		- Dupa ce se compileaza, scriem in browser: http://localhost:4200/
		
	Mod de lucru:
		- Mergem in SourceTree
		- Trebuie sa fim pe main (BRANCHES, sa fie ingrosat main)
		- Dam "Pull" ca sa fim siguri ca e "la zi"
		- Apoi dam click pe "Branch" si scriem un nume de branch (care trebuie sa descrie ce dorim sa facem) - nu trebuie sa contina spatii
		- Create Branch
		- Scriem codul cu modificarile dorite
		- revenim in SourceTree
		- ne ducem la "File Status"
		- Dam stage la ce dorim sa ducem mai departe(de obicei tot)
		- Scriem un comentariu sugestiv
		- Bifam "Push Changes immediately to -"
		- Dam commit
		
		Dupa ce facem modificari in baza de date rulam:
 Scaffold-DbContext "Server=localhost;Database=litoral;Uid=root;Pwd=Paroladeacces1!" Pomelo.EntityFrameworkCore.MySql -OutputDir Models

		
