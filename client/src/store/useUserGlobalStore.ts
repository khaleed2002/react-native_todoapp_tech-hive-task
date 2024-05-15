import { IAuthenticatedUser, ITask } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IUserGlobalStore {
    user: IAuthenticatedUser | null
    updateUser: (user: IAuthenticatedUser | null) => void
    tasks: ITask[]
    setTasks: (tasks: ITask[]) => void
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set, _get) => ({
            user: null,
            updateUser: (user) => {
                set({
                    user,
                })
            },
            tasks: [],
            setTasks: (tasks) => {
                set({
                    tasks,
                })
            }
        }),
        {
            name: "todoapp-user-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)

export default useUserGlobalStore