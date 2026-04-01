// ShopData.js

export const providers = [
  // ✅ Agriculture Services
  {
    id: 1,
    name: 'Green Harvest Solutions',
    owner: 'Rajeev Kumar',
    type: 'shop',
    serviceKey: 'agriculture-1',
    experience: '3 years',
    gst: '27ABCDE1234F2Z5',
    rating: 4.8,
    reviews: 58,
    availability: 'Available',
    location: 'Sector 12, Patna',
    distance: '2.5 km',
    phone: '9876543210',
   
    specialties: ['Crop Harvesting', 'Tractor Service']
  },
  {
    id: 2,
    name: 'HarvestTech Franchise',
    owner: 'Pooja Singh',
    type: 'franchisee',
    serviceKey: 'agriculture-1',
    experience: '5 years',
    gst: '09AABCU9603R1ZM',
    rating: 4.7,
    reviews: 35,
    availability: 'Unavailable',
    location: 'Gandhi Nagar',
    distance: '3.2 km',
    phone: '9123456780',

    specialties: ['Modern Irrigation', 'Fertilizer Application']
  },

  // ✅ Construction Services
  {
    id: 3,
    name: 'BuildRight Supplies',
    owner: 'Amit Rathi',
    type: 'shop',
    serviceKey: 'construction-1',
    experience: '6 years',
    gst: '27CDEFG5678H1Z6',
    rating: 4.5,
    reviews: 42,
    availability: 'Available',
    location: 'Ashok Nagar, Ranchi',
    distance: '4.1 km',
    phone: '9871234567',

    specialties: ['Cement Supply', 'Concrete Mixing']
  },
  {
    id: 4,
    name: 'SolidBuild Franchise',
    owner: 'Sneha Verma',
    type: 'franchisee',
    serviceKey: 'construction-1',
    experience: '4 years',
    gst: '10FGHIJ7890K2Z3',
    rating: 4.2,
    reviews: 30,
    availability: 'Available',
    location: 'Civil Lines, Lucknow',
    distance: '5.6 km',
    phone: '9832109876',
 
    specialties: ['Scaffolding', 'Site Supervision']
  },

  // ✅ Logistics Services
  {
    id: 5,
    name: 'QuickMove Transport',
    owner: 'Rakesh Yadav',
    type: 'shop',
    serviceKey: 'logistics-1',
    experience: '2 years',
    gst: '23JKLMN3456O1Z9',
    rating: 4.3,
    reviews: 25,
    availability: 'Available',
    location: 'Transport Nagar, Bhopal',
    distance: '1.9 km',
    phone: '9012345678',
  
    specialties: ['Goods Carrier', 'Mini Truck Rental']
  },
  {
    id: 6,
    name: 'MoveEase Franchise',
    owner: 'Divya Sharma',
    type: 'franchisee',
    serviceKey: 'logistics-1',
    experience: '3 years',
    gst: '08OPQRS6789T3Z1',
    rating: 4.6,
    reviews: 18,
    availability: 'Unavailable',
    location: 'Ring Road, Jaipur',
    distance: '3.8 km',
    phone: '9821345670',
  
    specialties: ['Warehousing', 'Freight Services']
  },

  // ✅ Labour Services
  {
    id: 7,
    name: 'Labour Express',
    owner: 'Naresh Kumar',
    type: 'shop',
    serviceKey: 'labour-1',
    experience: '4 years',
    gst: '27LMNOP1234X5Z7',
    rating: 4.7,
    reviews: 40,
    availability: 'Available',
    location: 'Indira Nagar, Kanpur',
    distance: '2.1 km',
    phone: '9898989898',
 
    specialties: ['Masonry Work', 'Repair Labour']
  },
  {
    id: 8,
    name: 'RapidLabour Franchise',
    owner: 'Kavita Yadav',
    type: 'franchisee',
    serviceKey: 'labour-1',
    experience: '2 years',
    gst: '07ABCDE4567T9Z2',
    rating: 4.6,
    reviews: 28,
    availability: 'Available',
    location: 'Lajpat Nagar, Delhi',
    distance: '3.3 km',
    phone: '9876543211',
   
    specialties: ['Construction Help', 'Cleaning Labour']
  },

  // ✅ Electrician Services
  {
    id: 9,
    name: 'VoltageFix Services',
    owner: 'Arun Mishra',
    type: 'shop',
    serviceKey: 'electrician-1',
    experience: '5 years',
    gst: '29QWERT1234F6Z8',
    rating: 4.8,
    reviews: 50,
    availability: 'Available',
    location: 'Sector 14, Gurgaon',
    distance: '1.5 km',
    phone: '9999888877',
   
    specialties: ['Wiring', 'Fuse Repair']
  },
  {
    id: 10,
    name: 'ElectroHub Franchise',
    owner: 'Neha Sharma',
    type: 'franchisee',
    serviceKey: 'electrician-1',
    experience: '3 years',
    gst: '33ZXCVB5678R2Z1',
    rating: 4.7,
    reviews: 35,
    availability: 'Unavailable',
    location: 'Adarsh Nagar, Jaipur',
    distance: '4.2 km',
    phone: '9812345678',
  
    specialties: ['AC Installation', 'Electrical Testing']
  },

  // ✅ Painter Services
  {
    id: 11,
    name: 'ColorMate Solutions',
    owner: 'Sunil Rao',
    type: 'shop',
    serviceKey: 'painter-1',
    experience: '6 years',
    gst: '19ASDFG6789L5Z6',
    rating: 4.9,
    reviews: 60,
    availability: 'Available',
    location: 'Park Street, Kolkata',
    distance: '2.8 km',
    phone: '9734123456',
   
    specialties: ['Interior Painting', 'Whitewash']
  },
  {
    id: 12,
    name: 'PaintPro Franchise',
    owner: 'Meera Iyer',
    type: 'franchisee',
    serviceKey: 'painter-1',
    experience: '4 years',
    gst: '21LKJHG9876M2Z3',
    rating: 4.6,
    reviews: 32,
    availability: 'Available',
    location: 'Anna Nagar, Chennai',
    distance: '3.6 km',
    phone: '9988776655',
 
    specialties: ['Exterior Design', 'Theme Painting']
  },

  // ✅ Plumber Services
  {
    id: 13,
    name: 'PlumbXperts',
    owner: 'Ravi Joshi',
    type: 'shop',
    serviceKey: 'plumber-1',
    experience: '5 years',
    gst: '24QAZWS1234X9Z0',
    rating: 4.8,
    reviews: 48,
    availability: 'Available',
    location: 'Old City, Hyderabad',
    distance: '2.0 km',
    phone: '9654321098',
   
    specialties: ['Leak Fixing', 'Tap Fitting']
  },
  {
    id: 14,
    name: 'FlowFix Franchise',
    owner: 'Anjali Mehta',
    type: 'franchisee',
    serviceKey: 'plumber-1',
    experience: '2 years',
    gst: '26PLUMB2345N6Z1',
    rating: 4.7,
    reviews: 26,
    availability: 'Unavailable',
    location: 'Rajaji Nagar, Bengaluru',
    distance: '3.1 km',
    phone: '9678901234',
 
    specialties: ['Bathroom Fittings', 'Water System Setup']
  },

  // ✅ Interior Designer Services
  {
    id: 15,
    name: 'DesignSpace Studio',
    owner: 'Pratiksha Rao',
    type: 'shop',
    serviceKey: 'interior-designer-1',
    experience: '6 years',
    gst: '32INTDES1234K7Z9',
    rating: 4.9,
    reviews: 40,
    availability: 'Available',
    location: 'South Ex, Delhi',
    distance: '2.4 km',
    phone: '9345678901',
   
    specialties: ['Living Room', 'Bedroom Decor']
  },
  {
    id: 16,
    name: 'DecoDesign Franchise',
    owner: 'Vivek Nair',
    type: 'franchisee',
    serviceKey: 'interior-designer-1',
    experience: '5 years',
    gst: '30DESIGN7890P4Z2',
    rating: 4.8,
    reviews: 33,
    availability: 'Available',
    location: 'MG Road, Kochi',
    distance: '4.0 km',
    phone: '9345612780',

    specialties: ['Office Setup', '3D Modeling']
  },

  // ✅ House Builder Services
  {
    id: 17,
    name: 'BuildNest Contractors',
    owner: 'Deepak Chauhan',
    type: 'shop',
    serviceKey: 'house-builder-1',
    experience: '7 years',
    gst: '35HOUSE2345B2Z5',
    rating: 4.8,
    reviews: 55,
    availability: 'Available',
    location: 'Sector 62, Noida',
    distance: '3.0 km',
    phone: '8765432109',

    specialties: ['Residential Build', 'Modular Additions']
  },
  {
    id: 18,
    name: 'HomeConstruct Franchise',
    owner: 'Shruti Bansal',
    type: 'franchisee',
    serviceKey: 'house-builder-1',
    experience: '6 years',
    gst: '36HOMEC1234R6Z4',
    rating: 4.7,
    reviews: 38,
    availability: 'Unavailable',
    location: 'Rajpur Road, Dehradun',
    distance: '3.5 km',
    phone: '9123456790',
  
    specialties: ['House Renovation', 'Construction Supervision']
  }
];
