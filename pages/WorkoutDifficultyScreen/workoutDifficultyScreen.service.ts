export type DifficultyOption = {
  name: string;
  icon: string;
  subText: string;
  id: number;
};

export function getDifficultyOptions(): DifficultyOption[] {
  return [
    {
      name: "Débutant",
      icon: "seedling",
      subText: "Pour bien commencer",
      id: 1,
    },
    {
      name: "Intermédiaire",
      icon: "fire",
      subText: "Tu as les bases",
      id: 2,
    },
    {
      name: "Confirmé",
      icon: "trophy",
      subText: "Pousse tes limites",
      id: 3,
    },
  ];
}
