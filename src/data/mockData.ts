// Mock data matching the MySQL database schema

export interface JobTitle {
  Job_ID: number;
  Title: string;
  Description: string;
}

export interface Employee {
  Employee_ID: number;
  First_Name: string;
  Last_Name: string;
  Birthdate: string;
  Sex: 'M' | 'F';
  Job_ID: number;
  Salary: number;
  Email: string;
  Password: string;
  Address: string;
  Supervisor_ID: number | null;
  Job_Title?: JobTitle; // Joined data
}

export interface Customer {
  Customer_ID: number;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Customer_Password: string;
  Phone: string;
}

export interface Location {
  Location_ID: number;
  Zone: string; // Single character A-Z
  Description: string;
  Supervisor_ID: number | null;
  Supervisor_Start_Date: string | null; // Date when current supervisor was assigned
}

export interface Enclosure {
  Enclosure_ID: number;
  Name: string;
  Location_ID: number;
  Size: number;
  Type: string;
}

export interface Animal {
  Animal_ID: number;
  Name: string;
  Species: string;
  Gender: 'M' | 'F' | 'U';
  Height: number; // Height in feet
  Birthdate: string; // Date string in YYYY-MM-DD format
  Enclosure_ID: number;
  Enclosure?: Enclosure; // Joined data
}

export interface GiftShop {
  Shop_ID: number;
  Name: string;
  Location_ID: number;
}

export interface Item {
  Item_ID: number;
  Item_Name: string;
  Price: number;
  Shop_ID: number;
}

export interface PurchaseItem {
  Purchase_ID: number;
  Item_ID: number;
  Quantity: number;
}

export interface ConcessionStand {
  Stand_ID: number;
  Stand_Name: string;
  Stand_Type: string;
  Location_ID: number;
}

export interface ConcessionItem {
  Concession_Item_ID: number;
  Stand_ID: number;
  Item_Name: string;
  Price: number;
}

export interface Purchase {
  Purchase_ID: number;
  Total_Amount: number;
  Payment_Method: 'Cash' | 'Card' | 'Online';
  Purchase_Date: string;
  Customer_ID: number;
  Membership_ID: number | null;
}

export interface Ticket {
  Ticket_ID: number;
  Ticket_Type: 'Adult' | 'Child' | 'Senior' | 'Student';
  Price: number;
  Valid_Date: string;
  Is_Used: boolean;
  Purchase_ID: number;
}

export interface Membership {
  Membership_ID: number;
  Customer_ID: number;
  Price: number;
  Start_Date: string;
  End_Date: string;
  Membership_Status: boolean;
  Purchase_ID: number | null;
}

export interface VetVisit {
  Visit_ID: number;
  Animal_ID: number;
  Employee_ID: number;
  Visit_Date: string;
  Diagnosis: string;
  Treatment: string;
  Animal?: Animal; // Joined data
}

export interface AnimalCareLog {
  Log_ID: number;
  Animal_ID: number;
  Employee_ID: number;
  Log_Date: string;
  Activity: string;
  Notes: string;
  Animal?: Animal; // Joined data
}

export interface FeedingSchedule {
  Feeding_ID: number;
  Animal_ID: number;
  Food: string;
  Feeding_Time: string;
  Amount: number;
}

export interface Attraction {
  Attraction_ID: number;
  Name: string;
  Description: string;
  Capacity: number;
  Location_ID: number;
}

export interface Schedule {
  Schedule_ID: number;
  Day_of_Week: string;
  Start_Time: string;
  End_Time: string;
}

// Current user state
export let currentUser: (Employee | Customer) | null = null;
export let currentUserType: 'employee' | 'customer' | null = null;

export const setCurrentUser = (user: (Employee | Customer) | null, type: 'employee' | 'customer' | null) => {
  currentUser = user;
  currentUserType = type;
};

// Job Titles
export const jobTitles: JobTitle[] = [
  { Job_ID: 1, Title: 'Administrator', Description: 'Full system access and management' },
  { Job_ID: 2, Title: 'Veterinarian', Description: 'Animal health and medical care' },
  { Job_ID: 3, Title: 'Zookeeper', Description: 'Animal care and habitat management' },
  { Job_ID: 4, Title: 'Gift Shop Worker', Description: 'Retail operations and inventory' },
  { Job_ID: 5, Title: 'Concession Worker', Description: 'Food service operations' }
];

