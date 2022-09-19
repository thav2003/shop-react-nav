import { StyleSheet } from 'react-native';


const login_styles= StyleSheet.create({
    container: {
        height:"105%",
        opacity:1.2,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    signInContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 100,
        
    },
    socialAuthContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 48,
    },
    evaButton: {
        maxWidth: 72,
        paddingHorizontal: 0,
    },
    formContainer: {
        
        marginTop: 50,
        paddingHorizontal: 16,
    },
    passwordInput: {
        marginTop: 16,
        borderRadius:50,
        
    },
    signInLabel: {
        flex: 1,
    },
    signUpButton: {
        
        flexDirection: "row-reverse",
        paddingHorizontal: 0,
    },
    socialAuthButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    socialAuthHintText: {
        alignSelf: "center",
        marginBottom: 16,
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
        },
    });

export default  login_styles;