import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeStackParamList } from "./types"
import HomeScreen from "@/screens/home-screen"


const Stack = createNativeStackNavigator<HomeStackParamList>()
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}
export default HomeStackNavigator