// Login Accounts - Only 5 role-based accounts (all staff of same type share credentials)
export const loginAccounts: Employee[] = [
  {
    Employee_ID: 1,
    First_Name: 'Admin',
    Last_Name: 'Account',
    Birthdate: '1980-01-01',
    Sex: 'M',
    Job_ID: 1,
    Salary: 85000,
    Email: 'admin@wildwoodzoo.com',
    Password: 'admin123',
    Address: 'Wildwood Zoo Administration',
    Supervisor_ID: null,
    Job_Title: jobTitles[0]
  },
  {
    Employee_ID: 2,
    First_Name: 'Veterinarian',
    Last_Name: 'Account',
    Birthdate: '1985-01-01',
    Sex: 'F',
    Job_ID: 2,
    Salary: 72000,
    Email: 'vet@wildwoodzoo.com',
    Password: 'vet123',
    Address: 'Wildwood Zoo Veterinary',
    Supervisor_ID: 1,
    Job_Title: jobTitles[1]
  },
  {
    Employee_ID: 3,
    First_Name: 'Zookeeper',
    Last_Name: 'Account',
    Birthdate: '1990-01-01',
    Sex: 'M',
    Job_ID: 3,
    Salary: 45000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: 'Wildwood Zoo Animal Care',
    Supervisor_ID: 1,
    Job_Title: jobTitles[2]
  },
  {
    Employee_ID: 4,
    First_Name: 'Gift Shop',
    Last_Name: 'Account',
    Birthdate: '1992-01-01',
    Sex: 'F',
    Job_ID: 4,
    Salary: 35000,
    Email: 'shop@wildwoodzoo.com',
    Password: 'shop123',
    Address: 'Wildwood Zoo Gift Shop',
    Supervisor_ID: 1,
    Job_Title: jobTitles[3]
  },
  {
    Employee_ID: 5,
    First_Name: 'Concession',
    Last_Name: 'Account',
    Birthdate: '1988-01-01',
    Sex: 'M',
    Job_ID: 5,
    Salary: 32000,
    Email: 'food@wildwoodzoo.com',
    Password: 'food123',
    Address: 'Wildwood Zoo Concessions',
    Supervisor_ID: 1,
    Job_Title: jobTitles[4]
  }
];

// Individual Employee Records (for database/admin tracking only, NOT for login)
// These represent actual staff members who use the shared login accounts above
// TOTAL: 8 employees (4 Zone Supervisors + 1 Vet + 1 Zookeeper + 1 Gift Shop Worker + 1 Concession Worker)
export const employeeRecords: Employee[] = [
  // Veterinarian (1 total)
  {
    Employee_ID: 101,
    First_Name: 'Sarah',
    Last_Name: 'Thompson',
    Birthdate: '1985-03-22',
    Sex: 'F',
    Job_ID: 2,
    Salary: 72000,
    Email: 'vet@wildwoodzoo.com',
    Password: 'vet123',
    Address: '456 Medical Ave, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[1]
  },
  // Zone Supervisors (4 total - Zookeepers with zone management responsibilities)
  {
    Employee_ID: 200,
    First_Name: 'Marcus',
    Last_Name: 'Williams',
    Birthdate: '1978-04-15',
    Sex: 'M',
    Job_ID: 3,
    Salary: 68000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: '100 Zone A Blvd, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[2]
  },
  {
    Employee_ID: 201,
    First_Name: 'Rachel',
    Last_Name: 'Anderson',
    Birthdate: '1980-08-22',
    Sex: 'F',
    Job_ID: 3,
    Salary: 68000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: '200 Zone B Way, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[2]
  },
  {
    Employee_ID: 202,
    First_Name: 'James',
    Last_Name: 'Chen',
    Birthdate: '1982-11-10',
    Sex: 'M',
    Job_ID: 3,
    Salary: 68000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: '300 Zone C Ave, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[2]
  },
  {
    Employee_ID: 203,
    First_Name: 'Linda',
    Last_Name: 'Garcia',
    Birthdate: '1979-06-18',
    Sex: 'F',
    Job_ID: 3,
    Salary: 68000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: '400 Zone D Dr, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[2]
  },
  // Regular Zookeeper (1 total)
  {
    Employee_ID: 204,
    First_Name: 'Alex',
    Last_Name: 'Brown',
    Birthdate: '1991-04-12',
    Sex: 'M',
    Job_ID: 3,
    Salary: 44000,
    Email: 'keeper@wildwoodzoo.com',
    Password: 'keeper123',
    Address: '111 Safari Lane, Zoo City, ZC 12345',
    Supervisor_ID: 200,
    Job_Title: jobTitles[2]
  },
  // Gift Shop Worker (1 total)
  {
    Employee_ID: 300,
    First_Name: 'Emily',
    Last_Name: 'Davis',
    Birthdate: '1992-11-05',
    Sex: 'F',
    Job_ID: 4,
    Salary: 35000,
    Email: 'shop@wildwoodzoo.com',
    Password: 'shop123',
    Address: '321 Retail Blvd, Zoo City, ZC 12345',
    Supervisor_ID: null,
    Job_Title: jobTitles[3]
  },
  // Concession Worker (1 total)
  {
    Employee_ID: 400,
    First_Name: 'Carlos',
    Last_Name: 'Martinez',
    Birthdate: '1988-09-18',
    Sex: 'M',
    Job_ID: 5,
    Salary: 32000,
    Email: 'food@wildwoodzoo.com',
    Password: 'food123',
    Address: '654 Food Court, Zoo City, ZC 12345',
    Supervisor_ID: 200,
    Job_Title: jobTitles[4]
  }
];

