import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const Details = () => {
    const route = useRoute();
    const { id, item } = route.params || {};
    const [details, setDetails] = useState(item || null);
    const [loading, setLoading] = useState(!item);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!item && id) {
            setLoading(true);
            axios
                .get(
                    `http://192.168.18.222:5154/Api/MobileAppApi/GetCreditDemandDetails?id=${id}`
                )
                .then((res) => {
                    setDetails(res.data);
                })
                .catch((err) => {
                    setError(err.message || 'Error fetching details');
                })
                .finally(() => setLoading(false));
        }
    }, [id, item]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading Details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!details) {
        return (
            <View style={styles.center}>
                <Text>No details found.</Text>
            </View>
        );
    }

    // Pick only important fields
    const importantFields = [
        { label: 'Branch Name', value: details.branch_name },
        // { label: 'Introducer', value: details.introducer },
        { label: 'Identification', value: details.identification },
        { label: 'Effective Date', value: details.effective_date },
        { label: 'Purpose', value: details.purpose },
        { label: 'Demand Amount', value: details.demand_amt },
        {
            label: 'Status',
            value:
                details.auth_value === -1
                    ? 'Rejected'
                    : details.auth_value === 1
                    ? 'Approved'
                    : 'Pending',
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Credit Demand Details of {details.identification}
                </Text>
                <View style={styles.divider} />
                {importantFields.map((field, index) => (
                    <View key={index} style={styles.fieldRow}>
                        <Text style={styles.label}>{field.label}</Text>
                        <Text style={styles.value}>{field.value ?? '—'}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontWeight: '600',
        color: '#555',
        flex: 1,
    },
    value: {
        flex: 1,
        textAlign: 'right',
        color: '#333',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default Details;
