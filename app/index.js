import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function IndexScreen() {
    const router = useRouter();
    const [branchCode, setBranchCode] = useState('');

    const handleProceed = () => {
        router.push('/Login/login');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.wrapper}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.columnContainer}>
                        <ImageBackground
                            source={require('../assets/images/login-inner-bg.jpg')}
                            style={styles.topBox}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay} />
                            <View style={styles.topContent}>
                                <Image
                                    source={require('../assets/images/logo.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.descriptionText}>
                                    Digital Core Banking System requirements for
                                    banking/financial institutions. Built on the latest
                                    technology platform, offering secured and scalable
                                    solutions including smart mobile banking facility.
                                </Text>
                            </View>
                        </ImageBackground>

                        <View style={styles.bottomBox}>
                            <Text style={styles.text}>Sign In</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Branch Code</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        placeholder="Enter branch code"
                                        keyboardType="numeric"
                                        style={styles.textInput}
                                        placeholderTextColor="black"
                                        maxLength={12}
                                        value={branchCode}
                                        onChangeText={setBranchCode}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.processButton}
                                    onPress={handleProceed}
                                >
                                    <Text style={styles.processButtonText}>PROCEED</Text>
                                </TouchableOpacity>

                                <Text style={styles.label}>
                                    © 2025 Info Brain Technologies Pvt. Ltd.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    columnContainer: {
        width: '90%',
        minHeight: height * 0.8,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        backgroundColor: '#fff',
    },
    topBox: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    topContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        zIndex: 2,
    },
    logo: {
        width: 250,
        height: 80,
        marginBottom: 12,
        resizeMode: 'contain',
    },
    descriptionText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 20,
    },
    bottomBox: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    text: {
        color: 'black',
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'left',
    },
    inputContainer: {
        width: '100%',
        marginTop: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    textInputWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fafafa',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textInput: {
        fontSize: 16,
        color: '#222',
        width: '100%',
        letterSpacing: 1,
    },
    processButton: {
        backgroundColor: '#84ba3f',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 15,
    },
    processButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