// Merge login accounts and employee records for compatibility
export const employees = employeeRecords;

// Sample Customer for login
export const customers: Customer[] = [
  {
    Customer_ID: 1,
    First_Name: 'John',
    Last_Name: 'Customer',
    Email: 'customer@wildwoodzoo.com',
    Customer_Password: 'customer123',
    Phone: '555-0101'
  }
];

// Locations
export const locations: Location[] = [
  { Location_ID: 1, Zone: 'A', Description: 'African Savanna Area', Supervisor_ID: 200, Supervisor_Start_Date: '2025-01-01' },
  { Location_ID: 2, Zone: 'B', Description: 'North American Forest', Supervisor_ID: 201, Supervisor_Start_Date: '2025-02-01' },
  { Location_ID: 3, Zone: 'C', Description: 'Aquatic Center', Supervisor_ID: 202, Supervisor_Start_Date: '2025-03-01' },
  { Location_ID: 4, Zone: 'D', Description: 'Antarctic Adventure', Supervisor_ID: 203, Supervisor_Start_Date: '2025-04-01' }
];

// Enclosures (8 habitats matching home page attractions)
export const enclosures: Enclosure[] = [
  { Enclosure_ID: 1, Name: 'African Savanna', Location_ID: 1, Size: 5000, Type: 'Outdoor' },
  { Enclosure_ID: 2, Name: 'Big Cat Territory', Location_ID: 1, Size: 3000, Type: 'Indoor/Outdoor' },
  { Enclosure_ID: 3, Name: 'Primate Forest', Location_ID: 2, Size: 2500, Type: 'Outdoor' },
  { Enclosure_ID: 4, Name: 'Reptile House', Location_ID: 2, Size: 1800, Type: 'Indoor' },
  { Enclosure_ID: 5, Name: 'Australian Outback', Location_ID: 3, Size: 4000, Type: 'Outdoor' },
  { Enclosure_ID: 6, Name: 'Tropical Rainforest', Location_ID: 3, Size: 3200, Type: 'Climate Controlled' },
  { Enclosure_ID: 7, Name: 'Bird Sanctuary', Location_ID: 4, Size: 2800, Type: 'Outdoor' },
  { Enclosure_ID: 8, Name: 'North American Wilderness', Location_ID: 4, Size: 3500, Type: 'Outdoor' }
];

