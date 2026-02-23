import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BtnMuscleGroup from '../../components/BtnMuscleGroup';
import Underline from '../../components/Underline';
import { COLORS } from '../../constants/theme';
import muscleGroupIcons from '../../utils/muscleGroupIcons';
import { styles } from './ExercisesByMuscleScreen.styles';
import { useExercisesByMuscleScreen } from './useExercisesByMuscleScreen';

export default function ExercisesByMuscleScreen({ navigation }) {
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
        <View>
          <Text style={styles.title}>Par muscle</Text>
          <Underline width={60} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.allBtn}
        activeOpacity={0.75}
        onPress={handleSelectAll}
        accessibilityLabel="Voir tous les groupes musculaires"
      >
        <View style={styles.allBtnLeft}>
          <View style={styles.allBtnIconContainer}>
            <FontAwesome name="th" size={18} color={COLORS.background} />
          </View>
          <Text style={styles.allBtnText}>Tous les groupes musculaires</Text>
        </View>
        <FontAwesome name="chevron-right" size={12} color={COLORS.accent} />
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <FlatList
          data={muscleGroupIcons}
          keyExtractor={(item, index) => index.toString()}
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
        />
      </View>
    </View>
  );
}
