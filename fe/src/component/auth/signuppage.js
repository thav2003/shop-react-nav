import React,{useState} from "react";
import { StatusBar, View, ImageBackground,Alert } from "react-native";
import {
    Button,
    CheckBox,
    Datepicker,
    Divider,
    Input,
    StyleService,
    Text,Icon
  } from "@ui-kitten/components";
import signpage_styles from "../../styles/signpage_styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { nameValidator,emailValidator,passwordValidator  } from '../../utils/Validator'
import { signUpUser } from '../../api/auth'



const shoppingicon = (style) => <Icon {...style} name='shopping-cart-outline' />;
const ArrowForwardIcon = (style) => <Icon {...style} name='arrow-forward-outline' />;
const GoogleIcon = (style) => <Icon {...style} name='google' />;




const SignupPage=({navigation})=>{
    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [lastName, setLastName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const [date, setDate] = React.useState(new Date());
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const min=new Date(1900, 0, 0);
    const max=new Date(2050, 0, 0)
    const currentYear=new Date().getFullYear()


    const onSignUpPressed = async () => {
        if(termsAccepted && currentYear-date.getFullYear()>=18){
            const emailError = emailValidator(email.value)
            const passwordError = passwordValidator(password.value)
            if (emailError || passwordError ) {
                setEmail({ ...email, error: emailError })
                setPassword({ ...password, error: passwordError })
                console.log(error)
                return
            }
            setLoading(true)
            const data={
                Email:email.value,
                Password:password.value
            }
            const res=await signUpUser(data)
            //console.log(res.status)
            if(res.status){
                //navigation.navigate('Login')
                alert('Đăng kí thành công');
                setLoading(false) 
            }else{
                alert(res.message)
            }
        }else{
            alert('Bạn chưa đủ 18 tuổi !!!!')
        }
     
          
    }

    return(
        <>
        <StatusBar barStyle={"light-content"} />
        <KeyboardAwareScrollView style={signpage_styles.container}>
            <ImageBackground  style={signpage_styles.headerContainer}
                              source={require("../../../assets/logo.jpg")}
                              blurRadius={0}>

                

                <View style={signpage_styles.signUpContainer}>
                    <Text style={signpage_styles.signInLabel} category='h4' status='control'
                    >
                        SIGN UP
                    </Text>
                    <Button
                        style={signpage_styles.signInButton}
                        appearance='ghost'
                        status='basic'
                        size='giant'
                        accessoryLeft={ArrowForwardIcon}
                        onPress={()=> navigation.navigate('Login')}>
                        Sign In
                    </Button>
                </View>
            </ImageBackground>
        <View style={signpage_styles.socialAuthContainer}>
            <Text style={signpage_styles.socialAuthHintText}>
                Sign with a social account
            </Text>
            <View style={signpage_styles.socialAuthButtonsContainer}>
                <Button
                    appearance='ghost'
                    size='giant'
                    status='primary'
                    accessoryLeft={GoogleIcon}
                />
            </View>
        </View>
        <View style={signpage_styles.orContainer}>
            <Divider style={signpage_styles.divider} />
                <Text style={signpage_styles.orLabel} category='h5'>
                    OR
                </Text>
            <Divider style={signpage_styles.divider} />
        </View>
        <Text style={signpage_styles.emailSignLabel}>Sign up with Email</Text>
        <View style={[signpage_styles.container, signpage_styles.formContainer]}>
            <Input
                placeholder='A'
                label='TÊN'
                autoCapitalize='words'
                value={firstName.value}
                onChangeText={(text)=>setFirstName({ value: text, error: '' })}
                error={!!lastName.error}
                errorText={lastName.error}
            />
            <Input
                style={signpage_styles.formInput}
                placeholder='Nguyễn'
                label='HỌ'
                autoCapitalize='words'
                value={lastName.value}
                returnKeyType="next"
                onChangeText={(text)=>setLastName({ value: text, error: '' })}
                error={!!lastName.error}
                errorText={lastName.error}
            />
            <Datepicker
                style={signpage_styles.formInput}
                date={date}        
                min={min}
                max={max}
               
                label='Date of Birth'
                onSelect={nextDate => setDate(nextDate)}
            />
            <Input
                style={signpage_styles.formInput}
                placeholder='xyz@gmail.com'
                label='EMAIL'
                value={email.value}
                returnKeyType="next"
                onChangeText={(text)=>setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <Input
                style={signpage_styles.formInput}
                label='PASSWORD'
                placeholder='Password'
                secureTextEntry={true}
                value={password.value}
                returnKeyType="done"
                onChangeText={(text)=>setPassword({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
            />
            <CheckBox
                style={signpage_styles.termsCheckBox}
                // textStyle={}
                checked={termsAccepted}
                onChange={(checked) => setTermsAccepted(checked)}>
                    <Text style={signpage_styles.termsCheckBoxText}>
                        {
                        "I'm 18 years old to creating an account"
                        }
                    </Text>
            </CheckBox>
        </View>
        <Button
            loading={loading}
            style={signpage_styles.signUpButton}
            size='large'
            onPress={onSignUpPressed}
            >
            SIGN UP
        </Button>
           
        </KeyboardAwareScrollView>
        </>
    )
}
export default SignupPage;