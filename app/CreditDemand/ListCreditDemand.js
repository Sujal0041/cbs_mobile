import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const HelloScreen = () => {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineMedium" style={styles.text}>
                        Hello 👋
                    </Text>

                    <Button
                        mode="contained"
                        onPress={() => console.log('You pressed the button')}
                        style={styles.button}
                    >
                        Press Me
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: 300,
        padding: 16,
    },
    text: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});

export default HelloScreen;
