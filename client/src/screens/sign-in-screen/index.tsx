import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { AuthScreenNavigationType } from '@/navigation/types'
import { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }
    return (
        <SafeAreaWrapper>
            <Box>
                <Text>SignIn</Text>
                <Button title="Navigate to sign up" onPress={navigateToSignUpScreen} />
            </Box>
        </SafeAreaWrapper>
    )
}
export default SignInScreen
