import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { AuthScreenNavigationType } from '@/navigation/types'
import { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }
    return (
        <SafeAreaWrapper>
            <Box>
                <Text>Welcome Screen</Text>
                <Button title="Navigate to sign up" onPress={navigateToSignUpScreen} />
                <Button title="Navigate to sign in" onPress={navigateToSignInScreen} />

            </Box>
        </SafeAreaWrapper>
    )
}
export default WelcomeScreen
