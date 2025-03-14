// File: data/mockProperties.js

export const mockProperties = [
    {
        id: 1,
        title: "Modern Apartment in Downtown",
        address: "123 Main St, Downtown, City",
        description: "A beautiful modern apartment in the heart of downtown. Features high ceilings, hardwood floors, and an open concept layout. The kitchen is equipped with stainless steel appliances and granite countertops. The building has a gym, rooftop terrace, and 24-hour security.",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        garages: 1,
        price: 450000,
        listingType: "sale",
        status: "active",
        featured: true,
        flagged: false,
        listedOn: "2024-01-15",
        images: [
            "/property1-1.jpg",
            "/property1-2.jpg",
            "/property1-3.jpg",
            "/property1-4.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Rooftop Access",
            "Gym",
            "Pool",
            "Security System"
        ],
        owner: {
            id: 101,
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "(555) 123-4567",
            type: "landlord",
            verified: true,
            avatar: "/avatar1.jpg",
            propertyCount: 5,
            memberSince: "2022-05-10",
            bio: "Professional landlord with over 10 years of experience in real estate. I specialize in high-quality properties in downtown areas."
        }
    },
    {
        id: 2,
        title: "Spacious Family House with Garden",
        address: "456 Oak Avenue, Suburbs, City",
        description: "Perfect for families, this spacious house features 4 bedrooms, a large backyard, and a modern kitchen. Located in a quiet neighborhood with excellent schools nearby. The house has been recently renovated with new plumbing and electrical systems.",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: 2400,
        garages: 2,
        price: 750000,
        listingType: "sale",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-02-03",
        images: [
            "/property2-1.jpg",
            "/property2-2.jpg",
            "/property2-3.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Garden",
            "Patio",
            "Fireplace",
            "Basement"
        ],
        owner: {
            id: 102,
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            phone: "(555) 987-6543",
            type: "agent",
            verified: true,
            avatar: "/avatar2.jpg",
            propertyCount: 12,
            memberSince: "2021-08-15",
            bio: "Real estate agent with a focus on family homes. I help families find their dream homes in the best neighborhoods."
        }
    },
    {
        id: 3,
        title: "Luxury Penthouse with City Views",
        address: "789 Sky Tower, Financial District, City",
        description: "Exclusive penthouse with panoramic city views. Features include a private elevator, gourmet kitchen, and floor-to-ceiling windows. The building offers premium amenities including a concierge service, spa, and indoor pool.",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 3.5,
        area: 3000,
        garages: 2,
        price: 1200000,
        listingType: "sale",
        status: "pending",
        featured: true,
        flagged: false,
        listedOn: "2024-03-01",
        images: [
            "/property3-1.jpg",
            "/property3-2.jpg",
            "/property3-3.jpg",
            "/property3-4.jpg",
            "/property3-5.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: true,
            petFriendly: false
        },
        additionalFeatures: [
            "Private Elevator",
            "Concierge Service",
            "Indoor Pool",
            "Spa",
            "Wine Cellar"
        ],
        owner: {
            id: 103,
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "(555) 456-7890",
            type: "landlord",
            verified: true,
            avatar: "/avatar3.jpg",
            propertyCount: 3,
            memberSince: "2023-01-20",
            bio: "Owner of several luxury properties in prime locations. I believe in providing top-quality living experiences for discerning clients."
        }
    },
    {
        id: 4,
        title: "Cozy Studio Apartment for Rent",
        address: "101 College Street, University District, City",
        description: "Perfect for students or young professionals, this cozy studio apartment is located near the university. It features a modern kitchenette, updated bathroom, and plenty of natural light.",
        type: "apartment",
        bedrooms: 0,
        bathrooms: 1,
        area: 500,
        garages: 0,
        price: 1200,
        listingType: "rent",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-02-20",
        images: [
            "/property4-1.jpg",
            "/property4-2.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: false,
            internet: true,
            furnished: true,
            petFriendly: false
        },
        additionalFeatures: [
            "Laundry in Building",
            "Bike Storage",
            "Study Room"
        ],
        owner: {
            id: 104,
            name: "Jennifer Davis",
            email: "jennifer.davis@example.com",
            phone: "(555) 234-5678",
            type: "landlord",
            verified: true,
            avatar: "/avatar4.jpg",
            propertyCount: 8,
            memberSince: "2022-09-05",
            bio: "I specialize in affordable housing options for students and young professionals. All my properties are well-maintained and centrally located."
        }
    },
    {
        id: 5,
        title: "Commercial Office Space",
        address: "555 Business Plaza, Financial District, City",
        description: "Prime commercial office space in the heart of the financial district. Open floor plan with modern amenities, perfect for startups or established businesses looking to expand.",
        type: "commercial",
        bedrooms: 0,
        bathrooms: 2,
        area: 2000,
        garages: 4,
        price: 8500,
        listingType: "rent",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-01-10",
        images: [
            "/property5-1.jpg",
            "/property5-2.jpg",
            "/property5-3.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: false
        },
        additionalFeatures: [
            "Conference Rooms",
            "Reception Area",
            "Kitchen",
            "Security System",
            "Elevator Access"
        ],
        owner: {
            id: 105,
            name: "Robert Wilson",
            email: "robert.wilson@example.com",
            phone: "(555) 876-5432",
            type: "landlord",
            verified: true,
            avatar: "/avatar5.jpg",
            propertyCount: 6,
            memberSince: "2021-03-15",
            bio: "Commercial property specialist with a portfolio of premium office spaces in strategic business locations across the city."
        }
    },
    {
        id: 6,
        title: "Beachfront Vacation Home",
        address: "333 Coastal Highway, Beachside, City",
        description: "Stunning beachfront property perfect for vacations or investment. Features direct beach access, panoramic ocean views, and a private swimming pool.",
        type: "house",
        bedrooms: 5,
        bathrooms: 4,
        area: 3500,
        garages: 2,
        price: 1800000,
        listingType: "sale",
        status: "pending",
        featured: true,
        flagged: false,
        listedOn: "2024-02-28",
        images: [
            "/property6-1.jpg",
            "/property6-2.jpg",
            "/property6-3.jpg",
            "/property6-4.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Private Pool",
            "Direct Beach Access",
            "Outdoor Kitchen",
            "Large Patio",
            "Jacuzzi"
        ],
        owner: {
            id: 106,
            name: "Emma Thompson",
            email: "emma.thompson@example.com",
            phone: "(555) 765-4321",
            type: "agent",
            verified: true,
            avatar: "/avatar6.jpg",
            propertyCount: 10,
            memberSince: "2022-04-10",
            bio: "Luxury property specialist with expertise in waterfront homes. I help clients find exceptional properties in the most desirable locations."
        }
    },
    {
        id: 7,
        title: "Urban Loft in Arts District",
        address: "222 Artist Lane, Arts District, City",
        description: "Stylish urban loft in the vibrant Arts District. Features exposed brick walls, high ceilings, and industrial-style fixtures. Perfect for creatives and urban professionals.",
        type: "apartment",
        bedrooms: 1,
        bathrooms: 1,
        area: 950,
        garages: 1,
        price: 375000,
        listingType: "sale",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-02-12",
        images: [
            "/property7-1.jpg",
            "/property7-2.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Exposed Brick",
            "High Ceilings",
            "Rooftop Access",
            "Artist Studio Space"
        ],
        owner: {
            id: 107,
            name: "David Miller",
            email: "david.miller@example.com",
            phone: "(555) 345-6789",
            type: "landlord",
            verified: true,
            avatar: "/avatar7.jpg",
            propertyCount: 4,
            memberSince: "2022-07-22",
            bio: "I focus on unique properties with character in artistic neighborhoods. My listings appeal to creative professionals seeking inspiration in their living spaces."
        }
    },
    {
        id: 8,
        title: "Suburban Townhouse",
        address: "444 Family Circle, Pleasant Suburb, City",
        description: "Well-maintained townhouse in a family-friendly neighborhood. Features include a fenced backyard, updated kitchen, and proximity to excellent schools and parks.",
        type: "townhouse",
        bedrooms: 3,
        bathrooms: 2.5,
        area: 1800,
        garages: 1,
        price: 425000,
        listingType: "sale",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-01-25",
        images: [
            "/property8-1.jpg",
            "/property8-2.jpg",
            "/property8-3.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: false,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Fenced Yard",
            "Community Pool",
            "Playground Nearby",
            "Updated Kitchen"
        ],
        owner: {
            id: 108,
            name: "Linda Garcia",
            email: "linda.garcia@example.com",
            phone: "(555) 567-8901",
            type: "agent",
            verified: true,
            avatar: "/avatar8.jpg",
            propertyCount: 15,
            memberSince: "2021-11-08",
            bio: "Family-focused real estate agent specializing in suburban properties. I help families find safe, comfortable homes in welcoming neighborhoods."
        }
    },
    {
        id: 9,
        title: "Mountain View Cabin",
        address: "999 Mountain Road, Highlands, City",
        description: "Charming cabin with stunning mountain views. Perfect as a weekend getaway or year-round residence for nature lovers. Features a stone fireplace, wooden beams, and a large deck.",
        type: "house",
        bedrooms: 2,
        bathrooms: 1,
        area: 1100,
        garages: 1,
        price: 320000,
        listingType: "sale",
        status: "active",
        featured: false,
        flagged: false,
        listedOn: "2024-03-05",
        images: [
            "/property9-1.jpg",
            "/property9-2.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: false,
            internet: false,
            furnished: false,
            petFriendly: true
        },
        additionalFeatures: [
            "Stone Fireplace",
            "Large Deck",
            "Hiking Trails Nearby",
            "Wood Stove"
        ],
        owner: {
            id: 109,
            name: "Thomas Rodriguez",
            email: "thomas.rodriguez@example.com",
            phone: "(555) 678-9012",
            type: "landlord",
            verified: false,
            avatar: "/avatar9.jpg",
            propertyCount: 2,
            memberSince: "2023-06-30",
            bio: "I specialize in rustic properties with natural surroundings. My listings are perfect for those looking to escape the hustle and bustle of city life."
        }
    },
    {
        id: 10,
        title: "Riverside Condominium",
        address: "777 Riverfront Drive, Downtown, City",
        description: "Modern condominium with beautiful river views. Features floor-to-ceiling windows, balcony, and access to building amenities including a fitness center and rooftop lounge.",
        type: "condo",
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        garages: 1,
        price: 550000,
        listingType: "sale",
        status: "inactive",
        featured: false,
        flagged: false,
        listedOn: "2024-01-05",
        images: [
            "/property10-1.jpg",
            "/property10-2.jpg",
            "/property10-3.jpg"
        ],
        amenities: {
            water: true,
            electricity: true,
            heating: true,
            cooling: true,
            internet: true,
            furnished: false,
            petFriendly: false
        },
        additionalFeatures: [
            "River Views",
            "Fitness Center",
            "Rooftop Lounge",
            "24/7 Security"
        ],
        owner: {
            id: 110,
            name: "Patricia Lee",
            email: "patricia.lee@example.com",
            phone: "(555) 789-0123",
            type: "landlord",
            verified: true,
            avatar: "/avatar10.jpg",
            propertyCount: 7,
            memberSince: "2022-02-15",
            bio: "Real estate investor focusing on premium urban properties. I offer well-maintained condos in the most desirable areas of the city."
        }
    }
]