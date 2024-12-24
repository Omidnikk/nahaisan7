import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = `
scalar DateTime
scalar Decimal
scalar Json

type User {
  id: Int!
  name: String!
  email: String @unique
  phone: String @unique
  addresses: [Address]
  orders: [Order]
  reviews: [Review]
  pushToken: String
}

type Address {
  id: Int!
  location: Location!
  deliveryAddress: String
  details: String
  label: String
  user: User!
  order: Order
}

type Location {
  id: Int!
  latitude: Float!
  longitude: Float!
  address: String
  addresses: [Address]
  restaurants: [Restaurant]
  zones: [Zone]
}

type Order {
  id: Int!
  deliveryAddress: Address
  deliveryCharges: Decimal!
  orderAmount: Decimal!
  paidAmount: Decimal!
  paymentMethod: String!
  orderId: String @unique
  user: User!
  items: [OrderItem!]!
  reason: String
  status: String!
  paymentStatus: String!
  orderStatus: String!
  createdAt: DateTime!
  review: Review
  rider: Rider
  restaurant: Restaurant!
  zone: Zone
  isPickedUp: Boolean!
  tipping: Decimal
  taxationAmount: Decimal
}

type OrderItem {
  id: Int!
  food: Food!
  variation: Variation!
  addons: [Addon!]!
  specialInstructions: String
  quantity: Int!
  order: Order!
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
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Variation {
  id: Int!
  title: String
  price: Decimal!
  discounted: Boolean!
  food: Food!
  orderItems: [OrderItem!]!
  addons: [Addon!]!
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
}

type Option {
  id: Int!
  title: String!
  description: String
  price: Decimal!
  addon: Addon
  restaurant: Restaurant
}

type Review {
  id: Int!
  order: Order!
  restaurant: Restaurant!
  user: User!
  rating: Int!
  description: String
  createdAt: DateTime!
}

type Rider {
  id: Int!
  name: String!
  username: String @unique
  password: String  # Be careful about exposing passwords directly.
  phone: String @unique
  available: Boolean!
  zone: Zone
  orders: [Order]
  currentWalletAmount: Decimal
  withdrawRequests: [WithdrawRequest]
}
  
type Restaurant {
  id: Int!
  orderId: Int
  orderPrefix: String
  name: String!
  slug: String @unique
  image: String
  logo: String
  address: String!
  location: Location
  deliveryBounds: Json # Consider a more specific type if possible
  username: String
  password: String # Be careful about exposing passwords directly.
  deliveryTime: String
  minimumOrder: Decimal
  isActive: Boolean!
  commissionRate: Decimal
  tax: Decimal
  owner: Vendor!
  shopType: String
  categories: [Category!]!
  addons: [Addon!]!
  openingTimes: [OpeningTime!]!
  reviews: [Review!]!
  orders: [Order!]!
  offers: [Offer]
  sections: [Section]
  options: [Option!]!
  stripeDetailsSubmitted: Boolean!
  isAvailable: Boolean!
  postCode: String
  city: String
  cuisines: [Cuisine!]!
}

type OpeningTime {
  id: Int!
  day: String!
  times: Json  # Consider a more specific type if possible
  restaurant: Restaurant!
}
  
type Zone {
  id: Int!
  title: String!
  description: String
  location: Location
  isActive: Boolean!
  riders: [Rider!]!
  orders: [Order!]!
}

type Vendor {
  id: Int!
  email: String! @unique
  userType: String!
  restaurants: [Restaurant!]!
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
    deliveryRate: Float # Note: Use Float since your model uses Float.
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
  taxationCharges: Decimal!
  enabled: Boolean!
}

type Coupon {
  id: Int!
  title: String!
  discount: Decimal!
  enabled: Boolean!
}

type Cuisine {
  id: String!
  name: String!
  description: String
  image: String
  shopType: String
  restaurants: [Restaurant!]!
}

type Banner {
    id: Int!
    title: String!
    description: String
    action: String
    screen: String
    file: String
    parameters: Json  # Consider a more specific type if possible
  }
  
  type Tipping {
    id: Int!
    tipVariations: Json # Consider a more specific type if possible
    enabled: Boolean!
  }
  
  type Category {
    id: Int!
    title: String!
    foods: [Food!]!
    restaurant: Restaurant!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Section {
    id: Int!
    name: String!
    enabled: Boolean!
    restaurants: [Restaurant!]!
  }
  
  type Offer {
    id: Int!
    name: String!
    tag: String
    restaurants: [Restaurant!]!
  }
  type WithdrawRequest {
    id: Int!
    requestId: String! @unique
    requestAmount: Decimal!
    requestTime: DateTime!
    rider: Rider!
    status: String!
  }
  
  
  
  type Subscription {
    subscribePlaceOrder(restaurant: String!): OrderPlacedSubscriptionPayload
    subscriptionOrder(id: String!): OrderSubscriptionPayload
  }
  
  type OrderPlacedSubscriptionPayload {
    userId: Int
    origin: String # Determine the correct type for "origin"
    order: Order!
  }
  
  type OrderSubscriptionPayload {
    id: Int!
    orderStatus: String!
    rider: Rider
  }
  
`;
export default typeDefs;