// Animals
export const animals: Animal[] = [
  // Enclosure 1 - African Savanna (6 animals)
  { Animal_ID: 1, Name: 'Luna', Species: 'African Elephant', Gender: 'F', Height: 11.5, Birthdate: '2018-05-12', Enclosure_ID: 1, Enclosure: enclosures[0] },
  { Animal_ID: 9, Name: 'Trunks', Species: 'African Elephant', Gender: 'M', Height: 12.0, Birthdate: '2015-08-20', Enclosure_ID: 1, Enclosure: enclosures[0] },
  { Animal_ID: 10, Name: 'Ella', Species: 'African Elephant', Gender: 'F', Height: 10.8, Birthdate: '2020-03-15', Enclosure_ID: 1, Enclosure: enclosures[0] },
  { Animal_ID: 11, Name: 'Stripe', Species: 'Zebra', Gender: 'M', Height: 4.5, Birthdate: '2019-07-22', Enclosure_ID: 1, Enclosure: enclosures[0] },
  { Animal_ID: 12, Name: 'Dash', Species: 'Zebra', Gender: 'F', Height: 4.3, Birthdate: '2021-04-10', Enclosure_ID: 1, Enclosure: enclosures[0] },
  { Animal_ID: 37, Name: 'Speedy', Species: 'Ostrich', Gender: 'M', Height: 7.5, Birthdate: '2022-02-18', Enclosure_ID: 1, Enclosure: enclosures[0] },
  
  // Enclosure 2 - Big Cat Territory (5 animals)
  { Animal_ID: 2, Name: 'Atlas', Species: 'Bengal Tiger', Gender: 'M', Height: 3.5, Birthdate: '2017-09-05', Enclosure_ID: 2, Enclosure: enclosures[1] },
  { Animal_ID: 7, Name: 'Simba', Species: 'African Lion', Gender: 'M', Height: 4.0, Birthdate: '2016-11-12', Enclosure_ID: 2, Enclosure: enclosures[1] },
  { Animal_ID: 8, Name: 'Nala', Species: 'African Lion', Gender: 'F', Height: 3.5, Birthdate: '2017-01-25', Enclosure_ID: 2, Enclosure: enclosures[1] },
  { Animal_ID: 15, Name: 'Raja', Species: 'Bengal Tiger', Gender: 'F', Height: 3.2, Birthdate: '2019-06-08', Enclosure_ID: 2, Enclosure: enclosures[1] },
  { Animal_ID: 16, Name: 'Stripes', Species: 'Bengal Tiger', Gender: 'M', Height: 3.6, Birthdate: '2018-12-14', Enclosure_ID: 2, Enclosure: enclosures[1] },
  
  // Enclosure 3 - Primate Forest (4 animals)
  { Animal_ID: 27, Name: 'Coco', Species: 'Capuchin Monkey', Gender: 'F', Height: 1.5, Birthdate: '2021-05-10', Enclosure_ID: 3, Enclosure: enclosures[2] },
  { Animal_ID: 28, Name: 'George', Species: 'Gorilla', Gender: 'M', Height: 5.5, Birthdate: '2012-08-14', Enclosure_ID: 3, Enclosure: enclosures[2] },
  { Animal_ID: 32, Name: 'Charlie', Species: 'Chimpanzee', Gender: 'M', Height: 4.0, Birthdate: '2015-11-22', Enclosure_ID: 3, Enclosure: enclosures[2] },
  { Animal_ID: 33, Name: 'Mia', Species: 'Chimpanzee', Gender: 'F', Height: 3.8, Birthdate: '2017-04-10', Enclosure_ID: 3, Enclosure: enclosures[2] },
  
  // Enclosure 4 - Reptile House (5 animals)
  { Animal_ID: 31, Name: 'Cleo', Species: 'Python', Gender: 'F', Height: 0.5, Birthdate: '2020-08-30', Enclosure_ID: 4, Enclosure: enclosures[3] },
  { Animal_ID: 34, Name: 'Rex', Species: 'Nile Crocodile', Gender: 'M', Height: 1.5, Birthdate: '2010-06-15', Enclosure_ID: 4, Enclosure: enclosures[3] },
  { Animal_ID: 35, Name: 'Ziggy', Species: 'Green Iguana', Gender: 'M', Height: 0.5, Birthdate: '2019-03-25', Enclosure_ID: 4, Enclosure: enclosures[3] },
  { Animal_ID: 36, Name: 'Spike', Species: 'Bearded Dragon', Gender: 'M', Height: 0.3, Birthdate: '2021-07-12', Enclosure_ID: 4, Enclosure: enclosures[3] },
  { Animal_ID: 65, Name: 'Slider', Species: 'Sea Turtle', Gender: 'M', Height: 2.5, Birthdate: '2010-04-15', Enclosure_ID: 4, Enclosure: enclosures[3] },
  
  // Enclosure 5 - Australian Outback (5 animals)
  { Animal_ID: 38, Name: 'Joey', Species: 'Kangaroo', Gender: 'M', Height: 5.0, Birthdate: '2019-01-20', Enclosure_ID: 5, Enclosure: enclosures[4] },
  { Animal_ID: 39, Name: 'Sheila', Species: 'Kangaroo', Gender: 'F', Height: 4.5, Birthdate: '2020-05-15', Enclosure_ID: 5, Enclosure: enclosures[4] },
  { Animal_ID: 40, Name: 'Matilda', Species: 'Koala', Gender: 'F', Height: 2.5, Birthdate: '2018-09-10', Enclosure_ID: 5, Enclosure: enclosures[4] },
  { Animal_ID: 48, Name: 'Boomer', Species: 'Wallaby', Gender: 'M', Height: 3.5, Birthdate: '2020-11-05', Enclosure_ID: 5, Enclosure: enclosures[4] },
  { Animal_ID: 49, Name: 'Skippy', Species: 'Wallaby', Gender: 'F', Height: 3.2, Birthdate: '2021-06-20', Enclosure_ID: 5, Enclosure: enclosures[4] },
  
  // Enclosure 6 - Tropical Rainforest (6 animals)
  { Animal_ID: 3, Name: 'Splash', Species: 'Sloth', Gender: 'M', Height: 2.0, Birthdate: '2019-03-17', Enclosure_ID: 6, Enclosure: enclosures[5] },
  { Animal_ID: 50, Name: 'Rio', Species: 'Macaw', Gender: 'M', Height: 2.5, Birthdate: '2018-07-22', Enclosure_ID: 6, Enclosure: enclosures[5] },
  { Animal_ID: 51, Name: 'Carmen', Species: 'Toucan', Gender: 'F', Height: 1.8, Birthdate: '2020-02-14', Enclosure_ID: 6, Enclosure: enclosures[5] },
  { Animal_ID: 52, Name: 'Kermit', Species: 'Poison Dart Frog', Gender: 'M', Height: 0.1, Birthdate: '2021-09-05', Enclosure_ID: 6, Enclosure: enclosures[5] },
  { Animal_ID: 53, Name: 'Mango', Species: 'Tree Frog', Gender: 'F', Height: 0.2, Birthdate: '2022-01-10', Enclosure_ID: 6, Enclosure: enclosures[5] },
  { Animal_ID: 54, Name: 'Samba', Species: 'Spider Monkey', Gender: 'F', Height: 3.0, Birthdate: '2017-12-18', Enclosure_ID: 6, Enclosure: enclosures[5] },
  
  // Enclosure 7 - Bird Sanctuary (6 animals)
  { Animal_ID: 55, Name: 'Pinky', Species: 'Flamingo', Gender: 'F', Height: 4.5, Birthdate: '2016-04-12', Enclosure_ID: 7, Enclosure: enclosures[6] },
  { Animal_ID: 56, Name: 'Coral', Species: 'Flamingo', Gender: 'F', Height: 4.3, Birthdate: '2017-06-08', Enclosure_ID: 7, Enclosure: enclosures[6] },
  { Animal_ID: 57, Name: 'Phoenix', Species: 'Flamingo', Gender: 'M', Height: 4.7, Birthdate: '2015-09-20', Enclosure_ID: 7, Enclosure: enclosures[6] },
  { Animal_ID: 58, Name: 'Eagle Eye', Species: 'Bald Eagle', Gender: 'M', Height: 3.0, Birthdate: '2014-11-15', Enclosure_ID: 7, Enclosure: enclosures[6] },
  { Animal_ID: 59, Name: 'Sky', Species: 'Bald Eagle', Gender: 'F', Height: 2.8, Birthdate: '2016-03-25', Enclosure_ID: 7, Enclosure: enclosures[6] },
  { Animal_ID: 60, Name: 'Kiwi', Species: 'Parrot', Gender: 'M', Height: 1.2, Birthdate: '2019-08-10', Enclosure_ID: 7, Enclosure: enclosures[6] },
  
  // Enclosure 8 - North American Wilderness (7 animals)
  { Animal_ID: 6, Name: 'Koda', Species: 'Grizzly Bear', Gender: 'M', Height: 7.5, Birthdate: '2016-04-22', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 23, Name: 'Bruno', Species: 'Grizzly Bear', Gender: 'M', Height: 8.0, Birthdate: '2014-10-15', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 24, Name: 'Honey', Species: 'Grizzly Bear', Gender: 'F', Height: 6.8, Birthdate: '2017-06-30', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 61, Name: 'Wolfie', Species: 'Gray Wolf', Gender: 'M', Height: 3.0, Birthdate: '2018-01-15', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 62, Name: 'Luna', Species: 'Gray Wolf', Gender: 'F', Height: 2.8, Birthdate: '2019-05-20', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 63, Name: 'Moose', Species: 'Elk', Gender: 'M', Height: 6.0, Birthdate: '2015-10-10', Enclosure_ID: 8, Enclosure: enclosures[7] },
  { Animal_ID: 64, Name: 'Daisy', Species: 'Elk', Gender: 'F', Height: 5.5, Birthdate: '2017-07-25', Enclosure_ID: 8, Enclosure: enclosures[7] }
];

