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
 
##### Optional/Am Schluss
 + Animation um zu erklären, dass man den Wizard zum Navigieren nutzen kann
 + Textfeld/Editor zum manuellen Bearbeiten der Konfiguration -> hierfür wird dann auch die Validierung benötigt
 + Sortierung der Shadowmodes ("weiter rechts hat höhere prio")


### Further general steps
+ Static files require some work (change icons, ...)
+ Welcome page with the offical logo
+ Renaming/Comments 