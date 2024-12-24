import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = `

type User {
  id: Int!
  name: String!
  email: String
  phone: String
  addresses: [Address!]!
  orders: [Order!]!
  reviews: [Review!]!
  pushToken: String
  profileImage: String
  isVerified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Address {
  id: Int!
  location: Location!
  locationId: Int!
  deliveryAddress: String
  details: String
  label: String
  type: String
  user: User!
  userId: Int!
  order: Order
  orderId: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Location {
  id: Int!
  latitude: Float!
  longitude: Float!
  address: String
  city: String
  state: String
  addresses: [Address!]!
  restaurants: [Restaurant!]!
  zones: [Zone!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Order {
  id: Int!
  deliveryAddress: Address
  deliveryCharges: Float!
  orderAmount: Float!
  paidAmount: Float!
  paymentMethod: String!
  user: User!
  userId: Int!
  items: [OrderItem!]!
  reason: String
  status: String!
  paymentStatus: String!
  orderStatus: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  review: Review
  rider: Rider
  riderId: Int
  restaurant: Restaurant!
  restaurantId: Int!
  zone: Zone
  zoneId: Int
  isPickedUp: Boolean!
  tipping: Float
  taxationAmount: Float
  deliveryTime: DateTime
  estimatedDeliveryTime: DateTime
  acceptedAt: DateTime
  deliveredAt: DateTime
  cancelledAt: DateTime
  preparationTime: DateTime
  cancellationReason: String
}

type OrderItem {
  id: Int!
  food: Food!
  foodId: Int!
  variation: Variation!
  variationId: Int!
  addons: [Addon!]!
  specialInstructions: String
  quantity: Int!
  order: Order!
  orderId: Int!
  title: String
  description: String
  image: String
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Food {
  id: Int!
  title: String!
  description: String
  image: String
  variations: [Variation!]!
  orderItems: [OrderItem!]!
  category: Category
  categoryId: Int
  isActive: Boolean!
  sku: String
  ingredients: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Variation {
  id: Int!
  title: String
  price: Float!
  discounted: Boolean!
  food: Food!
  foodId: Int!
  addons: [Addon!]!
  orderItems: [OrderItem!]!
   image: String
  stock: Int
}

type Addon {
  id: Int!
  title: String!
  description: String
  quantityMinimum: Int!
  quantityMaximum: Int!
  options: [Option!]!
  orderItems: [OrderItem!]!
  variations: [Variation!]!
  restaurant: Restaurant
  restaurantId: Int
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Option {
  id: Int!
  title: String!
  description: String
  price: Float!
  addon: Addon
  addonId: Int
    restaurant: Restaurant
  restaurantId: Int
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Review {
  id: Int!
  order: Order!
  orderId: Int!
  restaurant: Restaurant!
  restaurantId: Int!
  user: User!
  userId: Int!
  rating: Int!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
    images: [String!]
}

type Rider {
  id: Int!
  name: String!
  username: String
  password: String
  phone: String
  available: Boolean!
  zone: Zone
  zoneId: Int
  orders: [Order!]!
  currentWalletAmount: Float
  withdrawRequests: [WithdrawRequest!]!
  profileImage: String
  vehicleType: String
  licenseNumber: String
  location: String
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Restaurant {
  id: Int!
  orderPrefix: String
  name: String!
  slug: String
  image: String
  logo: String
  address: String!
  location: Location
  locationId: Int
  deliveryBounds: String
  username: String
  password: String
  deliveryTime: String
  minimumOrder: Float
  isActive: Boolean!
  commissionRate: Float
  tax: Float
  owner: Vendor!
  ownerId: Int!
  shopType: String
  categories: [Category!]!
  addons: [Addon!]!
  options: [Option!]!
  openingTimes: [OpeningTime!]!
  reviews: [Review!]!
  orders: [Order!]!
  offers: [Offer!]!
  sections: [Section!]!
  stripeDetailsSubmitted: Boolean!
  isAvailable: Boolean!
  postCode: String
  city: String
  cuisines: [Cuisine!]!
   isFeatured: Boolean!
   rating: Float
   minDeliveryTime: Int
  maxDeliveryTime: Int
   deliveryFee: Float
    createdAt: DateTime!
  updatedAt: DateTime!
}

type OpeningTime {
  id: Int!
  day: String!
  times: String
  restaurant: Restaurant!
  restaurantId: Int!
  type: String
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Zone {
  id: Int!
  title: String!
  description: String
  location: Location
  isActive: Boolean!
  tax:Float
 
}

type Vendor {
  id: Int!
  email: String!
  userType: String!
  restaurants: [Restaurant!]!
    name: String!
    phone: String
    addresses: String
      isVerified: Boolean!
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Configuration {
  id: Int!
  email: String
  emailName: String
  password: String
  enableEmail: Boolean
  clientId: String
  clientSecret: String
  sandbox: Boolean
  publishableKey: String
  secretKey: String
  currency: String
  currencySymbol: String
  deliveryRate: Float
  twilioAccountSid: String
  twilioAuthToken: String
  twilioPhoneNumber: String
  twilioEnabled: Boolean
  formEmail: String
  sendGridApiKey: String
  sendGridEnabled: Boolean
  sendGridEmail: String
  sendGridEmailName: String
  sendGridPassword: String
  dashboardSentryUrl: String
  webSentryUrl: String
  apiSentryUrl: String
  customerAppSentryUrl: String
  restaurantAppSentryUrl: String
  riderAppSentryUrl: String
  googleApiKey: String
  cloudinaryUploadUrl: String
  cloudinaryApiKey: String
  webAmplitudeApiKey: String
  appAmplitudeApiKey: String
  webClientID: String
  androidClientID: String
  iOSClientID: String
  expoClientID: String
  googleMapLibraries: String
  googleColor: String
  termsAndConditions: String
  privacyPolicy: String
  testOtp: String
  firebaseKey: String
  authDomain: String
  projectId: String
  storageBucket: String
  msgSenderId: String
  appId: String
  measurementId: String
  isPaidVersion: Boolean
  skipEmailVerification: Boolean
  skipMobileVerification: Boolean
  costType: String
  vapidKey: String
}

type Taxation {
  id: Int!
  taxationCharges: Float!
  enabled: Boolean!
  title: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Coupon {
  id: Int!
  title: String!
  discount: Float!
  enabled: Boolean!
  code: String
    expiryDate: DateTime
    minimumOrderAmount: Float
    maximumDiscountAmount: Float
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Cuisine {
  id: ID!
  name: String!
  description: String
  image: String
  shopType: String
  restaurants: [Restaurant!]!
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Banner {
  id: Int!
  title: String!
  description: String
  action: String
  screen: String
  file: String
  parameters: String
    isActive: Boolean!
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Tipping {
  id: Int!
  tipVariations: String
  enabled: Boolean!
    createdAt: DateTime!
  updatedAt: DateTime!
}


type Category {
    id: Int!
    title: String!
    foods: [Food!]!
    restaurant: Restaurant!
    restaurantId: Int!
      createdAt: DateTime!
  updatedAt: DateTime!
}

type Section {
    id: Int!
    name: String!
    enabled: Boolean!
    restaurants: [Restaurant!]!
    createdAt: DateTime!
  updatedAt: DateTime!
}

type Offer {
    id: Int!
    name: String!
    tag: String
   restaurants: [Restaurant!]!
     discount: Float
    startDate: DateTime
    endDate: DateTime
    minimumOrderAmount: Float
      createdAt: DateTime!
  updatedAt: DateTime!
}

type WithdrawRequest {
  id: Int!
  requestId: String!
  requestAmount: Float!
  requestTime: DateTime!
  rider: Rider!
  status: String!    
}


scalar DateTime
`;
export default typeDefs;