// Gift Shops
export const giftShops: GiftShop[] = [
  { Shop_ID: 1, Name: 'Main Gift Shop', Location_ID: 6 }
];

// Gift Shop Items
export const items: Item[] = [
  { Item_ID: 1, Item_Name: 'Plush Elephant', Price: 24.99, Shop_ID: 1, Category: 'Toys & Plushies' } as any,
  { Item_ID: 2, Item_Name: 'Zoo T-Shirt', Price: 19.99, Shop_ID: 1, Category: 'Apparel' } as any,
  { Item_ID: 3, Item_Name: 'Animal Encyclopedia', Price: 29.99, Shop_ID: 1, Category: 'Decorations & Others' } as any,
  { Item_ID: 4, Item_Name: 'Reusable Water Bottle', Price: 14.99, Shop_ID: 1, Category: 'Accessories & Souvenirs' } as any,
  { Item_ID: 5, Item_Name: 'Safari Hat', Price: 16.99, Shop_ID: 1, Category: 'Apparel' } as any,
  { Item_ID: 6, Item_Name: 'Plush Tiger', Price: 22.99, Shop_ID: 1, Category: 'Toys & Plushies' } as any,
  { Item_ID: 7, Item_Name: 'Binoculars', Price: 34.99, Shop_ID: 1, Category: 'Accessories & Souvenirs' } as any,
  { Item_ID: 8, Item_Name: 'Animal Sticker Collection', Price: 5.99, Shop_ID: 1, Category: 'Accessories & Souvenirs' } as any
];

