// File: data/mockLocations.js

// Mock Countries Data
export const mockCountries = [
    {
        id: 1,
        name: 'United States',
        code: 'US',
        active: true,
        divisionsCount: 5
    },
    {
        id: 2,
        name: 'Canada',
        code: 'CA',
        active: true,
        divisionsCount: 3
    },
    {
        id: 3,
        name: 'United Kingdom',
        code: 'GB',
        active: true,
        divisionsCount: 4
    },
    {
        id: 4,
        name: 'Australia',
        code: 'AU',
        active: true,
        divisionsCount: 3
    },
    {
        id: 5,
        name: 'Germany',
        code: 'DE',
        active: true,
        divisionsCount: 2
    },
    {
        id: 6,
        name: 'France',
        code: 'FR',
        active: true,
        divisionsCount: 3
    },
    {
        id: 7,
        name: 'Japan',
        code: 'JP',
        active: true,
        divisionsCount: 0
    },
    {
        id: 8,
        name: 'Brazil',
        code: 'BR',
        active: false,
        divisionsCount: 0
    }
];

// Mock Divisions Data
export const mockDivisions = [
    {
        id: 1,
        name: 'California',
        countryId: 1,
        countryName: 'United States',
        active: true,
        districtsCount: 3
    },
    {
        id: 2,
        name: 'New York',
        countryId: 1,
        countryName: 'United States',
        active: true,
        districtsCount: 2
    },
    {
        id: 3,
        name: 'Texas',
        countryId: 1,
        countryName: 'United States',
        active: true,
        districtsCount: 2
    },
    {
        id: 4,
        name: 'Florida',
        countryId: 1,
        countryName: 'United States',
        active: true,
        districtsCount: 1
    },
    {
        id: 5,
        name: 'Illinois',
        countryId: 1,
        countryName: 'United States',
        active: false,
        districtsCount: 1
    },
    {
        id: 6,
        name: 'Ontario',
        countryId: 2,
        countryName: 'Canada',
        active: true,
        districtsCount: 2
    },
    {
        id: 7,
        name: 'Quebec',
        countryId: 2,
        countryName: 'Canada',
        active: true,
        districtsCount: 1
    },
    {
        id: 8,
        name: 'British Columbia',
        countryId: 2,
        countryName: 'Canada',
        active: true,
        districtsCount: 1
    },
    {
        id: 9,
        name: 'England',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true,
        districtsCount: 2
    },
    {
        id: 10,
        name: 'Scotland',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true,
        districtsCount: 1
    },
    {
        id: 11,
        name: 'Wales',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true,
        districtsCount: 1
    },
    {
        id: 12,
        name: 'Northern Ireland',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true,
        districtsCount: 0
    },
    {
        id: 13,
        name: 'New South Wales',
        countryId: 4,
        countryName: 'Australia',
        active: true,
        districtsCount: 1
    },
    {
        id: 14,
        name: 'Victoria',
        countryId: 4,
        countryName: 'Australia',
        active: true,
        districtsCount: 1
    },
    {
        id: 15,
        name: 'Queensland',
        countryId: 4,
        countryName: 'Australia',
        active: true,
        districtsCount: 0
    },
    {
        id: 16,
        name: 'Bavaria',
        countryId: 5,
        countryName: 'Germany',
        active: true,
        districtsCount: 1
    },
    {
        id: 17,
        name: 'Berlin',
        countryId: 5,
        countryName: 'Germany',
        active: true,
        districtsCount: 0
    },
    {
        id: 18,
        name: 'Île-de-France',
        countryId: 6,
        countryName: 'France',
        active: true,
        districtsCount: 1
    },
    {
        id: 19,
        name: 'Provence-Alpes-Côte d\'Azur',
        countryId: 6,
        countryName: 'France',
        active: true,
        districtsCount: 1
    },
    {
        id: 20,
        name: 'Normandy',
        countryId: 6,
        countryName: 'France',
        active: true,
        districtsCount: 0
    }
];

// Mock Districts Data
export const mockDistricts = [
    {
        id: 1,
        name: 'Los Angeles',
        divisionId: 1,
        divisionName: 'California',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 2,
        name: 'San Francisco',
        divisionId: 1,
        divisionName: 'California',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 3,
        name: 'San Diego',
        divisionId: 1,
        divisionName: 'California',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 4,
        name: 'Manhattan',
        divisionId: 2,
        divisionName: 'New York',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 5,
        name: 'Brooklyn',
        divisionId: 2,
        divisionName: 'New York',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 6,
        name: 'Houston',
        divisionId: 3,
        divisionName: 'Texas',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 7,
        name: 'Dallas',
        divisionId: 3,
        divisionName: 'Texas',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 8,
        name: 'Miami',
        divisionId: 4,
        divisionName: 'Florida',
        countryId: 1,
        countryName: 'United States',
        active: true
    },
    {
        id: 9,
        name: 'Chicago',
        divisionId: 5,
        divisionName: 'Illinois',
        countryId: 1,
        countryName: 'United States',
        active: false
    },
    {
        id: 10,
        name: 'Toronto',
        divisionId: 6,
        divisionName: 'Ontario',
        countryId: 2,
        countryName: 'Canada',
        active: true
    },
    {
        id: 11,
        name: 'Ottawa',
        divisionId: 6,
        divisionName: 'Ontario',
        countryId: 2,
        countryName: 'Canada',
        active: true
    },
    {
        id: 12,
        name: 'Montreal',
        divisionId: 7,
        divisionName: 'Quebec',
        countryId: 2,
        countryName: 'Canada',
        active: true
    },
    {
        id: 13,
        name: 'Vancouver',
        divisionId: 8,
        divisionName: 'British Columbia',
        countryId: 2,
        countryName: 'Canada',
        active: true
    },
    {
        id: 14,
        name: 'London',
        divisionId: 9,
        divisionName: 'England',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true
    },
    {
        id: 15,
        name: 'Manchester',
        divisionId: 9,
        divisionName: 'England',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true
    },
    {
        id: 16,
        name: 'Edinburgh',
        divisionId: 10,
        divisionName: 'Scotland',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true
    },
    {
        id: 17,
        name: 'Cardiff',
        divisionId: 11,
        divisionName: 'Wales',
        countryId: 3,
        countryName: 'United Kingdom',
        active: true
    },
    {
        id: 18,
        name: 'Sydney',
        divisionId: 13,
        divisionName: 'New South Wales',
        countryId: 4,
        countryName: 'Australia',
        active: true
    },
    {
        id: 19,
        name: 'Melbourne',
        divisionId: 14,
        divisionName: 'Victoria',
        countryId: 4,
        countryName: 'Australia',
        active: true
    },
    {
        id: 20,
        name: 'Munich',
        divisionId: 16,
        divisionName: 'Bavaria',
        countryId: 5,
        countryName: 'Germany',
        active: true
    },
    {
        id: 21,
        name: 'Paris',
        divisionId: 18,
        divisionName: 'Île-de-France',
        countryId: 6,
        countryName: 'France',
        active: true
    },
    {
        id: 22,
        name: 'Nice',
        divisionId: 19,
        divisionName: 'Provence-Alpes-Côte d\'Azur',
        countryId: 6,
        countryName: 'France',
        active: true
    }
];