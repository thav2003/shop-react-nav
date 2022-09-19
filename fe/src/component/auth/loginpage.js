import React,{useState} from "react";
import { StatusBar, View, ImageBackground, KeyboardAvoidingView ,Alert } from "react-native";
import { Button, Input, Text, Icon  } from "@ui-kitten/components";

//import style
import login_styles from "../../styles/login_styles";

import { nameValidator,emailValidator,passwordValidator  } from '../../utils/Validator'
import { loginUser } from '../../api/auth'

import {setUser} from '../../store/actions/index'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const ArrowForwardIcon = (style) => <Icon {...style} name='arrow-forward-outline' />;
const GoogleIcon = (style) => <Icon {...style} name='google' />;
const LoginPage=({navigation})=>{
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const onLoginPressed = async () => {
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
    
        return
      }
      setLoading(true)
      const data={
        Email:email.value,
        Password:password.value
      }
      const res=await loginUser(data)
      
      if(res){
       //console.log(email.value)
        dispatch(setUser(email.value))
        navigation.navigate('Home')
        alert('Welcome');

        setLoading(false) 
      }else{
        alert('Tài khoản không tồn tại');
      }
    }

    return(
        <>
        <StatusBar barStyle={"light-content"}/>
        <KeyboardAvoidingView >
            <ImageBackground style={login_styles.container} 
                              source={require("../../../assets/bg.png")}
                              blurRadius={1}>
                <View style={login_styles.signInContainer}>
                  {/*--------head*------------*/}
                  <Text style={login_styles.signInLabel} status='control' category='h4'>
                  SIGN IN
                  </Text>
                  <Button
                  style={login_styles.signUpButton}
                  appearance='ghost'
                  status='control'
                  size='giant'
                  accessoryLeft={ArrowForwardIcon}
                  onPress={()=> navigation.navigate('Register')}>
                  Sign Up
                  
                  </Button>
                </View>

                {/*--------form------------*/}
                <View style={login_styles.formContainer}>
                  <Input
                    label='EMAIL'
                    placeholder='Email'
                    status='control'
                    returnKeyType="next"
                    style={{borderRadius:50,borderColor:"black"}}
                    value={email.value}
                    onChangeText={(text)=>setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    
                  />
                  <Input
                    label='PASSWORD'
                    style={login_styles.passwordInput}
                    status='control'
                    placeholder='Password'
                    value={password.value}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                  />
                  <View style={login_styles.forgotPasswordContainer}>
                    <Button
                      style={login_styles.forgotPasswordButton}
                      appearance='ghost'
                      status='control'>
                      Forgot your password?
                    </Button>
                  </View>
                </View>


                <Button status='control' size='large' 
                style={{borderRadius:50}}
                onPress={onLoginPressed}>
                  SIGN IN

                </Button>
                 {/*--------foot------------*/}
                <View style={login_styles.socialAuthContainer}>
                  <Text style={login_styles.socialAuthHintText} status='control'>
                    Sign with a social account
                  </Text>
                  <Button
                    style={{borderRadius:50,width:50,borderColor:"black"}}
                    appearance='filled'
                    size='giant'
                    status='basic'
                    accessoryLeft={GoogleIcon}
                  />
                </View>

                

            </ImageBackground>   
        </KeyboardAvoidingView> 
        </>
    )
}

export default LoginPage;