// Concession Stands
export const concessionStands: ConcessionStand[] = [
  { Stand_ID: 1, Stand_Name: 'Safari Grill', Stand_Type: 'Restaurant', Location_ID: 1 },
  { Stand_ID: 2, Stand_Name: 'Polar Cafe', Stand_Type: 'Ice Cream', Location_ID: 4 },
  { Stand_ID: 3, Stand_Name: 'Rainforest Refreshments', Stand_Type: 'Beverage', Location_ID: 3 },
  { Stand_ID: 4, Stand_Name: 'Desert Diner', Stand_Type: 'Cafe', Location_ID: 2 }
];

// Concession Items
export const concessionItems: ConcessionItem[] = [
  // Safari Grill - 5 items
  { Concession_Item_ID: 1, Stand_ID: 1, Item_Name: 'Classic Cheeseburger', Price: 12.99, Category: 'Burgers & Grilled Items' } as any,
  { Concession_Item_ID: 2, Stand_ID: 1, Item_Name: 'BBQ Pulled Pork Sandwich', Price: 13.99, Category: 'Burgers & Grilled Items' } as any,
  { Concession_Item_ID: 3, Stand_ID: 1, Item_Name: 'Grilled Chicken Wrap', Price: 11.99, Category: 'Burgers & Grilled Items' } as any,
  { Concession_Item_ID: 4, Stand_ID: 1, Item_Name: 'French Fries', Price: 4.99, Category: 'Burgers & Grilled Items' } as any,
  { Concession_Item_ID: 5, Stand_ID: 1, Item_Name: 'Chicken Tenders', Price: 9.99, Category: 'Burgers & Grilled Items' } as any,
  
  // Polar Cafe - 5 items (renamed from Polar Parlor)
  { Concession_Item_ID: 6, Stand_ID: 2, Item_Name: 'Vanilla Ice Cream Cone', Price: 5.99, Category: 'Ice Cream & Desserts' } as any,
  { Concession_Item_ID: 7, Stand_ID: 2, Item_Name: 'Chocolate Sundae', Price: 7.99, Category: 'Ice Cream & Desserts' } as any,
  { Concession_Item_ID: 8, Stand_ID: 2, Item_Name: 'Fruit Smoothie', Price: 6.99, Category: 'Ice Cream & Desserts' } as any,
  { Concession_Item_ID: 9, Stand_ID: 2, Item_Name: 'Frozen Lemonade', Price: 4.99, Category: 'Ice Cream & Desserts' } as any,
  { Concession_Item_ID: 10, Stand_ID: 2, Item_Name: 'Milkshake', Price: 6.99, Category: 'Ice Cream & Desserts' } as any,
  
  // Rainforest Refreshments - 5 items (renamed from Tropical Refreshments)
  { Concession_Item_ID: 11, Stand_ID: 3, Item_Name: 'Tropical Fruit Bowl', Price: 8.99, Category: 'Fresh & Healthy Options' } as any,
  { Concession_Item_ID: 12, Stand_ID: 3, Item_Name: 'Acai Bowl', Price: 10.99, Category: 'Fresh & Healthy Options' } as any,
  { Concession_Item_ID: 13, Stand_ID: 3, Item_Name: 'Fresh Squeezed Juice', Price: 5.99, Category: 'Fresh & Healthy Options' } as any,
  { Concession_Item_ID: 14, Stand_ID: 3, Item_Name: 'Green Smoothie', Price: 7.99, Category: 'Fresh & Healthy Options' } as any,
  { Concession_Item_ID: 15, Stand_ID: 3, Item_Name: 'Yogurt Parfait', Price: 6.99, Category: 'Fresh & Healthy Options' } as any,
  
  // Desert Diner - 5 items (renamed from Jungle Cafe)
  { Concession_Item_ID: 16, Stand_ID: 4, Item_Name: 'Cheese Pizza Slice', Price: 6.99, Category: 'Pizza & Italian' } as any,
  { Concession_Item_ID: 17, Stand_ID: 4, Item_Name: 'Pepperoni Pizza Slice', Price: 7.99, Category: 'Pizza & Italian' } as any,
  { Concession_Item_ID: 18, Stand_ID: 4, Item_Name: 'Spaghetti & Meatballs', Price: 12.99, Category: 'Pizza & Italian' } as any,
  { Concession_Item_ID: 19, Stand_ID: 4, Item_Name: 'Garlic Bread', Price: 4.99, Category: 'Pizza & Italian' } as any,
  { Concession_Item_ID: 20, Stand_ID: 4, Item_Name: 'Italian Sub', Price: 10.99, Category: 'Pizza & Italian' } as any
];

// Attractions
export const attractions: Attraction[] = [
  { Attraction_ID: 1, Name: 'African Savanna Tour', Description: 'Guided tour of African wildlife', Capacity: 50, Location_ID: 1 },
  { Attraction_ID: 2, Name: 'Predator Pavilion', Description: 'View big cats up close', Capacity: 100, Location_ID: 1 },
  { Attraction_ID: 3, Name: 'Sea Lion Show', Description: 'Amazing sea lion performances', Capacity: 150, Location_ID: 3 },
  { Attraction_ID: 4, Name: 'Penguin Encounter', Description: 'Meet our penguin colony', Capacity: 75, Location_ID: 4 },
  { Attraction_ID: 5, Name: 'Petting Zoo', Description: 'Interactive farm animals', Capacity: 30, Location_ID: 6 }
];

