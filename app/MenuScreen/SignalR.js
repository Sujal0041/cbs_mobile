import * as SignalR from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function DemandChat({ demandId }) {
    const [connection, setConnection] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Create SignalR connection
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl('http://192.168.18.222:5154/demandhub') // e.g., "http://192.168.1.100:5000/demandhub"
            .withAutomaticReconnect()
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        setConnection(hubConnection);

        // Start connection and join group
        hubConnection
            .start()
            .then(async () => {
                console.log('✅ Connected to DemandHub');

                // Join group
                await hubConnection.invoke('JoinDemandGroup', demandId);
                console.log(`📌 Joined demand group: ${demandId}`);

                // Fetch chat history
                await hubConnection.invoke('FetchChatHistory', demandId);

                // Listen for incoming chat history
                hubConnection.on('ReceiveChatHistory', (history) => {
                    console.log('📜 Chat history received:', history);
                    setChatHistory(history || []);
                    setLoading(false);
                });

                // Listen for new messages
                hubConnection.on(
                    'ReceiveMessage',
                    (demand_id, user_id, userName, message, edate, ndate) => {
                        console.log(
                            `💬 New message from ${userName}: ${message}`
                        );
                        setChatHistory((prev) => [
                            ...prev,
                            {
                                demand_id,
                                user_id,
                                userName,
                                message,
                                edate,
                                ndate,
                            },
                        ]);
                    }
                );
            })
            .catch((err) => console.error('❌ Connection error:', err));

        return () => {
            if (hubConnection) {
                hubConnection.stop();
                console.log('🔌 Disconnected from DemandHub');
            }
        };
    }, [demandId]);

    if (loading) return <ActivityIndicator size="large" color="blue" />;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={chatHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text>
                        {item.userName || item.user_id}: {item.message}
                    </Text>
                )}
            />
        </View>
    );
}
