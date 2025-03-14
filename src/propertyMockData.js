// Mock property data
export const mockProperty = {
    id: 1,
    title: 'Modern Apartment with City View',
    description: `This stunning apartment offers breathtaking views of the city skyline. Featuring high-end finishes throughout, the property includes a gourmet kitchen with stainless steel appliances, quartz countertops, and custom cabinetry.
  
  The spacious living area opens to a private balcony perfect for enjoying morning coffee or evening sunsets. The master bedroom features a walk-in closet and an en-suite bathroom with a rainfall shower.
  
  Additional features include hardwood floors, recessed lighting, in-unit laundry, and a smart home system for climate control and security. The building offers a fitness center, rooftop pool, and 24-hour concierge service.
  
  Located in the heart of downtown, this property is within walking distance to restaurants, shopping, and public transportation.`,
    images: ['https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490', 'https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353', 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b'],
    price: 250000,
    purpose: 'sell',
    location: 'Downtown',
    address: '123 Main Street, Apt 5B',
    district: 'Central District',
    division: 'Northern Division',
    country: 'USA',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    size: 1200,
    yearBuilt: 2018,
    status: 'Active',
    features: [
        'Central Air',
        'Balcony',
        'Gym',
        'Swimming Pool',
        'Security',
        'Parking',
        'Garden',
        'Elevator'
    ],
    amenities: {
        airConditioning: true,
        heating: true,
        parking: 1,
        furnished: false,
        petsAllowed: true,
        washerDryer: true,
        elevator: true,
        securitySystem: true,
        fireplace: false,
        pool: true,
        gym: true,
        outdoorSpace: true
    },
    createdAt: '2025-02-15T14:30:00Z',
    updatedAt: '2025-03-10T09:45:00Z'
};

// Countries list
export const countries = [
    'USA',
    'Canada',
    'UK',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India'
];

// Property types
export const propertyTypes = [
    'Apartment',
    'House',
    'Villa',
    'Townhouse',
    'Studio',
    'Commercial',
    'Land',
    'Shop'
];

// Divisions by country
export const divisionsByCountry = {
    'USA': ['Northern Division', 'Southern Division', 'Eastern Division', 'Western Division', 'Central Division'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'UK': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
    'Germany': ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hesse'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine'],
    'Japan': ['Kanto', 'Kansai', 'Chubu', 'Kyushu'],
    'India': ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Delhi']
};

// Districts by division
export const districtsByDivision = {
    'Northern Division': ['Central District', 'Highland District', 'Valley District', 'Lake District'],
    'Southern Division': ['Coastal District', 'Bay District', 'Island District', 'Palm District'],
    'Eastern Division': ['Eastern District', 'Sunrise District', 'Forest District', 'Mountain District'],
    'Western Division': ['Western District', 'Sunset District', 'Desert District', 'Canyon District'],
    'Central Division': ['Downtown District', 'Midtown District', 'Uptown District', 'Business District'],
    'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
    'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge']
    // Other divisions would have their districts defined here
};