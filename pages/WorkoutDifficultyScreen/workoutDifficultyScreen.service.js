/**
 * Retourne la liste des niveaux de difficulté disponibles avec leur nom, image et identifiant.
 * @returns {{ name: string, source: any, id: number }[]}
 */
export function getDifficultyOptions() {
  return [
    {
      name: "Débutant",
      source: require("../../assets/illustrations/debutant.webp"),
      id: 1,
    },
    {
      name: "Intermédiaire",
      source: require("../../assets/illustrations/intermediaire.webp"),
      id: 2,
    },
    {
      name: "Confirmé",
      source: require("../../assets/illustrations/confirme.webp"),
      id: 3,
    },
  ];
}
