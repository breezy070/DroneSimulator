# DroneSimulator

Exercice de simulation de drones

Mon but dans cet exercice de praire est de me remettre dans le rythme et de travailler mon Javascript. J'ai décidé de ne pas m'en servir trop des plugins car comme j'avais dit, je voulais travailler mon Javascript;
et pas passer mon temps à configurer un plugin.

J'ai déployé en ligne mon projet sur Netlify pour que la visualisation soit plus facile pour le professeur. j'ai intégré avec github et netlify, du CI/CD, si je change quelque chose dans mon code, et que je le push
sur git, le site web s'actualisera automatiquement aussi.

lien en ligne: https://heartfelt-gumption-65a71a.netlify.app/

Comment il marche:

j'ai fait 3 façons différentes pour faire bouger le drone.

façon 1.
    a) On clique sur le bouton "choose depart", on click n'importe où dans la carte pour choisir une coordonnéé. on click encore sur le bouton "choose depart" pour chopper cette coordonnée et l'insérer dans l'input
     "coordinates start". Ensuite, on clique encore n'importe où dans la carte pour choisir le point de destination et on clique sur "choose arrivée" pour l'insérer dans l'input "coordinates end".
    b) On clique le bouton "GO" pour faire bouger le drone à la coordonnée souhaité. REMARQUE: je ne comprends pas pourquoi, mais pour que le bouton "go" marche, il faut le cliquer 2 fois....

façon 2. On click sur le bouton "start shipment" et le drone effectuera un trajet pre determiné dans un ficher json. On peut aussi cliquer "cancel shipment" pour annuler le déplacement.

façon 3. En haut à gauche de la carte, il se trouve un + et un - pour le zoom, juste en bas se trouve un bouton avec une ligne. on peut cliquer sur ce bouton, et clicker ensuite sur n'importe où dans la carte à plusieurs fois
et de dessiner son trajet, puis on click sur "Finish" et le drone suivra le trajet tracé.
