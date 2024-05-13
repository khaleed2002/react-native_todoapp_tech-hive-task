import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { AuthScreenNavigationType } from '@/navigation/types'
import { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }
    return (
        <SafeAreaWrapper>


            <Box>
                <Text>SignUpScreen</Text>
                <Button title="Navigate to sign in" onPress={navigateToSignInScreen} />
            </Box>
        </SafeAreaWrapper>
    )
}
export default SignUpScreen
