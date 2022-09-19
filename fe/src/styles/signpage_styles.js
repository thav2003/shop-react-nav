import { StyleSheet } from 'react-native';


const signpage_styles= StyleSheet.create({
    container: {
        backgroundColor:"#C0C0C0",
        flex:1
      },
      headerContainer: {
        minHeight: 216,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 44,
        
       

      },
      signUpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 32,
        top:60
       
    
        
      },
      socialAuthContainer: {
        marginTop: 24,
      },
      socialAuthButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
      socialAuthHintText: {
        alignSelf: "center",
        marginBottom: 16,
      },
      formContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
      },
      evaButton: {
        
        maxWidth: 150,
        marginTop: 10,
        paddingHorizontal: 10,
      },
      signInLabel: {
        flex: 1,
        color: "black",
      },
      signInButton: {
        flexDirection: "row-reverse",
        paddingHorizontal: 0,
        left:25,
       
      },
      signUpButton: {
        marginVertical: 24,
        marginHorizontal: 16,
      },
      socialAuthIcon: {
        tintColor: "text-basic-color",
      },
      orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 24,
      },
      divider: {
        flex: 1,
      },
      orLabel: {
        marginHorizontal: 8,
      },
      emailSignLabel: {
        alignSelf: "center",
        marginTop: 8,
      },
      formInput: {
        marginTop: 16,
      },
      termsCheckBox: {
        marginTop: 20,
      },
      termsCheckBoxText: {
        fontSize: 12,
        lineHeight: 14,
        color: "text-hint-color",
      },
    });


export default  signpage_styles;