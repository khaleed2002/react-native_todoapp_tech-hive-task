import { View, Text, StyleSheet } from 'react-native';
import { ITask } from '@/types';
interface TaskItemProps {
    task: ITask;
}

const TaskItemCompleted = ({ task }: TaskItemProps) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.taskText]}>
                {task.description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    checkbox: {
        marginRight: 10,
    },
    taskText: {
        flex: 1,
        color: '#50ba1b'
    },
});

export default TaskItemCompleted;
