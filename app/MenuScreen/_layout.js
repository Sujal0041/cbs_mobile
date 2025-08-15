import { MaterialIcons } from '@expo/vector-icons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import DailyReport from './DailyReport';
import Dashboard from './Dashboard';
import Details from './Details'; // your details screen
import FinancialReport from './FinancialReport';
import LoanApplication from './LoanApplication';
import Support from './Support';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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
                <DrawerItemList {...props} />
            </View>

            <View style={styles.signOutContainer}>
                <View style={styles.separator} />
                <DrawerItem
                    label="Sign Out"
                    labelStyle={{ fontWeight: 'bold', color: '#d32f2f' }}
                    icon={({ size }) => (
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

// Drawer with only main menu items
function DrawerScreens() {
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
                    borderRightColor: '#ddd',
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
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="description"
                            color={color}
                            size={size}
                        />
                    ),
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.canGoBack() &&
                                    navigation.goBack()
                                }
                                style={{ marginRight: 15 }}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                            {/* Drawer Button */}
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                            >
                                <MaterialIcons
                                    name="menu"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Drawer.Screen
                name="Daily Report"
                component={DailyReport}
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="today" color={color} size={size} />
                    ),
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.canGoBack() &&
                                    navigation.goBack()
                                }
                                style={{ marginRight: 15 }}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                            {/* Drawer Button */}
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                            >
                                <MaterialIcons
                                    name="menu"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Drawer.Screen
                name="Financial Report"
                component={FinancialReport}
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="attach-money"
                            color={color}
                            size={size}
                        />
                    ),
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.canGoBack() &&
                                    navigation.goBack()
                                }
                                style={{ marginRight: 15 }}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                            {/* Drawer Button */}
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                            >
                                <MaterialIcons
                                    name="menu"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Drawer.Screen
                name="Support"
                component={Support}
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="support-agent"
                            color={color}
                            size={size}
                        />
                    ),
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.canGoBack() &&
                                    navigation.goBack()
                                }
                                style={{ marginRight: 15 }}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                            {/* Drawer Button */}
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                            >
                                <MaterialIcons
                                    name="menu"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
        </Drawer.Navigator>
    );
}

// Stack wraps drawer + details
export default function MenuScreenLayout() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainDrawer" component={DrawerScreens} />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{ headerShown: true, title: 'Details' }}
            />
        </Stack.Navigator>
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