// Vet Visits
export const vetVisits: VetVisit[] = [
  {
    Visit_ID: 1,
    Animal_ID: 1,
    Employee_ID: 2,
    Visit_Date: '2025-10-12 09:00:00',
    Diagnosis: 'Routine checkup - healthy',
    Treatment: 'Vitamin supplement administered',
    Animal: animals[0]
  },
  {
    Visit_ID: 2,
    Animal_ID: 2,
    Employee_ID: 2,
    Visit_Date: '2025-10-10 14:00:00',
    Diagnosis: 'Dental examination',
    Treatment: 'Dental cleaning performed under sedation',
    Animal: animals[1]
  },
  {
    Visit_ID: 3,
    Animal_ID: 3,
    Employee_ID: 2,
    Visit_Date: '2025-10-08 10:30:00',
    Diagnosis: 'Preventative care',
    Treatment: 'B12 injection',
    Animal: animals[2]
  }
];

// Animal Care Logs
export const animalCareLogs: AnimalCareLog[] = [
  {
    Log_ID: 1,
    Animal_ID: 4,
    Employee_ID: 3,
    Log_Date: '2025-10-14 08:00:00',
    Activity: 'Morning Feeding',
    Notes: 'Fed 35 lbs of hay and fresh vegetables. Good appetite.',
    Animal: animals[3]
  },
  {
    Log_ID: 2,
    Animal_ID: 6,
    Employee_ID: 7,
    Log_Date: '2025-10-13 11:00:00',
    Activity: 'Enclosure Enrichment',
    Notes: 'Added new climbing structure. Bear showed immediate interest.',
    Animal: animals[5]
  },
  {
    Log_ID: 3,
    Animal_ID: 5,
    Employee_ID: 3,
    Log_Date: '2025-10-13 15:00:00',
    Activity: 'Pool Maintenance',
    Notes: 'Cleaned and refilled pool. Temperature adjusted to 35°F.',
    Animal: animals[4]
  }
];

// Feeding Schedule
export const feedingSchedules: FeedingSchedule[] = [
  { Feeding_ID: 1, Animal_ID: 3, Food: 'Fresh Fish', Feeding_Time: '2025-10-14 09:00:00', Amount: 15 },
  { Feeding_ID: 2, Animal_ID: 1, Food: 'Hay and Vegetables', Feeding_Time: '2025-10-14 11:30:00', Amount: 200 },
  { Feeding_ID: 3, Animal_ID: 2, Food: 'Raw Meat', Feeding_Time: '2025-10-14 13:00:00', Amount: 25 },
  { Feeding_ID: 4, Animal_ID: 5, Food: 'Fish', Feeding_Time: '2025-10-14 15:30:00', Amount: 10 },
  { Feeding_ID: 5, Animal_ID: 4, Food: 'Leaves and Hay', Feeding_Time: '2025-10-14 16:45:00', Amount: 40 }
];

// Memberships
export const memberships: Membership[] = [
  {
    Membership_ID: 1,
    Customer_ID: 1,
    Price: 149.99,
    Start_Date: '2025-01-01',
    End_Date: '2025-12-31',
    Membership_Status: true,
    Purchase_ID: 1
  }
];

// Purchases
export const purchases: Purchase[] = [
  {
    Purchase_ID: 1,
    Total_Amount: 149.99,
    Payment_Method: 'Card',
    Purchase_Date: '2025-01-01 10:00:00',
    Customer_ID: 1,
    Membership_ID: 1
  },
  {
    Purchase_ID: 2,
    Total_Amount: 89.95,
    Payment_Method: 'Card',
    Purchase_Date: '2025-09-15 14:30:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 3,
    Total_Amount: 54.97,
    Payment_Method: 'Cash',
    Purchase_Date: '2025-08-22 11:00:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 4,
    Total_Amount: 124.50,
    Payment_Method: 'Card',
    Purchase_Date: '2025-07-10 16:45:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 5,
    Total_Amount: 34.99,
    Payment_Method: 'Card',
    Purchase_Date: '2025-06-05 13:20:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 6,
    Total_Amount: 67.45,
    Payment_Method: 'Cash',
    Purchase_Date: '2025-05-18 10:30:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 7,
    Total_Amount: 98.75,
    Payment_Method: 'Card',
    Purchase_Date: '2025-04-12 15:00:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 8,
    Total_Amount: 45.20,
    Payment_Method: 'Card',
    Purchase_Date: '2025-03-25 12:15:00',
    Customer_ID: 1,
    Membership_ID: null
  },
  {
    Purchase_ID: 9,
    Total_Amount: 156.80,
    Payment_Method: 'Card',
    Purchase_Date: '2025-02-14 14:00:00',
    Customer_ID: 1,
    Membership_ID: null
  }
];

