import dotenv from "dotenv";
dotenv.config();

export const mode = process.env.HS_NODE_ENV || "development";
export const development = {
  database: {
    db_name: process.env.HS_DB_NAME,
    host: process.env.HS_DB_HOST,
    username: process.env.HS_DB_USERNAME,
    password: process.env.HS_DB_PASSWORD,
  },
  server: {
    port: process.env.HS_PORT,
  },
};
export const defaultuser = {
  admin: {
    name: "murali",
    email: "murali@nutzindia.com",
    password: "b6a9f58a55b54fc1960e03bfe3618c3a",
    role: "super_admin",
  },
  subscription: {
    plan_name: "basic",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit",
    duration: "3",
    adminid: "1",
  },
  player: {
    name: "murali",
    userid: "murali",
    email: "murali@gmail.com",
    phone: "+911234567889",
    dob: "30-11-1997",
    gender: "male",
    photo: "murali",
    favsports: "cricket",
    address: "erode",
    password: "a1879e7971098430f0a595f3b014aa24",
    active: true,
  },
  stadiumOwner: {
    name: "murali",
    userid: "murali123",
    email: "murali@gmail.com",
    phone: "123456789",
    dob: "20-08-2021",
    gender: "male",
    photo: "murali",
    address: "erode",
    password: "a1879e7971098430f0a595f3b014aa24",
    aadhaarno: "12345678900",
    aadhaar_fpht: "link",
    aadhaar_bpht: "link",
    aadhaar_selfie: "link",
    bank_accno: "2718",
    ifsc_code: "nutz0001",
    branch: "erode",
  },
  stadium: {
    owner: "1",
    name: "cricket turf",
    location: "erode",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia",
    courts: [
      {
        court_name: "cricket turf",
        playable_game: "cricket",
        duration: "30",
        player_capacity: "10",
        price: "1000",
      },
      {
        court_name: "football turf",
        playable_game: "cricket",
        duration: "30",
        player_capacity: "10",
        price: "1000",
      },
    ],
    facility:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    offc_doc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    address:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    cancel_policy:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia",
    active: true,
  },

  eventOrganizer: {
    name: "david",
    userid: "event_organizer_1",
    email: "muralicse97@gmail.com",
    phone: "+911234567890",
    dob: "11/11/2011",
    photo: "link",
    address: "Erode",
    club_name: "Nutz Club",
    club_addr: "erode",
    club_posting: "managing director",
    aadhaarno: "1234567890",
    bank_acc_no: "123456890",
    ifsc_code: "123456789",
    branch: "erode",
    password: "a1879e7971098430f0a595f3b014aa24",
    active: true,
  },
};

export const production = {
  database: {
    db_name: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
  },
  server: {
    port: process.env.PROD_PORT,
  },
};
