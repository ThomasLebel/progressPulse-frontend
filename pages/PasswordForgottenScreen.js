import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { useState } from "react";

export default function PasswordForgottenScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongEmail, setWrongEmail] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [signupError, setSignupError] = useState(null);
    const [validEmail, setValidEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [codeMail, setCodeMail] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [errorToken, setErrorToken] = useState(false);
    const [noMatchPassword, setNoMatchPassword] = useState(false)
    const [isDoneVisible, setIsDoneVisible] = useState(false)
    

    const EMAIL_REGEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function handleEmail() {
        if (!email) {
            setWrongEmail(false);
            setEmptyFields(true);
        } else {
            setEmptyFields(false);
            if (!EMAIL_REGEX.test(email)) {
                setWrongEmail(true);
            } else {
                setWrongEmail(false);
                setEmptyFields(false);
                const user = {
                    email: email,
                };
                setIsLoading(true)
                fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/forgotPassword`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        if (data.result === false) {
                            setSignupError(data.error);
                            setIsLoading(false)
                        } else {
                            console.log("c'est bon")
                            setValidEmail(false),
                            setCodeMail(true)
                            setIsLoading(false)

                        }
                    });
            }
        }
    }

    const handleCode = () => {
        setIsLoading(true)
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/verifyResetToken`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: email, token: code}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result === true) {
                    setErrorToken(false)
                    setCodeMail(false)
                    setNewPassword(true)
                    setIsLoading(false)
                } else {
                    setErrorToken(true)
                    setIsLoading(false)
                }
            });
    };

    const handlePassword = () => {

        if(password === confirmPassword){
            setNoMatchPassword(false)
            const obj = {
                email : email,
                token : code,
                newPassword : password
            }
            setIsLoading(true)
            fetch(
                `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeForgottenPassword`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setNewPassword(false)
                    setIsDoneVisible(true)
                    setIsLoading(false)
                });
        } else {
            setNoMatchPassword(true)
            setIsLoading(false)
        }
        
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image
                source={require("../assets/illustrations/imageSigninSignup.webp")}
                style={styles.image}
            />
            <Text style={styles.mainTitle}>Réinitialise ton mot de passe</Text>
            {validEmail && (
                <View style={styles.modifyPassword}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        autoCapitalize="none"
                    />
                    {emptyFields && (
                        <Text style={styles.error}>Veuillez remplir tous les champs</Text>
                    )}
                    {wrongEmail && (
                        <Text style={styles.error}>Veuillez saisir un email au bon format</Text>
                    )}
                    {signupError && <Text style={styles.error}>{signupError}</Text>}
                    <Button
                        textButton="Envoyer le code"
                        textColor="black"
                        width="50%"
                        height="40"
                        background="#A3FD01"
                        onPress={handleEmail}
                    />
                </View>
            )}
            {codeMail && (
                <View style={styles.modifyPassword}>
                    <TextInput
                        style={styles.input}
                        placeholder="Code reçu dans tes mails"
                        onChangeText={(value) => setCode(value)}
                        value={code}
                        autoCapitalize="none"
                    />
                    {errorToken && <Text style={styles.error}>Token invalide</Text>}
                    <Button
                        textButton="Valider le code"
                        textColor="black"
                        width="50%"
                        height="40"
                        background="#A3FD01"
                        onPress={handleCode}
                    />
                </View>
            )}
            {newPassword && (
                <View style={styles.modifyPassword}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Nouveau mot de passe"
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Confirmer le mot de passe"
                        onChangeText={(value) => setConfirmPassword(value)}
                        value={confirmPassword}
                        autoCapitalize="none"
                    />
                    {noMatchPassword && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}
                    <Button
                        textButton="Valider le mot de passe"
                        textColor="black"
                        width="60%"
                        height="50"
                        background="#A3FD01"
                        onPress={handlePassword}
                    />
                </View>
            )}
            {isDoneVisible && (
                <View style={styles.modifyPassword}>

                    <Text style={styles.done}>Le mot de passe a bien été modifié 🎉</Text>
                    <Button
                        textButton="Retourner à la connexion"
                        textColor="black"
                        width="60%"
                        height="50"
                        background="#A3FD01"
                        onPress={() => navigation.navigate("Signin")}
                    />
                </View>
            )}
            {isLoading && <View style={styles.backgroundLoading}>
                <ActivityIndicator size="large" color="#A3FD01" animating={true} />
            </View>}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D36",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 40,
    },
    mainTitle: {
        fontSize: 25,
        textAlign: "center",
        color: "white",
        fontWeight: "600",
        marginTop: 20
    },
    subTitle: {
        fontSize: 35,
        textAlign: "center",
        color: "#3BC95F",
        fontWeight: "800",
    },
    input: {
        width: "60%",
        height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 25,
        paddingLeft: 10,
        fontSize: 18,
    },

    image: {
        height: "40%",
        width: "100%",
    },

    backgroundLoading: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },

    modifyPassword: {
        backgroundColor: "#0D0D36",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 40,
        width: '100%'
    },

    error: {
        color:" #FF4500",
        marginTop: 10,
      },
    
    done : {
        color: "white",
        fontSize: 20
    }  
});
