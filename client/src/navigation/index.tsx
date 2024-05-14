import { NavigationContainer } from "@react-navigation/native"
import AuthStackNavigator from "./auth-stack-navigator";
import AppStackNavigator from "./app-stack-navigator";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { useEffect } from "react";

const Navigation = () => {
    const { user, updateUser } = useUserGlobalStore()
    useEffect(() => {
        updateUser(null)
        return () => { }
    }, [])

    return <NavigationContainer>
        {user ?
            <AppStackNavigator /> :
            <AuthStackNavigator />
        }

    </NavigationContainer>
}

export default Navigation   