### Offene Punkte

##### Nächste Schritte

 + Upgrade als eigener step im Wizard (inverser Graph mit pfeile in andere Richtung)
 + Drag/Drop für das hinzufügen von arrows
 + jeweils ein Array für Upgrade und Degr. in der zentralen Konfiguration
 + Off node immer als Standard nicht löschbar (und root node)
 + Löschen einer Zuordnung mittels drag and drop des knotens auf "Mülleimer"
 + Level bekommt beim Erstellen/Bearbeiten-Dialog ein neues Feld: Zustände - im Endeffekt eine Liste von Strings mit den Zuständen (evt mit Chip Selector umsetzen)
 + Für jeden Arrow wird der Zustand des Eltern und des Kindknotens gehalten (zb bei einem Upgrade muss der interne Zustand des Kind und des Elternknoten festgelegt sein) - dies kann man Mittels dropdowns lösen ( für jeden arrow: ein dropdown mit dem Zuständen des Elternknotens und ein dropdown mit den Zuständen des Kindknotens )
 + Das kann man wiederrum in einem eigenem Step umsetzen (dh einen für das Upgrade und einen für die Degradation) - gespeichert wird das an dem jeweiligen Arrow
 + Wenn man die Shadowmodes löscht müssen entsprechende Dependencies in den DegradationLevels gelöscht werden!! Gleiches gilt für das löschen an sich
 + States von dependencylevel muss überalll nachgezogen werden
 + Json Validierung an neues Model anpassen + Testdaten aktualisieren
 + Deletion Handling of Levels - create/update LevelChanges for upgrades and degradations
 + ID update for degradation levels has to also update the levelchanges
 
 + OFF bekommt immer die ID 0 - beim erstellen der Level etc beachten.
 + Minus bei den TreeNodes (Wenn kein Label vorhanden: statischer String anzeigen)
 + Übergänge löschen (states der LevelChanges)
 + LevelChanges benötigen Result+StartState
 + Alle startzusätnde ergeben eine neue Zeiel Beim Zustand definieren -> überall kann ein beliebiger Endzustand aus dem resultierenden Level ausgwählt werden
 + Hierfür benötigt man dann wiederum ein eigenes Datenobjekt
 + Id aktualisieren beim level -> alles nachziehen

 + Frage: Muss der State des Levels beim Arrow Start und Result definiert sein oder nur beim Result?
 + Abhängig davon was muss angezeigt werden?
 + Wie sieht das aus mit dem Aufbau der LevelChanges? Passt das so?


### Further general steps
+ Static files require some work (change icons, ...)
+ Welcome page with the offical logo
+ Renaming/Comments 