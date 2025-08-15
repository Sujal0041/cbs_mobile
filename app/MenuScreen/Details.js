import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Details = () => {
    const route = useRoute();
    const { id, item } = route.params || {};
    const [details, setDetails] = useState(item || null);
    const [loading, setLoading] = useState(!item);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState('');
    const [commentList, setCommentList] = useState([]);

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

    const handleSendComment = () => {
        if (comments.trim()) {
            const timestamp = new Date().toLocaleString();
            setCommentList([
                ...commentList,
                { text: comments, id: Date.now(), timestamp },
            ]);
            setComments('');
        }
    };

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

    const importantFields = [
        { label: 'Branch Name', value: details.branch_name },
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

    const handleApprove = () => {
        console.log('Approve button pressed');
    };

    const handleReject = () => {
        console.log('Reject button pressed');
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>
                        Credit Demand Details of {details.identification}
                    </Text>
                    <View style={styles.divider} />
                    {importantFields.map((field, index) => (
                        <View key={index} style={styles.fieldRow}>
                            <Text style={styles.label}>{field.label}</Text>
                            <Text style={styles.value}>
                                {field.value ?? '—'}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.approveButton]}
                        onPress={handleApprove}
                    >
                        <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={handleReject}
                    >
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textAreaContainer}>
                    <Text style={styles.textAreaLabel}>Comments</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={5}
                            value={comments}
                            onChangeText={setComments}
                            placeholder="Enter your comments here..."
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleSendComment}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.commentList}>
                        {commentList.length > 0 ? (
                            commentList.map((comment) => (
                                <View
                                    key={comment.id}
                                    style={styles.commentItem}
                                >
                                    <Text style={styles.commentText}>
                                        {comment.text}
                                    </Text>
                                    <Text style={styles.commentTimestamp}>
                                        {comment.timestamp}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noCommentsText}>
                                No comments yet.
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
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
        color: '#333',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 8,
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: '#28a745',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textAreaContainer: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    textAreaLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textArea: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'top',
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minHeight: 100,
    },
    commentList: {
        marginTop: 12,
        maxHeight: 200,
    },
    commentItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
    commentTimestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    noCommentsText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        padding: 10,
    },
});

export default Details;
