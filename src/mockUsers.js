// File: data/mockUsers.js

export const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        type: 'landlord',
        status: 'active',
        verified: true,
        registrationDate: '2023-02-15',
        lastActive: '2024-03-12',
        properties: 5,
        avatar: null,
        address: '123 Main St, Anytown, ST 12345',
        verificationDocuments: [
            { id: 1, type: 'ID Card', status: 'verified', date: '2023-02-16' },
            { id: 2, type: 'Property Deed', status: 'verified', date: '2023-02-17' }
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        type: 'renter',
        status: 'active',
        verified: false,
        registrationDate: '2023-05-22',
        lastActive: '2024-03-14',
        properties: 0,
        avatar: null,
        address: '456 Oak Ave, Somewhere, ST 54321',
        verificationDocuments: []
    },
    {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '+1 (555) 456-7890',
        type: 'landlord',
        status: 'inactive',
        verified: true,
        registrationDate: '2023-01-10',
        lastActive: '2023-11-30',
        properties: 3,
        avatar: null,
        address: '789 Pine Rd, Elsewhere, ST 67890',
        verificationDocuments: [
            { id: 3, type: 'ID Card', status: 'verified', date: '2023-01-11' },
            { id: 4, type: 'Property Deed', status: 'verified', date: '2023-01-12' }
        ]
    },
    {
        id: 4,
        name: 'Emily Williams',
        email: 'emily.williams@example.com',
        phone: '+1 (555) 789-0123',
        type: 'admin',
        status: 'active',
        verified: true,
        registrationDate: '2022-12-05',
        lastActive: '2024-03-13',
        properties: 0,
        avatar: null,
        address: 'Admin Office, Ghor HQ',
        verificationDocuments: []
    },
    {
        id: 5,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 234-5678',
        type: 'renter',
        status: 'pending',
        verified: false,
        registrationDate: '2024-03-10',
        lastActive: '2024-03-10',
        properties: 0,
        avatar: null,
        address: '101 Elm St, Nowhere, ST 13579',
        verificationDocuments: []
    },
    {
        id: 6,
        name: 'Sarah Miller',
        email: 'sarah.miller@example.com',
        phone: '+1 (555) 345-6789',
        type: 'landlord',
        status: 'active',
        verified: false,
        registrationDate: '2024-02-18',
        lastActive: '2024-03-11',
        properties: 1,
        avatar: null,
        address: '202 Maple Dr, Anytown, ST 24680',
        verificationDocuments: [
            { id: 5, type: 'ID Card', status: 'pending', date: '2024-02-20' }
        ]
    },
    {
        id: 7,
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1 (555) 456-7891',
        type: 'renter',
        status: 'active',
        verified: true,
        registrationDate: '2023-07-14',
        lastActive: '2024-03-09',
        properties: 0,
        avatar: null,
        address: '303 Cedar Ln, Somewhere, ST 97531',
        verificationDocuments: [
            { id: 6, type: 'ID Card', status: 'verified', date: '2023-07-16' }
        ]
    },
    {
        id: 8,
        name: 'Jessica Taylor',
        email: 'jessica.taylor@example.com',
        phone: '+1 (555) 567-8912',
        type: 'landlord',
        status: 'active',
        verified: true,
        registrationDate: '2023-04-02',
        lastActive: '2024-03-13',
        properties: 7,
        avatar: null,
        address: '404 Birch Rd, Elsewhere, ST 86420',
        verificationDocuments: [
            { id: 7, type: 'ID Card', status: 'verified', date: '2023-04-04' },
            { id: 8, type: 'Property Deed', status: 'verified', date: '2023-04-05' }
        ]
    },
    {
        id: 9,
        name: 'Andrew Anderson',
        email: 'andrew.anderson@example.com',
        phone: '+1 (555) 678-9123',
        type: 'renter',
        status: 'inactive',
        verified: false,
        registrationDate: '2023-09-20',
        lastActive: '2023-12-15',
        properties: 0,
        avatar: null,
        address: '505 Spruce Ct, Nowhere, ST 13579',
        verificationDocuments: []
    },
    {
        id: 10,
        name: 'Olivia Martinez',
        email: 'olivia.martinez@example.com',
        phone: '+1 (555) 789-1234',
        type: 'landlord',
        status: 'pending',
        verified: false,
        registrationDate: '2024-03-05',
        lastActive: '2024-03-05',
        properties: 2,
        avatar: null,
        address: '606 Willow Ave, Anytown, ST 24680',
        verificationDocuments: [
            { id: 9, type: 'ID Card', status: 'pending', date: '2024-03-07' },
            { id: 10, type: 'Property Deed', status: 'pending', date: '2024-03-07' }
        ]
    }
];