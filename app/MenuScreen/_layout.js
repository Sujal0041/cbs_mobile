import { MaterialIcons } from '@expo/vector-icons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import DailyReport from './DailyReport';
import Dashboard from './Dashboard';
import FinancialReport from './FinancialReport';
import LoanApplication from './LoanApplication';
import Support from './Support';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                paddingVertical: 10,
            }}
        >
            <View>
                {/* Normal drawer items with borders */}
                <DrawerItemList {...props} />
            </View>

            {/* Sign Out Button Section */}
            <View style={styles.signOutContainer}>
                <View style={styles.separator} />
                <DrawerItem
                    label="Sign Out"
                    labelStyle={{ fontWeight: 'bold', color: '#d32f2f' }}
                    icon={({ color, size }) => (
                        <MaterialIcons
                            name="logout"
                            color="#d32f2f"
                            size={size}
                        />
                    )}
                    onPress={() => navigation.replace('index')}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default function MenuScreenLayout() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: '#6200ee',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
                drawerStyle: {
                    width: 280,
                    backgroundColor: '#fff',
                    borderRightWidth: 1,
                    borderRightColor: '#ddd', // subtle border
                },
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="dashboard"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Loan Application"
                component={LoanApplication}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="description"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Daily Report"
                component={DailyReport}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="today" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Financial Report"
                component={FinancialReport}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="attach-money"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Support"
                component={Support}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="support-agent"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    signOutContainer: {
        paddingBottom: 0,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
});
