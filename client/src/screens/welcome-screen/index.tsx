import Button from '@/components/shared/Button'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { AuthScreenNavigationType } from '@/navigation/types'
import { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image } from 'react-native'

const WelcomeImageSrc =
    'https://res.cloudinary.com/dooxt2sgsdooxt2sgs23233/image/upload/v1676809769/youtube/2023/february/blossom/icon_fb36u3.png'

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>()
    const navigateToSignInScreen = () => {
        navigation.navigate('SignIn')
    }
    const navigateToSignUpScreen = () => {
        navigation.navigate('SignUp')
    }
    return (
        <SafeAreaWrapper>
            <LinearGradient
                style={{ flex: 1 }}
                colors={[
                    '#ffffff',
                    '#fcecff',
                    '#f8daff',
                    '#fae2ff',
                    '#fae2ff',
                    '#ffffff',
                ]}
            >
                <Box flex={1} justifyContent="center">
                    <Box alignItems="center" mb="3.5">
                        <Image
                            source={{
                                uri: WelcomeImageSrc,
                                width: 120,
                                height: 120,
                            }}
                        />
                    </Box>
                    <Text textAlign="center" variant="textXl" fontWeight="700">
                        Do you want to be more productive?
                    </Text>
                    <Box my="3.5" mx="10">
                        <Button
                            label="Start your journey"
                            onPress={navigateToSignUpScreen}
                        ></Button>
                    </Box>
                </Box>

            </LinearGradient>
        </SafeAreaWrapper>
    )
}
export default WelcomeScreen
