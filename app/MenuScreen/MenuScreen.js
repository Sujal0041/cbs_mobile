import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const MenuComponent = () => {
    const menuItems = [
        { id: 1, title: 'DASHBOARD', icon: 'speedometer-outline' },
        { id: 2, title: 'LOAN APPLICATIONS', icon: 'document-text-outline' },
        { id: 3, title: 'DAILY REPORTS', icon: 'calendar-outline' },
        { id: 4, title: 'FINANCIAL REPORTS', icon: 'bar-chart-outline' },
    ];

    const router = useRouter();

    const handleMenuPress = (title) => {
        let path;
        switch (title) {
            case 'DASHBOARD':
                path = '/MenuScreen/Dashboard';
                break;
            case 'LOAN APPLICATIONS':
                path = '/MenuScreen/LoanApplication';
                break;
            case 'DAILY REPORTS':
                path = '/MenuScreen/DailyReport';
                break;
            case 'FINANCIAL REPORTS':
                path = '/MenuScreen/FinancialReport';
                break;
            default:
                return;
        }
        router.push(path);
    };

    return (
        <View style={styles.container}>
            {menuItems.map((item) => (
                <Pressable
                    key={item.id}
                    style={({ pressed }) => [
                        styles.menuItem,
                        pressed && {
                            transform: [{ scale: 0.96 }, { translateY: 2 }],
                            backgroundColor: '#dbeafe',
                            borderColor: '#2563eb',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.12,
                            opacity: 0.9,
                        },
                    ]}
                    onPress={() => handleMenuPress(item.title)}
                >
                    <Ionicons
                        name={item.icon}
                        size={32}
                        color="#2d3748"
                        style={styles.icon}
                    />
                    <Text style={styles.menuText}>{item.title}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf2f7',
        paddingVertical: 50,
    },
    menuItem: {
        height: '24%',
        marginVertical: 6,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#cbd5e0', // subtle gray border
        backgroundColor: '#ffffff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',

        // shadow for elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginBottom: 6,
    },
    menuText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        textAlign: 'center',
    },
});

export default MenuComponent;
