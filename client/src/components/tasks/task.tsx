import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ITask } from '@/types';
interface TaskItemProps {
    task: ITask;
    onDelete: () => void;
    onToggleComplete: () => void;
}

const TaskItem = ({ task, onDelete, onToggleComplete }: TaskItemProps) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onToggleComplete} style={styles.checkbox}>
                {task.completed ? (
                    <Ionicons name="checkbox" size={24} color="green" />
                ) : (
                    <Ionicons name="checkbox-outline" size={24} color="black" />
                )}
            </TouchableOpacity>
            <Text style={[styles.taskText, task.completed && styles.completedText]}>
                {task.description}
            </Text>
            <TouchableOpacity onPress={onDelete}>
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
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
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
});

export default TaskItem;
