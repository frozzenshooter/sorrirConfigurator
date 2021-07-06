### Offene Punkte

##### Nächste Schritte
 + Für jeden Arrow wird der Zustand des Eltern und des Kindknotens gehalten (zb bei einem Upgrade muss der interne Zustand des Kind und des Elternknoten festgelegt sein) - dies kann man Mittels dropdowns lösen ( für jeden arrow: ein dropdown mit dem Zuständen des Elternknotens und ein dropdown mit den Zuständen des Kindknotens )
 + Das kann man wiederrum in einem eigenem Step umsetzen (dh einen für das Upgrade und einen für die Degradation) - gespeichert wird das an dem jeweiligen Arrow
 + Wenn man die Shadowmodes löscht müssen entsprechende Dependencies in den DegradationLevels gelöscht werden!! Gleiches gilt für das löschen an sich
 + States von dependencylevel muss überall nachgezogen werden
 + Json Validierung an neues Model anpassen + Testdaten aktualisieren
 + Deletion Handling of Levels - create/update LevelChanges for upgrades and degradations
 + ID update for degradation levels has to also update the levelchanges
 
 + Löschen einer Zuordnung mittels drag and drop des knotens auf "Mülleimer" - hierfür am bestene eine zentrale lösch funktion bauen, die dann quasi nur das item, den typ(upgrade/degradation) und eine configuration erhält und eine modifizierte version zurückgibt - kann man auch in dem delete beim Löschen eines Levels verwenden

 + OFF bekommt immer die ID 0 - beim erstellen der Level etc beachten.
 + Minus bei den TreeNodes (Wenn kein Label vorhanden: statischer String anzeigen)
 + Übergänge löschen (states der LevelChanges)
 + LevelChanges benötigen Result+StartState
 + Alle startzusätnde ergeben eine neue Zeiel Beim Zustand definieren -> überall kann ein beliebiger Endzustand aus dem resultierenden Level ausgwählt werden
 + Hierfür benötigt man dann wiederum ein eigenes Datenobjekt
 + Id aktualisieren beim level -> alles nachziehen
 + zusammenfassen der einzelnen enums für upgrade/degradtion in einem zentralen enum

### Further general steps
+ Static files require some work (change icons, ...)
+ Welcome page with the offical logo