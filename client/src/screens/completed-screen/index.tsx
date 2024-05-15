import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import TaskItemCompleted from '@/components/tasks/taskItemCompleted';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { ITask } from '@/types';
import { Box, Text } from '@/utils/theme'
const CompletedScreen = () => {
    // const [tasks, setTasks]: [ITask[], React.Dispatch<React.SetStateAction<ITask[]>>] = useState<ITask[]>([]);
    const { tasks, setTasks } = useUserGlobalStore()
    return (
        <SafeAreaWrapper>
            <Text style={{ textAlign: "center", fontSize: 30, marginTop: 10 }}>Completed Tasks</Text>
            <Box margin='10'>

                {
                    (tasks as ITask[])?.filter(task => task.completed)?.map((task) => {
                        return <TaskItemCompleted task={task} key={task.id} />
                    })
                }
            </Box>

        </SafeAreaWrapper>
    )
}
export default CompletedScreen
