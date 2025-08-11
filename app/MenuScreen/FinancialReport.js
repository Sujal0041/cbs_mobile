import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CreditDemandTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [sortColumn, setSortColumn] = useState('row_no');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const recordsPerPage = 10;

    const fetchData = (
        page = 1,
        searchQuery = '',
        sortCol = sortColumn,
        sortDir = sortDirection
    ) => {
        setLoading(true);
        const payload = {
            sEcho: 1,
            iColumns: 17,
            sColumns:
                ',row_no,effective_date,branch_name,introducer,id_no,identification,ac_no,field_officer,purpose,account_type,is_fd_loan,fd_cr_percent,fd_add_percent,demand_amt,request_days,request_date',
            iDisplayStart: (page - 1) * recordsPerPage,
            iDisplayLength: recordsPerPage,
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
            iSortCol_0: getColumnIndex(sortCol),
            sSortDir_0: sortDir,
            iSortingCols: 1,
        };

        axios
            .post(
                'http://192.168.18.222:5154/Api/MobileAppApi/GetAllCreditDemandDataPaginated',
                payload
            )
            .then((res) => {
                setData(res.data.aaData || []);
                setTotalRecords(res.data.iTotalRecords || 0);
            })
            .catch((err) => {
                console.error('Axios fetch error:', err.message);
                setError(err.message || 'Unknown error');
            })
            .finally(() => setLoading(false));
    };

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

    useEffect(() => {
        fetchData(currentPage, search, sortColumn, sortDirection);
    }, [currentPage, search, sortColumn, sortDirection]);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const handleSearch = (text) => {
        setSearch(text);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (
            newPage > 0 &&
            newPage <= Math.ceil(totalRecords / recordsPerPage)
        ) {
            setCurrentPage(newPage);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text
                style={[styles.cell, styles.id]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.row_no}
            </Text>
            <Text
                style={[styles.cell, styles.effectiveDate]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.effective_date}
            </Text>
            <Text
                style={[styles.cell, styles.identification]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.identification}
            </Text>
            <Text
                style={[styles.cell, styles.branchName]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.branch_name}
            </Text>
            <Text
                style={[styles.cell, styles.purpose]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.purpose}
            </Text>
            <Text
                style={[styles.cell, styles.demandAmt]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.demand_amt}
            </Text>
            <Text
                style={[styles.cell, styles.requestDate]}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.request_date}
            </Text>
        </View>
    );

    const renderHeader = () => (
        <View style={[styles.row, styles.header]}>
            <TouchableOpacity
                style={[styles.cell, styles.id]}
                onPress={() => handleSort('row_no')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    #{' '}
                    {sortColumn === 'row_no' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.effectiveDate]}
                onPress={() => handleSort('effective_date')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Effective Date{' '}
                    {sortColumn === 'effective_date' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.identification]}
                onPress={() => handleSort('identification')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Name{' '}
                    {sortColumn === 'identification' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.branchName]}
                onPress={() => handleSort('branch_name')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Branch{' '}
                    {sortColumn === 'branch_name' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.purpose]}
                onPress={() => handleSort('purpose')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Purpose{' '}
                    {sortColumn === 'purpose' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.demandAmt]}
                onPress={() => handleSort('demand_amt')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Demand Amount{' '}
                    {sortColumn === 'demand_amt' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.cell, styles.requestDate]}
                onPress={() => handleSort('request_date')}
            >
                <Text style={styles.headerText} numberOfLines={1}>
                    Request Date{' '}
                    {sortColumn === 'request_date' &&
                        (sortDirection === 'asc' ? '↑' : '↓')}
                </Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: 'center', alignItems: 'center' },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color="#007AFF" // Change color (e.g., blue)
                    style={{ marginBottom: 10 }}
                />
                <Text style={styles.loadingText}>Loading Credit Data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: 'center', alignItems: 'center' },
                ]}
            >
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Credit Demand Data</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={search}
                onChangeText={handleSearch}
            />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                <View style={styles.tableContainer}>
                    {renderHeader()}
                    <FlatList
                        data={data}
                        keyExtractor={(item) =>
                            item.row_no?.toString() || Math.random().toString()
                        }
                        renderItem={renderItem}
                    />
                </View>
            </ScrollView>
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[
                        styles.pageButton,
                        currentPage === 1 && styles.disabledButton,
                    ]}
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Text>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageInfo}>
                    Page {currentPage} of{' '}
                    {Math.ceil(totalRecords / recordsPerPage)}
                </Text>
                <TouchableOpacity
                    style={[
                        styles.pageButton,
                        currentPage ===
                            Math.ceil(totalRecords / recordsPerPage) &&
                            styles.disabledButton,
                    ]}
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={
                        currentPage === Math.ceil(totalRecords / recordsPerPage)
                    }
                >
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, marginTop: 40 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    tableContainer: {
        minWidth: SCREEN_WIDTH * 1.5, // Ensure table is wider than screen for scrolling
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    header: { backgroundColor: '#ddd' },
    headerText: { fontWeight: 'bold', textAlign: 'center' },
    cell: {
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    id: { width: 50 }, // Narrow for row number
    effectiveDate: { width: 120 }, // Wider for dates
    identification: { width: 150 }, // Wider for names
    branchName: { width: 120 }, // Medium for branch names
    purpose: { width: 150 }, // Wider for purpose descriptions
    demandAmt: { width: 100 }, // Medium for amounts
    requestDate: { width: 120 }, // Wider for dates
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pageButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    pageInfo: {
        fontSize: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
