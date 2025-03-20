
# 💪 Progress Pulse - Suivi de séance de musculation - Frontend

**Progress Pulse** est une application mobile qui permet de créer ses séances de musculation et de suivre sa progression. C'est un projet de fin de formation **fait en équipe de 3 sur une durée de 2 semaine.**

 L'application inclut des fonctionnalités avancées comme : l'**authentification**, la **création de séance avec objectifs**, le **suivi de séance**, le **temps de repos intégré**, l'**historique des performances** et le **suivi de poids.**

## 🚀 Démo en ligne
🔗 Application déployée : [expo.dev/preview](https://expo.dev/preview/update?message=Stable%20Version&updateRuntimeVersion=1.0.0&createdAt=2025-03-20T15%3A18%3A36.741Z&slug=exp&projectId=073b9ab9-b0d3-452b-8356-4ca49a271182&group=30af1b4d-2424-4643-8852-07171c3f5399) (Téléchargez l'application Expo Go sur votre téléphone et scannez le code QR)\
📹 Vidéo démo : [voir la vidéo démo](https://www.youtube.com/watch?v=Osh-E0SRI3U)\
🛠️ Repo Backend : [Accéder au repo backend](https://github.com/ThomasLebel/ProgressPulse-Backend)

## 📱 Installation & Test
📲 Téléchargez l’application **Expo Go** sur votre téléphone :  
* [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)  
* [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&gl=US)

📸 Une fois Expo Go installé, scannez ce QR code avec votre appareil photo, vous serez redirigé vers Expo Go et l'application se lancera automatiquement :


![QR code progress pulse](https://github.com/user-attachments/assets/eb01de40-3c8e-43e9-82fa-b209862ac629)



## 🧱 Stack technique

| Frontend  | Backend | Base de données | Autres services |
| -------- |-------| ---------------| ---------------|
|React Native|Node.js|MongoDB / Mongoose | Nodemailer (Envoi d'email)|
|Expo|Express.js|| Expo (Déploiement frontend)|
||||Vercel (Déploiement Backend)|


## 🖥️ Fonctionnalités principales

*   🔐 **Authentification sécurisée** (inscription / login)
*   💪 **Création de séance personnalisée** sélection d'exercices et d'objectifs de performances
*   📚 **Bibliothèque de séances pré-définies** 100% personnalisables
*   👀 **Suivi de séance** gif d'execution de l'exercice en cours et affichage des objectifs définis
*    ✏️ **Saisie des performances** avec temps de repos intégré
*   📈 **Historique des performances** 
*   ⚖️ **Suivi du poids** avec graphique
*   🚀 **Suivi du nombre de séance** avec graphique
*   🛠️ **Modification de profil** email / mot de passe / pseudo / son du timer
*   🤷‍♂️ **Système de mot de passe oublié** envoi de code de réinitialisation par mail

## 📸 Aperçu

<table>
  <tr>
    <th>Connexion</th>
    <th>Accueil</th>
    <th>Création de séance</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/54fc4f13-18c9-43c0-a9c5-d3bdf0d8da13" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/4d67ca60-228c-4adf-a8aa-1dd6c1157f1c" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/f01c66af-7f0b-44bd-b484-cbb82167e6c0" width="200"/></td>
  </tr>
  <tr>
    <th>Séances Pré-définies</th>
    <th>Récap séance</th>
    <th>Selection groupe musculaire</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4c7d81e7-60a5-4d6a-a7e0-11cd91c9400c" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/4ed9ca8a-5ad9-427b-aa0a-e1895b5a8983" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/84dfb17d-04b2-46ff-82ba-69ac471c8798" width="200"/></td>
  </tr>
  <tr>
    <th>Choix des exercices</th>
    <th>Saisie des objectifs</th>
    <th>Exercice en cours</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2558957a-a1ac-43d7-b1ed-af612b18d64c" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/73faea5a-fb27-406b-b263-be03b5ba724a" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/7dab817c-55e9-4f2b-95e5-84cfe79001e3" width="200"/></td>
  </tr>
  <tr>
    <th>Fin de série</th>
    <th>Fin de séance</th>
    <th>Statistiques</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4302641d-c400-49bb-96c2-c4d516d8da4f" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/12f0a9ea-b7ea-4bad-ac79-9ccafdfe884a" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/22f9e1b5-e771-4a5b-81a4-850d6bf188a4" width="200"/></td>
  </tr>
    <th>Suivi de poids et objectif</th>
    <th>Historique de séance</th>
    <th>Paramètres</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e703e66f-b555-4e9d-98ab-a6ecfa33f810" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/5c5112e4-bbb7-45a1-96cb-681421852f76" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/c5681b16-88f2-49e6-809d-301156c335ce" width="200"/></td>
  </tr>
</table>

## ⚙️ Librairies utilisées
* **moment :** Formattage des dates
* **react-native-confetti-cannon :** Animation de confettis
* **react-native-countdown-circle-timer :** Animation progression timer
* **react-native-modal-datetime-picker :** Modale sélection de date
* **react-native-progress :** Animation progression objectif de poids
* **react-native-wheel-time-picker :** Modale sélection durée du timer

## 👨‍💻 Auteurs
[Pierre Gleize](https://github.com/pierreGleize)\
[Alexandre Lassaigne](https://github.com/AlexandreLass)\
[Thomas Lebel](https://github.com/ThomasLebel)\

🔗 [Linkedin](https://www.linkedin.com/in/thomas-lebel-6047ba129/)\
📫Contact : thomas.lebel38@gmail.com


