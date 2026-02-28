import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BtnMuscleGroup from "../../../components/BtnMuscleGroup";
import Underline from "../../../components/Underline";
import { COLORS } from "../../../constants/theme";
import muscleGroupIcons from "../../../utils/muscleGroupIcons";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./ExercisesByMuscleScreen.styles";
import { useExercisesByMuscleScreen } from "./useExercisesByMuscleScreen";

type Props = NativeStackScreenProps<RootStackParamList, "exercisesByMuscle">;

export default function ExercisesByMuscleScreen({ navigation }: Props) {
  const { handleSelectMuscleGroup, handleSelectAll, handleBack } =
    useExercisesByMuscleScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Retour"
        >
          <FontAwesome name="chevron-left" size={18} color={COLORS.primary} />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Par muscle</Text>
          <Underline width={60} />
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={muscleGroupIcons}
          keyExtractor={(_item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <BtnMuscleGroup
              name={item.name}
              source={item.source}
              onPress={handleSelectMuscleGroup}
              accessibilityLabel={`Voir les exercices du groupe ${item.name}`}
              accessibilityHint="Redirige vers la liste des exercices de ce groupe musculaire"
            />
          )}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.allBtn}
              activeOpacity={0.7}
              onPress={handleSelectAll}
              accessibilityLabel="Voir tous les groupes musculaires"
            >
              <Text style={styles.allBtnText}>Tous les groupes</Text>
              <FontAwesome name="th" size={22} color={COLORS.accent} />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}