// Tickets
export const tickets: Ticket[] = [
  { Ticket_ID: 1, Ticket_Type: 'Adult', Price: 29.99, Valid_Date: '2025-10-15', Is_Used: false, Purchase_ID: 2 },
  { Ticket_ID: 2, Ticket_Type: 'Adult', Price: 29.99, Valid_Date: '2025-10-15', Is_Used: false, Purchase_ID: 2 },
  { Ticket_ID: 3, Ticket_Type: 'Child', Price: 14.99, Valid_Date: '2025-10-20', Is_Used: false, Purchase_ID: 3 },
  { Ticket_ID: 4, Ticket_Type: 'Child', Price: 14.99, Valid_Date: '2025-10-18', Is_Used: false, Purchase_ID: 2 },
  { Ticket_ID: 5, Ticket_Type: 'Senior', Price: 24.99, Valid_Date: '2025-10-16', Is_Used: false, Purchase_ID: 2 },
  { Ticket_ID: 6, Ticket_Type: 'Student', Price: 19.99, Valid_Date: '2025-10-17', Is_Used: false, Purchase_ID: 3 },
  { Ticket_ID: 7, Ticket_Type: 'Student', Price: 19.99, Valid_Date: '2025-10-19', Is_Used: false, Purchase_ID: 3 },
  { Ticket_ID: 8, Ticket_Type: 'Adult', Price: 29.99, Valid_Date: '2025-10-21', Is_Used: true, Purchase_ID: 1 },
  { Ticket_ID: 9, Ticket_Type: 'Senior', Price: 24.99, Valid_Date: '2025-10-14', Is_Used: true, Purchase_ID: 1 }
];

// Purchase Items (junction table linking purchases to gift shop items)
export const purchaseItems: PurchaseItem[] = [
  { Purchase_ID: 4, Item_ID: 1, Quantity: 2 }, // 2x Plush Elephant
  { Purchase_ID: 4, Item_ID: 2, Quantity: 3 }, // 3x Zoo T-Shirt
  { Purchase_ID: 4, Item_ID: 4, Quantity: 1 }, // 1x Water Bottle
  { Purchase_ID: 5, Item_ID: 5, Quantity: 2 }, // 2x Safari Hat
  { Purchase_ID: 6, Item_ID: 3, Quantity: 1 }, // 1x Animal Encyclopedia
  { Purchase_ID: 6, Item_ID: 6, Quantity: 1 }, // 1x Plush Tiger
  { Purchase_ID: 6, Item_ID: 4, Quantity: 1 }, // 1x Water Bottle
  { Purchase_ID: 7, Item_ID: 7, Quantity: 2 }, // 2x Binoculars
  { Purchase_ID: 7, Item_ID: 2, Quantity: 1 }, // 1x Zoo T-Shirt
  { Purchase_ID: 8, Item_ID: 1, Quantity: 1 }, // 1x Plush Elephant
  { Purchase_ID: 8, Item_ID: 5, Quantity: 1 }, // 1x Safari Hat
  { Purchase_ID: 9, Item_ID: 3, Quantity: 2 }, // 2x Animal Encyclopedia
  { Purchase_ID: 9, Item_ID: 1, Quantity: 2 }, // 2x Plush Elephant
  { Purchase_ID: 9, Item_ID: 6, Quantity: 1 }  // 1x Plush Tiger
];

// Helper function to get employee job title
export const getEmployeeRole = (employee: Employee): string => {
  return employee.Job_Title?.Title || 'Employee';
};

// Helper function to check if employee is admin
export const isAdmin = (employee: Employee): boolean => {
  return employee.Job_Title?.Title === 'Administrator';
};

// Helper function to get customer membership
export const getCustomerMembership = (customerId: number): Membership | null => {
  return memberships.find(m => m.Customer_ID === customerId && m.Membership_Status) || null;
};

// Animal Management Functions
export const addAnimal = (animal: Omit<Animal, 'Animal_ID'>) => {
  const newId = Math.max(...animals.map(a => a.Animal_ID), 0) + 1;
  const enclosure = enclosures.find(e => e.Enclosure_ID === animal.Enclosure_ID);
  const newAnimal: Animal = {
    ...animal,
    Animal_ID: newId,
    Enclosure: enclosure
  };
  animals.push(newAnimal);
  return newAnimal;
};

export const removeAnimal = (animalId: number) => {
  const index = animals.findIndex(a => a.Animal_ID === animalId);
  if (index !== -1) {
    animals.splice(index, 1);
    return true;
  }
  return false;
};

export const getAnimals = () => animals;