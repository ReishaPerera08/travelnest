const destinations = [
    {
        id: 1,
        name: "Amsterdam",
        country: "Netherlands",
        continent: "Europe",
        type: "Cultural",
        budgetLevel: "Medium",
        image: "images/amsterdam.jpg",
        description: "A charming city known for its historic canals and vibrant art scene. Perfect for exploring museums and enjoying a relaxed atmosphere.",
        attractions: ["Van Gogh Museum", "Rijksmuseum", "Anne Frank House"],
        costs: {hotel: 200, food: 150, activities: 150, transportation: 100, total: 600}
    
    },

    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        continent: "Asia",
        type: "Relaxation",
        budgetLevel: "Medium",
        image: "images/bali.jpg",
        description: "A tropical paradise with stunning beaches and vibrant culture. Perfect for relaxation and adventure.",
        attractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Seminyak Beach"],
        costs: {hotel: 250, food: 150, activities: 120, transportation: 60, total: 580}
        
    },

    {
        id: 3,
        name: "Banff",
        country: "Canada",
        continent: "North America",
        type: "Nature",
        budgetLevel: "Medium",
        image: "images/banff.jpg",
        description: "A stunning destination for outdoor enthusiasts, offering breathtaking mountain scenery and numerous hiking opportunities.",
        attractions: ["Banff National Park", "Lake Louise", "Moraine Lake"],
        costs: {hotel: 300, food: 250, activities: 100, transportation: 150, total: 800}
        
    },

    {
        id: 4,
        name: "Bangkok",
        country: "Thailand",
        continent: "Asia",
        type: "Cultural",
        budgetLevel: "Low",
        image: "images/bangkok.jpg",
        description: "A vibrant city known for its bustling street life and rich cultural heritage. Perfect for exploring temples and enjoying delicious street food.",
        attractions: ["Grand Palace", "Wat Pho", "Chatuchak Weekend Market"],
        costs: {hotel: 100, food: 50, activities: 60, transportation: 30, total: 240}
        
    },

    {
        id: 5,
        name: "Cape Town",
        country: "South Africa",
        continent: "Africa",
        type: "Adventure",
        budgetLevel: "Medium",
        image: "images/capetown.jpg",
        description: "A vibrant city known for its stunning natural beauty and rich cultural heritage. Perfect for outdoor adventures and exploring diverse neighborhoods.",
        attractions: ["Table Mountain", "Robben Island", "Cape of Good Hope"],
        costs: {hotel: 300, food: 150, activities: 200, transportation: 100, total: 750}
    },

    {
        id: 6,
        name: "Cusco",
        country: "Peru",
        continent: "South America",
        type: "Cultural",
        budgetLevel: "Low",
        image: "images/cusco.jpg",
        description: "A vibrant city known for its rich history and proximity to Machu Picchu. Perfect for exploring ancient ruins and vibrant culture.",
        attractions: ["Machu Picchu", "Sacred Valley", "Colca Canyon"],
        costs: {hotel: 100, food: 50, activities: 40, transportation: 30, total: 220 }
        
    },

    {
        id: 7,
        name: "Dubai",
        country: "UAE",
        continent: "Asia",
        type: "Adventure",
        budgetLevel: "High",
        image: "images/dubai.jpg",
        description: "A modern city known for its luxurious shopping and stunning architecture. Perfect for experiencing opulent lifestyles and iconic landmarks.",
        attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
        costs: {hotel: 1100, food: 250, activities: 450, transportation: 350, total: 2150}
        
    },

    {
        id: 8,
        name: "Havana",
        country: "Cuba",
        continent: "North America",
        type: "Cultural",
        budgetLevel: "Low",
        image: "images/havana.jpg",
        description: "A vibrant city known for its rich cultural heritage and colonial architecture. Perfect for exploring historic neighborhoods and enjoying live music.",
        attractions: ["Old Havana", "Plaza de Armas", "Calle Obrapía"],
        costs: {hotel: 150, food: 100, activities: 100, transportation: 50, total: 400}
        
    },

    {
        id: 9,
        name: "Kyoto",
        country: "Japan",
        continent: "Asia",
        type: "Cultural",
        budgetLevel: "High",
        image: "images/kyoto.jpg",
        description: "A historic city known for its traditional temples and beautiful gardens. Perfect for experiencing Japanese culture and visiting serene shrines.",
        attractions: ["Kinkaku-ji", "Gion District", "Fushimi Inari Shrine"],
        costs: {hotel: 650, food: 350, activities: 300, transportation: 200, total: 1500}
        
    },

    {
        id: 10,
        name: "Lisbon",
        country: "Portugal",
        continent: "Europe",
        type: "Cultural",
        budgetLevel: "Medium",
        image: "images/lisbon.jpg",
        description: "A historic city known for its colorful architecture and vibrant cultural scene. Perfect for exploring narrow streets and enjoying delicious seafood.",
        attractions: ["Belém Tower", "Jerónimos Monastery", " Alfama District"],
        costs: {hotel: 250, food: 200, activities: 150, transportation: 100, total: 700}
        
    },

    {
        id: 11,
        name: "Marrakech",
        country: "Morocco",
        continent: "Africa",
        type: "Cultural",
        budgetLevel: "Medium",
        image: "images/marrakech.jpg",
        description: "A vibrant city known for its rich cultural heritage and bustling markets. Perfect for exploring historic sites and vibrant souks.",
        attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Koutoubia Mosque"],
        costs: {hotel: 300, food: 150, activities: 150, transportation: 100, total: 700}
        
    },

    {
        id: 12,
        name: "New York City",
        country: "USA",
        continent: "North America",
        type: "Cultural",
        budgetLevel: "High",
        image: "images/nyc.jpg",
        description: "A bustling city known for its iconic landmarks and vibrant culture. Perfect for exploring museums, Broadway shows, and enjoying diverse cuisine.",
        attractions: ["Statue of Liberty", "Central Park", "Times Square"],
        costs: {hotel: 500, food: 300, activities: 250, transportation: 250, total: 1300}
        
    },

    {
        id: 13,
        name: "Paris",
        country: "France",
        continent: "Europe",
        type: "Cultural",
        budgetLevel: "High",
        image: "images/paris.jpg",
        description: "A vibrant city known for its art, culture, and romance. Perfect for exploring iconic landmarks and world-class museums.",
        attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
        costs: {hotel: 750, food: 450, activities: 400, transportation: 550, total: 2150}
        
    },

    {
        id: 14,
        name: "Prague",
        country: "Czech Republic",
        continent: "Europe",
        type: "Cultural",
        budgetLevel: "Medium",
        image: "images/prague.jpg",
        description: "A historic city known for its well-preserved architecture and vibrant cultural scene. Perfect for exploring medieval streets and visiting iconic castles.",
        attractions: ["Prague Castle", "Charles Bridge", "Old Town Square"],
        costs: {hotel: 300, food: 250, activities: 200, transportation: 100, total: 850}
        
    },

    {
        id: 15,
        name: "Reykjavik",
        country: "Iceland",
        continent: "Europe",
        type: "Nature",
        budgetLevel: "High",
        image: "images/reykjavik.jpg",
        description: "A vibrant city known for its unique Icelandic culture and stunning natural landscapes. Perfect for exploring geothermal wonders and experiencing the midnight sun.",
        attractions: ["Hallgrímskirkja", "Harpa Concert Hall", "Golden Circle"],
        costs: {hotel: 600, food: 400, activities: 300, transportation: 250, total: 1550}
    },

    {
        id: 16,
        name: "Rio de Janeiro",
        country: "Brazil",
        continent: "South America",
        type: "Adventure",
        budgetLevel: "Medium",
        image: "images/rio.jpg",
        description: "A vibrant city known for its lively culture and stunning landscapes. Perfect for exploring iconic landmarks and enjoying vibrant festivals.",
        attractions: ["Christ the Redeemer", "Sugar Loaf Mountain", "Copacabana Beach"],
        costs: {hotel: 300, food: 150, activities: 200, transportation: 100, total: 750}
    },

    {
        id: 17,
        name: "Santorini",
        country: "Greece",
        continent: "Europe",
        type: "Relaxation",
        budgetLevel: "High",
        image: "images/santorini.jpg",
        description: "A stunning island destination known for its breathtaking sunsets and white-washed buildings. Perfect for relaxation and romantic getaways.",
        attractions: ["Oia Village", "Fira", "Red Beach"],
        costs: {hotel: 800, food: 600, activities: 580, transportation: 450, total: 2430}
        
    },

    {
        id: 18,
        name: "Sydney",
        country: "Australia",
        continent: "Australia",
        type: "Relaxation",
        budgetLevel: "High",
        image: "images/sydney.jpg",
        description: "A vibrant city known for its iconic landmarks and beautiful beaches. Perfect for exploring a mix of urban culture and outdoor activities.",
        attractions: ["Sydney Opera House", "Bondi Beach", "Taronga Zoo"],
        costs: {hotel: 400, food: 350, activities: 400, transportation: 350, total: 1500}
    },

    {
        id: 19,
        name: "Tokyo",
        country: "Japan",
        continent: "Asia",
        type: "Cultural",
        budgetLevel: "High",
        image: "images/tokyo.jpg",
        description: "A vibrant metropolis known for its blend of traditional and modern culture. Perfect for exploring bustling streets and unique cuisine.",
        attractions: ["Tokyo Tower", "Shibuya Crossing", "Senso-ji Temple"],
        costs: {hotel: 400, food: 250, activities: 150, transportation: 200, total: 1000}
    },

    {
        id: 20,
        name: "Venice",
        country: "Italy",
        continent: "Europe",
        type: "Cultural",
        budgetLevel: "High",
        image: "images/venice.jpg",
        description: "A romantic city known for its unique canals and rich history. Perfect for taking gondola rides and exploring historic architecture.",
        attractions: ["St. Mark's Basilica", "Doge's Palace", "Rialto Bridge"],
        costs: {hotel: 1100, food: 300, activities: 250, transportation: 200, total: 1850}
    }

];