import { FlatList, Pressable, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BtnMuscleGroup from "../../components/BtnMuscleGroup";
import Button from "../../components/Button";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import muscleGroupIcons from "../../utils/muscleGroupIcons";
import { styles } from "./MuscleGroupScreen.styles";
import { useMuscleGroupScreen } from "./useMuscleGroupScreen";

export default function MuscleGroupScreen({ navigation, route }) {
  const {
    isWorkoutAlreadyCreated,
    exercisesLength,
    finishButtonLabel,
    finishButtonWidth,
    handleFinish,
    handleNavigateToExercice,
    handleBack,
  } = useMuscleGroupScreen(navigation, route);

  return (
    <View style={styles.container}>
      {!isWorkoutAlreadyCreated && (
        <View style={styles.topContainer}>
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
            accessibilityLabel="Redirection pour choisir le type de séance"
          >
            <FontAwesome
              name={"chevron-left"}
              size={20}
              color={COLORS.primary}
            />
          </Pressable>
          <View>
            <Text style={styles.title}>Exercices </Text>
            <Underline width={60} />
          </View>
        </View>
      )}

      <View style={styles.btnContainer}>
        <FlatList
          data={muscleGroupIcons}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          columnWrapperStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <BtnMuscleGroup
              name={item.name}
              source={item.source}
              onPress={() => handleNavigateToExercice(item.name)}
              accessibilityLabel={`Choisir le groupe ${item.name}`}
              accessibilityHint={
                "On va être rediriger vers la liste des exercices correspondant au groupe musculaire choisi"
              }
            />
          )}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Exercices sélectionnés :{" "}
          <Text style={styles.bottomSpan}>{exercisesLength}</Text>
        </Text>
        <View style={styles.bottomBtnContainer}>
          <Button
            background={COLORS.primary}
            borderColor="none"
            textButton={finishButtonLabel}
            textColor="black"
            width={finishButtonWidth}
            height={50}
            onPress={handleFinish}
            isLinearGradiant={false}
            accessibilityLabel={"Voir le récapitulatif des exercices"}
            accessibilityHint={
              "Cette action vous redirigera vers la page affichant tous les exercices sélectionnés et vous permettra de valider la séance."
            }
          />
        </View>
      </View>
    </View>
  );
}
