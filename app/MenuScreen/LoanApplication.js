import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

export default function CreditDemandCardView() {
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [routes] = useState([
        { key: 'all', title: 'All' },
        { key: 'pending', title: 'Pending' },
        { key: 'approved', title: 'Approved' },
        { key: 'rejected', title: 'Rejected' },
    ]);

    const AllRoute = () => <StatusList status="All" searchQuery={search} />;
    const PendingRoute = () => (
        <StatusList status="Pending" searchQuery={search} />
    );
    const ApprovedRoute = () => (
        <StatusList status="Approved" searchQuery={search} />
    );
    const RejectedRoute = () => (
        <StatusList status="Rejected" searchQuery={search} />
    );

    const renderScene = SceneMap({
        all: AllRoute,
        pending: PendingRoute,
        approved: ApprovedRoute,
        rejected: RejectedRoute,
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor="#007AFF"
            inactiveColor="#888"
        />
    );

    const handleSearch = (text) => {
        setSearch(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Credit Demand Data</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={search}
                onChangeText={handleSearch}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                lazy={true}
                renderTabBar={renderTabBar}
                style={styles.tabView}
            />
        </View>
    );
}

function StatusList({ status, searchQuery }) {
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const recordsPerPage = 5;

    const getColumnIndex = (column) => {
        const columns = [
            'function',
            'row_no',
            'effective_date',
            'branch_name',
            'introducer',
            'id_no',
            'identification',
            'ac_no',
            'field_officer',
            'purpose',
            'account_type',
            'is_fd_loan',
            'fd_cr_percent',
            'fd_add_percent',
            'demand_amt',
            'request_days',
            'request_date',
        ];
        return columns.indexOf(column);
    };

    const fetchData = () => {
        setLoading(true);
        setRefreshing(true);
        const payload = {
            sEcho: 1,
            iColumns: 17,
            sColumns:
                ',row_no,effective_date,branch_name,introducer,id_no,identification,ac_no,field_officer,purpose,account_type,is_fd_loan,fd_cr_percent,fd_add_percent,demand_amt,request_days,request_date',
            iDisplayStart: 0,
            iDisplayLength: 1000,
            mDataProp_0: 'function',
            sSearch_0: '',
            bRegex_0: false,
            bSearchable_0: true,
            bSortable_0: false,
            mDataProp_1: 'row_no',
            sSearch_1: '',
            bRegex_1: false,
            bSearchable_1: true,
            bSortable_1: true,
            mDataProp_2: 'effective_date',
            sSearch_2: '',
            bRegex_2: false,
            bSearchable_2: true,
            bSortable_2: true,
            mDataProp_3: 'branch_name',
            sSearch_3: '',
            bRegex_3: false,
            bSearchable_3: true,
            bSortable_3: true,
            mDataProp_4: 'introducer',
            sSearch_4: '',
            bRegex_4: false,
            bSearchable_4: true,
            bSortable_4: true,
            mDataProp_5: 'id_no',
            sSearch_5: '',
            bRegex_5: false,
            bSearchable_5: true,
            bSortable_5: true,
            mDataProp_6: 'identification',
            sSearch_6: '',
            bRegex_6: false,
            bSearchable_6: true,
            bSortable_6: true,
            mDataProp_7: 'ac_no',
            sSearch_7: '',
            bRegex_7: false,
            bSearchable_7: true,
            bSortable_7: true,
            mDataProp_8: 'field_officer',
            sSearch_8: '',
            bRegex_8: false,
            bSearchable_8: true,
            bSortable_8: true,
            mDataProp_9: 'purpose',
            sSearch_9: '',
            bRegex_9: false,
            bSearchable_9: true,
            bSortable_9: true,
            mDataProp_10: 'account_type',
            sSearch_10: '',
            bRegex_10: false,
            bSearchable_10: true,
            bSortable_10: true,
            mDataProp_11: 'is_fd_loan',
            sSearch_11: '',
            bRegex_11: false,
            bSearchable_11: true,
            bSortable_11: true,
            mDataProp_12: 'fd_cr_percent',
            sSearch_12: '',
            bRegex_12: false,
            bSearchable_12: true,
            bSortable_12: true,
            mDataProp_13: 'fd_add_percent',
            sSearch_13: '',
            bRegex_13: false,
            bSearchable_13: true,
            bSortable_13: true,
            mDataProp_14: 'demand_amt',
            sSearch_14: '',
            bRegex_14: false,
            bSearchable_14: true,
            bSortable_14: true,
            mDataProp_15: 'request_days',
            sSearch_15: '',
            bRegex_15: false,
            bSearchable_15: true,
            bSortable_15: true,
            mDataProp_16: 'request_date',
            sSearch_16: '',
            bRegex_16: false,
            bSearchable_16: true,
            bSortable_16: true,
            sSearch: searchQuery,
            bRegex: false,
            iSortCol_0: getColumnIndex('row_no'),
            sSortDir_0: 'asc',
            iSortingCols: 1,
        };

        axios
            .post(
                'http://192.168.18.222:5154/Api/MobileAppApi/GetAllCreditDemandDataPaginated',
                payload
            )
            .then((res) => {
                let filteredData = res.data.aaData || [];
                if (status !== 'All') {
                    filteredData = filteredData.filter((item) => {
                        if (status === 'Rejected')
                            return item.auth_value === -1;
                        if (status === 'Approved') return item.auth_value === 1;
                        if (status === 'Pending')
                            return (
                                item.auth_value === 0 || item.auth_value == null
                            );
                        return true;
                    });
                }
                setFullData(filteredData);
                setTotalRecords(filteredData.length);
                setData(filteredData.slice(0, recordsPerPage));
            })
            .catch((err) => {
                console.error('Axios fetch error:', err.message);
                setError(err.message || 'Unknown error');
            })
            .finally(() => {
                setLoading(false);
                setRefreshing(false);
            });
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchData();
    }, [searchQuery, status]);

    const handlePageChange = (newPage) => {
        if (
            newPage > 0 &&
            newPage <= Math.ceil(totalRecords / recordsPerPage)
        ) {
            setCurrentPage(newPage);
            const startIndex = (newPage - 1) * recordsPerPage;
            const endIndex = startIndex + recordsPerPage;
            setData(fullData.slice(startIndex, endIndex));
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentPage(1);
        fetchData();
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
                navigation.navigate('Details', { id: item.id, item })
            }
        >
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Id Number: </Text>
                    {item.id_no}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Effective Date: </Text>
                    {item.effective_date}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Name: </Text>
                    {item.identification}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Branch: </Text>
                    {item.branch_name}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Purpose: </Text>
                    {item.purpose}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Demand Amount: </Text>
                    {item.demand_amt}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Request Date: </Text>
                    {item.request_date}
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.label}>Status: </Text>
                    {item.auth_value === -1
                        ? 'Rejected'
                        : item.auth_value === 1
                        ? 'Approved'
                        : 'Pending'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.listContainer, styles.center]}>
                <ActivityIndicator
                    size="large"
                    color="#007AFF"
                    style={{ marginBottom: 10 }}
                />
                <Text style={styles.loadingText}>Loading Credit Data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.listContainer, styles.center]}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) =>
                    item.row_no?.toString() || Math.random().toString()
                }
                renderItem={renderCard}
                contentContainerStyle={styles.flatListContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#007AFF']}
                        tintColor="#007AFF"
                    />
                }
            />
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={
                        currentPage === 1
                            ? [styles.pageButton, styles.disabledButton]
                            : styles.pageButton
                    }
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.pageButtonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageInfo}>
                    Page {currentPage} of{' '}
                    {Math.ceil(totalRecords / recordsPerPage)}
                </Text>
                <TouchableOpacity
                    style={
                        currentPage === Math.ceil(totalRecords / recordsPerPage)
                            ? [styles.pageButton, styles.disabledButton]
                            : styles.pageButton
                    }
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={
                        currentPage === Math.ceil(totalRecords / recordsPerPage)
                    }
                >
                    <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 0,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 14,
    },
    tabView: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 8,
    },
    tabIndicator: {
        backgroundColor: '#007AFF',
        height: 3,
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    listContainer: {
        flex: 1,
    },
    flatListContent: {
        paddingBottom: 16,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'column',
    },
    cardText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    label: {
        fontWeight: '600',
        color: '#333',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 1,
    },
    pageButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    pageButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    pageInfo: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    loadingText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: '500',
    },
});
