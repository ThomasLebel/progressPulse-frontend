
# 💪 Progress Pulse - Suivi de séance de musculation - Frontend

**Progress Pulse** est une application mobile qui permet de créer ses séances de musculation et de suivre sa progression. C'est un projet de fin de formation **fait en équipe de 3 sur une durée de 2 semaine.**

 L'application inclut des fonctionnalités avancées comme : l'**authentification**, la **création de séance avec objectifs**, le **suivi de séance**, le **temps de repos intégré**, l'**historique des performances** et le **suivi de poids.**

 ## 📸 Aperçu

<table>
  <tr>
    <th>Connexion</th>
    <th>Accueil</th>
    <th>Création de séance</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5bd4eb54-c015-41cc-9e81-407d7ca7fc50" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/0bd2d9df-d548-4edf-a8ee-a35f69c5bf38" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/eb47604f-1a0d-486a-b2e2-a86a60b9c9b5" width="200"/></td>
  </tr>
  <tr>
    <th>Récap séance</th>
    <th>Selection groupe musculaire</th>
    <th>Choix des exercices</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/10f52222-1b88-45ef-a9b3-478f94cc032c" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/654f0c79-072b-4c2e-9016-d0adbf638463" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/1321e7d4-4a54-4830-ae64-b0b4cead53d6" width="200"/></td>
  </tr>
  <tr>
    <th>Saisie des objectifs</th>
    <th>Exercice en cours</th>
    <th>Fin de série</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/07660796-1b55-4796-9473-768474fe711f" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/75f7cb95-a114-40fb-ab6f-45a8e619798c" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/cd4f23d4-3493-46a5-b610-eecf17126e1c" width="200"/></td>
  </tr>
  <tr>
    <th>Fin de séance</th>
    <th>Suivi de poids et objectif</th>
    <th>Statistiques</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7d25b2c1-10e3-4c0d-94fa-eea479400869" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/10dcf810-c80a-4d87-8317-fcc233cc79a4" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/36429138-9a60-480d-833a-d6d67e92407c" width="200"/></td>
  </tr>
  <tr>
    <th>Statistiques exercice</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/9e6e87eb-f033-41cf-b03c-22b6be8313ea" width="200"/></td>
  </tr>
</table>

## 🚀 Démo en ligne
🔗 Application déployée : [expo.dev/preview](https://expo.dev/preview/update?message=Maj%20expo%20sdk&updateRuntimeVersion=1.0.0&createdAt=2025-05-08T08%3A30%3A30.679Z&slug=exp&projectId=073b9ab9-b0d3-452b-8356-4ca49a271182&group=b0d9a43e-c018-4fd1-af32-b4745f25acb1) (Téléchargez l'application Expo Go sur votre téléphone et scannez le code QR)\
📹 Vidéo démo : [voir la vidéo démo](https://www.youtube.com/watch?v=sle92Jb4YHo)\
🛠️ Repo Backend : [Accéder au repo backend](https://github.com/ThomasLebel/ProgressPulse-Backend)

## 📱 Installation & Test
📲 Téléchargez l’application **Expo Go** sur votre téléphone :  
* [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)  
* [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&gl=US)

📸 Une fois Expo Go installé, scannez ce QR code avec votre appareil photo, vous serez redirigé vers Expo Go et l'application se lancera automatiquement :


![qr code progresspulse](https://github.com/user-attachments/assets/5ef4a3a1-e588-4fc4-8786-9327ed6010b6)


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


