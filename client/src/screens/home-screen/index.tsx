import { useEffect, useState } from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import { Box } from '@/utils/theme';
import { getAllTasks, editSingleTask, deleteSingleTask, createTask } from '@/services/api'; // Import API service functions for tasks
import { ITask } from '@/types';
import TaskItem from '@/components/tasks/task';
import Input from '@/components/shared/input';
import Button from '@/components/shared/Button';
import { Controller, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid'
import useUserGlobalStore from '@/store/useUserGlobalStore';

const HomeScreen = () => {
    // const [tasks, setTasks]: [ITask[], React.Dispatch<React.SetStateAction<ITask[]>>] = useState<ITask[]>([]);
    const { tasks, setTasks } = useUserGlobalStore()
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getAllTasks();
                setTasks(tasks)
                return tasks
            } catch (error) {
            }
        }
        fetchTasks()
    }, [])

    const handleDeleteTask = async (id: string) => {
        try {
            const newTasks = tasks.filter(task => task.id !== id)
            setTasks(newTasks)
            await deleteSingleTask({ id })
        } catch (error) {
        }
    }
    const handleToggleComplete = async ({ id, description, completed }: ITask) => {
        try {
            const newTasks = tasks.map((task) => {
                if (task.id === id) {
                    task.completed = !task.completed
                }
                return task
            })
            setTasks(newTasks)
            await editSingleTask({ id, description, completed: !completed } as ITask)
        } catch (error) {

        }
    }
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<Omit<ITask, "name">>({
        defaultValues: {
            description: "",
            completed: false,
        },
    })
    const onSubmit = async (data: Omit<ITask, "name">) => {

        try {
            const { description, completed } = data
            const tempTask = { description, completed, id: uuid.v4() }
            let newTasks = [...tasks, tempTask as ITask]
            setTasks(newTasks)
            reset();
            const newTask = await createTask({ description, completed } as ITask)
            newTasks = [...tasks.slice(0, tasks.length), newTask]
            setTasks(newTasks)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaWrapper>
            <Box marginTop='10'>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="description"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Enter task description"
                        />
                    )}
                    name="description"
                />
                <Button label='Add Task' onPress={handleSubmit(onSubmit)}></Button>
            </Box>
            {(tasks as ITask[])?.map((task) => {
                return <TaskItem task={task} key={task.id} onDelete={() => handleDeleteTask(task.id)} onToggleComplete={() => handleToggleComplete({ ...task })} />
            })}
        </SafeAreaWrapper>
    )
};

export default HomeScreen;
