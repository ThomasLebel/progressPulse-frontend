import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import ExerciseCard from "../components/ExerciseCard";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateCustomSets } from "../reducers/workoutCreation";


export default function WorkoutSummaryScreen({ navigation, route }) {
  const { backTo, categorie = {} } = route.params || {};
  console.log(backTo);

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  const [exerciseName, setExerciseName] = useState("")
  const [exerciseID, setExerciseID] = useState("")
  const [charge, setCharge] = useState("")
  const [nbSets, setNbSets] = useState("")
  const [nbReps, setNbReps] = useState("")
  const [restMinutes, setRestMinutes] = useState("1")
  const [restSeconds, setRestSeconds] = useState("00")
  const [emptyFields, setEmptyFields] = useState(false)

  const closeModal = () => {
    setModalVisible(false)
    setExerciseName("")
    setExerciseID("")
    setCharge("")
    setNbReps("")
    setNbSets("")
    setRestMinutes("")
    setRestSeconds("")
  }

  const openModal = (exerciseName, exerciseID, charge, nbReps, nbSets, restMinutes, restSeconds) => {
    console.log(exerciseName, charge, nbReps, nbSets, restMinutes, restSeconds)
    setExerciseName(exerciseName)
    setExerciseID(exerciseID)
    setCharge(charge.toString())
    setNbReps(nbReps.toString())
    setNbSets(nbSets.toString())
    setRestMinutes(restMinutes.toString())
    setRestSeconds(restSeconds.toString())
    setModalVisible(true)
  }

  const updateExercise = () => {
    let customSets = []
    for (let i=0; i< parseInt(nbSets); i++){
      customSets.push({weight: parseInt(charge), reps: parseInt(nbReps)})
    }
    const restConverted = (parseInt(restMinutes) * 60) + parseInt(restSeconds)
    const exerciseToUpdate = {
      exerciseID : exerciseID,
      newSets: customSets,
      rest : restConverted
    }
    dispatch(updateCustomSets(exerciseToUpdate))
    closeModal()
  }

  const workout = useSelector((state) => state.workoutCreation.value)
  const groupedWorkoutExercises = workout.exercises.reduce((groups, exercise) => {
    const {muscleGroup} = exercise
    if(!groups[muscleGroup]){
      groups[muscleGroup] = []
    }
    groups[muscleGroup].push(exercise)
    return groups;
  }, {})

  let exercisesToShow = []

  for (let muscleGroup in groupedWorkoutExercises){
    exercisesToShow.push(
    <View style={styles.groupTitleSection}>
      <Text style={styles.groupTitle}>{muscleGroup}</Text>
      <Underline width={40} />
    </View>
    )
    const newExercisesToAdd = groupedWorkoutExercises[muscleGroup].map((exercise, i) => {
      const minutes = Math.floor(exercise.rest / 60)
      const seconds = exercise.rest % 60
      return (<ExerciseCard
            key={i}
            exerciseName={exercise.exerciseName}
            numberOfSets={exercise.customSets.length}
            numberOfReps={exercise.customSets[0].reps}
            weight={exercise.customSets[0].weight}
            restMinutes={minutes}
            restSeconds={seconds}
            exerciseID = {exercise.exercise}
            openModal={openModal}
          />)
    });
    exercisesToShow.push(newExercisesToAdd)
  }



  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView style={styles.modalBackground} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.modalView}>
              <View style={styles.crossContainer}>
                <FontAwesome
                    name={"times"}
                    size={30}
                    color={"white"}
                    onPress={closeModal}
                    style={styles.infoIcon}
                />
              </View>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{exerciseName}</Text>
                <Underline width={70} />
              </View>
              <View style={styles.infoContainer}>
                <FontAwesome
                  name={"info-circle"}
                  size={30}
                  color={"#A3FD01"}
                  onPress={() => navigation.navigate("muscleGroup")}
                  style={styles.infoIcon}
                />
                <Text style={styles.textInfo}>
                  Saisis tes données pour suivre ta progression !
                </Text>
              </View>
              <View style={styles.inputsContainer}>
                <Text style={styles.inputText}>Charge (Kg)</Text>
                <TextInput style={styles.input} placeholder="Charge" keyboardType="numeric" onChangeText={(value) => setCharge(value) } value={charge}></TextInput>
                <Text style={styles.inputText}>Nombre de séries</Text>
                <TextInput style={styles.input} placeholder="Nombre de séries" keyboardType="numeric" onChangeText={(value) => setNbSets(value) } value={nbSets}></TextInput>
                <Text style={styles.inputText}>Nombre de répétitions</Text>
                <TextInput style={styles.input} placeholder="Nombre de répétitions" keyboardType="numeric" onChangeText={(value) => setNbReps(value) } value={nbReps}></TextInput>
                <Text style={styles.inputText}>Temps de repos</Text>
                <View style={styles.restTimeContainer}>
                  <TextInput style={styles.restInput} placeholder="Minutes" keyboardType="numeric"onChangeText={(value) => setRestMinutes(value) } value={restMinutes} ></TextInput>
                  <Text style={styles.inputText}>min</Text>
                  <TextInput style={styles.restInput} placeholder="Secondes" keyboardType="numeric"onChangeText={(value) => setRestSeconds(value) } value={restSeconds} ></TextInput>
                  <Text style={styles.inputText}>sec</Text>
                </View>
              </View>
              {emptyFields && <Text style={styles.errorMessage}>Veuillez remplir tous les champs</Text>}
              <Button
                textButton="Modifier les séries"
                textColor="#A3FD01"
                width="260"
                height="40"
                background='#272D34'
                borderWidth={1}
                borderColor="#A3FD01"
                onPress={updateExercise}>
              </Button>
            </View>
          </KeyboardAvoidingView>
      </Modal>
      <View>
        <FontAwesome
          name={"chevron-left"}
          size={24}
          color={"#3BC95F"}
          style={{ marginLeft: 15, marginTop: 5 }}
          onPress={() => navigation.navigate(backTo, { categorie: categorie })}
        />
      </View>
      <View style={styles.mainContainer}>
        <ScrollView>
          {exercisesToShow}
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          background="#A3FD01"
          borderColor="none"
          textButton={"Valider ma séance"}
          textColor="black"
          width={300}
          height={50}
          onPress={() => navigation.navigate("Home")}
          isLinearGradiant={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  bottomContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  groupTitleSection: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  groupTitle: {
    color: "white",
    fontSize: 20
  },
  
  modalView:{
    width: "80%",
    height: "570",
    margin: 20,
    backgroundColor: '#272D34',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  crossContainer: {
    width: "100%",
    alignItems: "flex-end"
  },
  modalTitleContainer:{
    width:'100%',
    marginTop: '15'
  },
  modalTitle:{
    fontSize: 18,
    color: "white",
    fontWeight: "600"
  },
  infoContainer:{
    width: '100%',
    flexDirection: "row",
    marginTop: "15",
    alignItems: "center"
  },
  textInfo:{
    color:"white",
    paddingLeft: 10
  },
  inputsContainer:{
    width:'100%',
    marginTop: 40
  },
  inputText:{
    color: "white",
    marginBottom: 5
  },
  input:{
    width: '100%',
    height: "35",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom : 15
  },
  restTimeContainer:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  restInput:{
    width: '35%',
    height: "35",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom : 15
  },
  errorMessage:{
    color: "red",
    textAlign: "center"
  }
});
