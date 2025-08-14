import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" /> {/* Login */}
                <Stack.Screen
                    name="MenuScreen" /* Folder with Drawer */
                    options={{
                        gestureEnabled: false, // 🚫 disables swipe-back
                    }}
                />
            </Stack>
        </PaperProvider>
    );
}

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import * as React from 'react';
// import { PaperProvider } from 'react-native-paper';
// import DailyReport from './MenuScreen/DailyReport';
// import Dashboard from './MenuScreen/Dashboard';
// import FinancialReport from './MenuScreen/FinancialReport';
// import LoanApplication from './MenuScreen/LoanApplication';

// const Drawer = createDrawerNavigator();

// export default function RootLayout() {
//     return (
//         <PaperProvider>
//             <Drawer.Navigator>
//                 <Drawer.Screen name="Dashboard" component={Dashboard} />
//                 <Drawer.Screen name="Daily Report" component={DailyReport} />
//                 <Drawer.Screen
//                     name="Financial Report"
//                     component={FinancialReport}
//                 />
//                 <Drawer.Screen
//                     name="Loan Application"
//                     component={LoanApplication}
//                 />
//             </Drawer.Navigator>
//         </PaperProvider>
//     );
// }

//my OG
// import { Stack } from 'expo-router';
// import * as React from 'react';
// import { PaperProvider } from 'react-native-paper';

// export default function RootLayout() {
//     return (
//         <PaperProvider>
//             <Stack
//                 screenOptions={{
//                     headerShown: false,
//                     // gestureEnabled: false, // 🚫 disables swipe back globally
//                 }}
//             >
//                 <Stack.Screen name="index" />
//             </Stack>
//         </PaperProvider>
//     );
// }
