import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/theme';
import { RootStackParamList } from '../../models/navigation';
import { styles } from './ExerciceScreen.styles';
import InstructionsModal from './modals/InstructionsModal';
import { useExercice } from './useExercice';
import { Performance } from '../../shared/types';

type Props = NativeStackScreenProps<RootStackParamList, 'exercice'>;

export default function ExerciceScreen({ navigation, route }: Props) {
  const {
    exerciseSelected,
    muscleGroup,
    imagePath,
    descriptionSentences,
    screenWidth,
    currentSet,
    hasHistory,
    sortedCurrentWorkoutHistory,
    exerciseID,
    modalVisible,
    openModal,
    closeModal,
    goBack,
    goToTimer,
    formatHistoryDate,
    formatCardioDuration,
  } = useExercice(navigation, route);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <InstructionsModal
        visible={modalVisible}
        onClose={closeModal}
        exerciseName={exerciseSelected.exercise.name}
        descriptionSentences={descriptionSentences}
      />

      {/* ── Full-width GIF with gradient overlay ── */}
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={imagePath} contentFit="contain" />
        <LinearGradient
          colors={['transparent', '#2A1B5A']}
          style={styles.imageGradient}
        />
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}
      >
        {/* Title + instructions button */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{exerciseSelected.exercise.name}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.instructionsBtn}
            accessibilityLabel="Voir les informations sur l'exécution de l'exercice"
            accessibilityHint="Ouvre une modale"
            onPress={openModal}
          >
            <Text style={styles.instructionsBtnText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* ── Performance history ── */}
        {hasHistory && (
          <View style={styles.perfContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Dernières performances</Text>
            </View>

            <ScrollView
              horizontal
              snapToInterval={screenWidth - 32}
              snapToAlignment="start"
              pagingEnabled={false}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
            >
              {sortedCurrentWorkoutHistory.map((history, i) => {
                const fullDate = formatHistoryDate(history.date);
                return history.performances
                  .map((performance: Performance, j: number) => {
                    if (typeof performance.exercise === 'string') return null;
                    if (performance.exercise._id !== exerciseID) return null;
                    return (
                      <View
                        key={`${i}-${j}`}
                        style={{ width: screenWidth - 32, paddingRight: 16 }}
                      >
                        <Text style={styles.performanceDate}>{fullDate}</Text>
                        <View style={styles.perfSection}>
                          {performance.sets.map((set, k) => {
                            const { hours, minutes } = formatCardioDuration(
                              set.rest,
                            );
                            return (
                              <View key={k} style={styles.perfCard}>
                                <Text style={styles.perfSerieLabel}>
                                  S{k + 1}
                                </Text>
                                {muscleGroup !== 'Cardio' ? (
                                  <Text style={styles.perfText}>
                                    {set.reps} reps · {set.weight} kg
                                  </Text>
                                ) : (
                                  <Text style={styles.perfText}>
                                    {set.rest / 60} min · Résistance{' '}
                                    {set.weight}
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })
                  .filter((item) => item !== null);
              })}
            </ScrollView>
          </View>
        )}

        {/* ── Goals section ── */}
        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Objectifs de la série</Text>
          </View>

          {/* Serie indicator badge */}
          <View style={styles.serieBadge}>
            <Text style={styles.serieBadgeLabel}>Série</Text>
            <Text style={styles.serieBadgeValue}>
              {currentSet} / {exerciseSelected.customSets.length}
            </Text>
          </View>

          {/* Goal cards */}
          {muscleGroup !== 'Cardio' && (
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>
                Répétitions : {exerciseSelected.customSets[0].reps}
              </Text>
            </View>
          )}

          <View style={styles.goalCard}>
            <Text style={styles.goalText}>
              {muscleGroup !== 'Cardio' ? 'Charge' : 'Résistance / Inclinaison'}{' '}
              : {exerciseSelected.customSets[0].weight}
              {muscleGroup !== 'Cardio' && ' kg'}
            </Text>
          </View>

          {muscleGroup === 'Cardio' && (
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>
                Durée : {formatCardioDuration(exerciseSelected.rest).hours} h{' '}
                {formatCardioDuration(exerciseSelected.rest).minutes} min
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── Bottom navigation bar ── */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.backBtn}
          onPress={goBack}
          accessibilityLabel="Retour à la liste des exercices"
        >
          <FontAwesome6
            name="chevron-left"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text style={styles.backBtnText}>Retour</Text>
        </Pressable>

        <Pressable
          style={styles.validateBtn}
          onPress={goToTimer}
          accessibilityLabel="Valider la série et démarrer le repos"
        >
          <FontAwesome6
            name={muscleGroup !== 'Cardio' ? 'check' : 'play'}
            size={15}
            color={COLORS.background}
          />
          <Text style={styles.validateBtnText}>
            {muscleGroup !== 'Cardio'
              ? `Valider · S${currentSet}`
              : `Démarrer · S${currentSet}`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
