import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = `
scalar DateTime
scalar Decimal
scalar Json
scalar Upload

type User {
  id: Int!
  name: String!
  email: String @unique
  phone: String @unique
  addresses: [Address]
  orders: [Order]
  reviews: [Review]
  pushToken: String
  role: String!
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
  addresses: [Address!]
  restaurants: [Restaurant!]
  zones: [Zone!]
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
  password: String
  phone: String @unique
  available: Boolean!
  zone: Zone
  orders: [Order!]
  currentWalletAmount: Decimal
  withdrawRequests: [WithdrawRequest!]
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
  deliveryBounds: Json
  username: String
  password: String
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
  offers: [Offer!]
  sections: [Section!]
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
  times: Json
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
  parameters: Json
}

type Tipping {
  id: Int!
  tipVariations: Json
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

# Chat Types
type Chat {
  id: Int!
  participants: [ChatParticipant!]!
  messages: [ChatMessage!]!
  createdAt: DateTime!
  updatedAt: DateTime
}

type ChatMessage {
  id: Int!
  sender: User!
  content: String!
  chat: Chat!
  createdAt: DateTime!
}

type ChatParticipant {
  id: Int!
  user: User!
  chat: Chat!
}

input PaginationInput {
  page: Int = 1
  rowsPerPage: Int = 10
}

input UserSearchInput {
  search: String
  pagination: PaginationInput
}


input RiderSearchInput {
  search: String
  pagination: PaginationInput
}

type UsersResult {
  users: [User!]!
  totalCount: Int!
  page: Int!
  rowsPerPage: Int!
}

type RidersResult {
  riders: [Rider!]!
  totalCount: Int!
  page: Int!
  rowsPerPage: Int!
}

type CouponResult {
  coupons: [Coupon!]!
  totalCount: Int!
}

type OrderResult{
  order:Order
}

type RestaurantResult{
  restaurant:Restaurant
}

type VendorResult{
  getVendor:Vendor
  restaurantByOwner:Vendor
}

scalar DateTime
scalar Decimal
scalar Json
scalar Upload

enum BannerActions {
  Home
  Foods
  Categories
  Restaurants
  "Restaurant detail"
  Coupons
  Order
  Offers
  Search
}

enum PaymentStatus{
  Pending
  Paid
  Unpaid
}

enum OrderStatus {
  PENDING
  PROCESSING
  ACCEPTED
  DISPATCHED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum UserType{
  CUSTOMER
  VENDOR
  RIDER
  ADMIN
}

enum ShopType{
  RESTAURANT
  STORE
}

enum CostType{
  FIXED
  RATE
}
type Query {
 users(input: UserSearchInput!): UsersResult!
  riders(input: RiderSearchInput!): RidersResult!
  allOrders(page: Int): [Order!]!
  order(id: ID): Order
  ordersByRestId(restaurant: String!, page: Int, rows: Int, search: String): [Order!]
  getOrdersByDateRange(startingDate: String!, endingDate: String!, restaurant: String!): OrdersByDateRangeResult!
  getActiveOrders(restaurantId: ID): [Order]
  getActiveOrdersWithPagination(page: Int, rowsPerPage: Int, search: String, restaurantId: ID): getActiveOrdersWithPaginationResult
  getDashboardTotal(startingDate: String, endingDate: String, restaurant: String!): DashboardTotalResult!
  getDashboardSales(startingDate: String, endingDate: String, restaurant: String!): DashboardSalesResult
  getDashboardOrders(startingDate: String, endingDate: String, restaurant: String!): DashboardOrdersResult
  getDashboardData(startingDate: String, endingDate: String): DashboardDataResult
  configuration: Configuration
  restaurant(id: String): Restaurant
  restaurants: [Restaurant]
  getRestaurantDetail(id: String): Restaurant
  getRestaurantProfile(id: String): Restaurant
  restaurantByOwner(id: String): Vendor
  restaurantList: [Restaurant]
  orderCount(restaurant: String!): Int
  pageCount(restaurant: String!): Int
  getZones: [Zone]
  getVendors: [Vendor]
  getVendor(id: String!): Vendor
  getTaxation: Taxation
  getCoupons(page: Int, rowsPerPage: Int, search: String): CouponResult!
  getCuisines: [Cuisine]
  getBanners: [Banner]
  getBannerActions: [String]
  getTipping: Tipping
  getAddons: [Addon]
  getOptions: [Option]
  getPaymentStatuses: [PaymentStatus]
  getOffers: [Offer]
  getSections: [Section]
  reviews(restaurant: String!): [Review]
  availableRiders: [Rider]
  ridersByZone(id: String!): [Rider]
  withdrawRequests(input: WithdrawRequestInput!): WithdrawRequestResult!
  getVendorProfile(id:String!): Vendor
  getCategory(id:String!): Category
  getFood(id:String!):Food
  getCategoryList(restaurant:String!): [Category!]!
  getFoodList(restaurant:String!): [Food!]!
  getRestaurantListByVendor(vendor:String!): [Restaurant!]!
  getRestaurantBySlug(slug: String!): Restaurant
  getOpeningTime(restaurant: String!): [OpeningTime]
  getVendorList(input: VendorSearchInput!): VendorsResult!
  getBannerList(input: BannerSearchInput!): BannersResult!
   # Chat Queries
    chats(userId: ID!): [Chat!]!
    chat(id: ID!): Chat
    chatMessages(chatId: ID!, pagination: PaginationInput): [ChatMessage!]!
   getChatByParticipants(participantIds: [ID!]!): Chat
    getUsersByRole(role:String!, input:UserSearchInput): UsersResult
    getAllRestaurant: [Restaurant]
     getReviews: [Review]
     getReviewsByRestaurantId(restaurantId:String!): [Review]

}

type Mutation {
 createFood(foodInput: FoodInput!): FoodMutationResult!
  editFood(foodInput: FoodInput!): FoodMutationResult!
  deleteFood(id: String!, restaurant: String!, categoryId: String!): FoodMutationResult!
  createCategory(category: CategoryInput!): CategoryMutationResult!
  editCategory(category: CategoryInput!): CategoryMutationResult!
  deleteCategory(id: String!, restaurant: String!): CategoryMutationResult!
  saveEmailConfiguration(configurationInput: EmailConfigurationInput!): Configuration
  saveFormEmailConfiguration(configurationInput: FormEmailConfigurationInput!): Configuration
  saveSendGridApiKey(configurationInput: SendGridConfigurationInput!): Configuration
  saveFirebaseConfiguration(configurationInput: FirebaseConfigurationInput!): Configuration
  saveSentryConfiguration(configurationInput: SentryConfigurationInput!): Configuration
  saveGoogleApiKeyConfiguration(configurationInput: GoogleApiKeyConfigurationInput!): Configuration
  saveCloudinaryConfiguration(configurationInput: CloudinaryConfigurationInput!): Configuration
  saveAmplitudeApiKeyConfiguration(configurationInput: AmplitudeApiKeyConfigurationInput!): Configuration
  saveGoogleClientIDConfiguration(configurationInput: GoogleClientIDConfigurationInput!): Configuration
  saveWebConfiguration(configurationInput: WebConfigurationInput!): Configuration
  saveAppConfiguration(configurationInput: AppConfigurationsInput!): Configuration
  saveDeliveryRateConfiguration(configurationInput: DeliveryCostConfigurationInput!): Configuration
  savePaypalConfiguration(configurationInput: PaypalConfigurationInput!): Configuration
  saveStripeConfiguration(configurationInput: StripeConfigurationInput!): Configuration
  saveTwilioConfiguration(configurationInput: TwilioConfigurationInput!): Configuration
  saveVerificationToggles(configurationInput: VerificationConfigurationInput!): Configuration
  saveCurrencyConfiguration(configurationInput: CurrencyConfigurationInput!): Configuration
  ownerLogin(email: String!, password: String!): VendorLoginResult!
  createSection(section: SectionInput!): Section
  editSection(section: SectionInput!): Section
  deleteSection(id: String!): DeleteResult!
  deleteVendor(id: String!): DeleteResult!
  updateOrderStatus(id: String!, status: String!, reason: String): Order
  updateStatus(id: String!, orderStatus: String!): Order
  uploadToken(id: String!, pushToken: String!): User
  resetPassword(password: String!, token: String!): ResetPasswordResult!
  createRider(riderInput: RiderInput!): Rider
  editRider(riderInput: RiderInput!): Rider
  deleteRider(id: String!): DeleteResult!
  toggleAvailablity(id: String!): Rider
  assignRider(id: String!, riderId: String!): Order
  updatePaymentStatus(id: String!, status: String!): Order
 createOffer(offer: OfferInput!): Offer
  editOffer(offer: OfferInput!): Offer
  deleteOffer(id: String!): DeleteResult!
  createOptions(optionInput: CreateOptionInput!): CreateOptionsResult!
  createAddons(addonInput: AddonInput!): AddonsResult!
  editAddon(addonInput: EditAddonInput!): AddonsResult!
  deleteAddon(id: String!, restaurant: String!): AddonsResult!
  deleteOption(id: String!, restaurant: String!): OptionsResult!
  editOption(optionInput: EditOptionInput!): OptionsResult!
  createCoupon(couponInput: CouponInput!): Coupon
  editCoupon(couponInput: CouponInput!): Coupon
  deleteCoupon(id: String!): DeleteResult!
  createCuisine(cuisineInput: CuisineInput!): Cuisine
  editCuisine(cuisineInput: CuisineInput!): Cuisine
  deleteCuisine(id: String!): DeleteResult!
  createBanner(bannerInput: BannerInput!): Banner
  editBanner(bannerInput: BannerInput!): Banner
  deleteBanner(id: String!): DeleteResult!
  createTipping(tippingInput: TippingInput!): Tipping
  editTipping(tippingInput: TippingInput!): Tipping
  createTaxation(taxationInput: TaxationInput!): Taxation
  editTaxation(taxationInput: TaxationInput!): Taxation
  createVendor(vendorInput: VendorInput!): Vendor
  editVendor(vendorInput: VendorInput!): Vendor
 editRestaurant(restaurantInput: RestaurantProfileInput!): Restaurant
  createZone(zone: ZoneInput!): Zone
  editZone(zone: ZoneInput!): Zone
  deleteZone(id: String!): DeleteResult!
  vendorResetPassword(oldPassword: String!, newPassword: String!): String
  deleteRestaurant(id: String!): Restaurant
  updateTimings(id: String!, openingTimes: [TimingsInput!]!): Restaurant
  sendNotificationUser(notificationTitle: String, notificationBody: String!): Boolean
  updateCommission(id: String!, commissionRate: Float!): Restaurant
  createRestaurant(restaurant: RestaurantInput!, owner: ID!): Restaurant
  createAddress(address: AddressInput!): Address
    editAddress(address: EditAddressInput!): Address
  deleteAddress(id: String!): DeleteResult!
  createLocation(location: LocationInput!): Location
    editLocation(location: EditLocationInput!): Location
    deleteLocation(id: String!): DeleteResult!
    createWithdrawRequest(requestId: String!, requestAmount: Decimal!, riderId: Int!): WithdrawRequest!
    editWithdrawRequest(id: ID!, status: String!): WithdrawRequest!
  updateDeliveryBoundsAndLocation(
    id: ID!
    boundType: String!
    bounds: [[[Float!]!]]
    circleBounds: CircleBoundsInput
    location: CoordinatesInput!
    address: String
    postCode: String
    city: String
  ): UpdateDeliveryBoundsAndLocationResult!
    updateWithdrawReqStatus(id: ID!, status: String!): UpdateWithdrawRequestResult!
  updateRestaurantAvailable(id:String!):Restaurant
  updateRestaurantStripDetails(id:String!):Restaurant
    addCuisineToRestaurant(id:String!, cuisineId:String!):Restaurant
    removeCuisineFromRestaurant(id:String!, cuisineId:String!):Restaurant
    updateVendorStatus(id:String!, isEnabled:Boolean!):Vendor
    deleteCategoryFromRestaurant(id:String!, categoryId:String!):Restaurant
     updateFoodStatus(id:String!): Food!
  # Chat Mutations
   createChat(participantIds: [ID!]!): Chat!
  sendMessage(chatId: ID!, senderId: ID!, content: String!): ChatMessage!
  deleteChat(id: String!): DeleteResult!
  deleteChatMessage(id:String!): DeleteResult!
}


type Subscription {
  subscribePlaceOrder(restaurant: String!): OrderPlacedSubscriptionPayload
  subscriptionOrder(id: String!): OrderSubscriptionPayload
  subscribeWithdrawRequest(rider: String!): WithdrawRequestPlacedSubscriptionPayload
  # Chat Subscriptions
  subscribeToChat(chatId: ID!): ChatMessage!
}

input FoodInput {
  id: String
  title: String!
  description: String
  image: Upload
  restaurant: String!
  categoryId: String
  variations: [VariationInput!]
}

input VariationInput {
  id: String
  title: String
  price: Decimal!
  discounted: Boolean!
  addons: [String]
}

input CategoryInput {
  id: String
  title: String!
  restaurant: String!
}

input EmailConfigurationInput {
  id: ID!
  email: String!
  emailName: String!
  password: String!
  enableEmail: Boolean!
}

input FormEmailConfigurationInput {
  id: ID!
  formEmail: String!
}

input SendGridConfigurationInput {
  id: ID!
  sendGridApiKey: String!
  sendGridEnabled: Boolean!
  sendGridEmail: String!
  sendGridEmailName: String!
  sendGridPassword: String!
}

input FirebaseConfigurationInput {
  id: ID!
  firebaseKey: String!
  authDomain: String!
  projectId: String!
  storageBucket: String!
  msgSenderId: String!
  appId: String!
  measurementId: String!
  vapidKey: String!
}

input SentryConfigurationInput {
  id: ID!
  dashboardSentryUrl: String!
  webSentryUrl: String!
  apiSentryUrl: String!
  customerAppSentryUrl: String!
  restaurantAppSentryUrl: String!
  riderAppSentryUrl: String!
}

input GoogleApiKeyConfigurationInput {
  id: ID!
  googleApiKey: String!
}

input CloudinaryConfigurationInput {
  id: ID!
  cloudinaryUploadUrl: String!
  cloudinaryApiKey: String!
}

input AmplitudeApiKeyConfigurationInput {
  id: ID!
  webAmplitudeApiKey: String!
  appAmplitudeApiKey: String!
}

input GoogleClientIDConfigurationInput {
  id: ID!
  webClientID: String!
  androidClientID: String!
  iOSClientID: String!
  expoClientID: String!
}

input WebConfigurationInput {
  id: ID!
  googleMapLibraries: String!
  googleColor: String!
}

input AppConfigurationsInput {
  id: ID!
  termsAndConditions: String!
  privacyPolicy: String!
  testOtp: String!
}

input DeliveryCostConfigurationInput {
  id: ID!
  deliveryRate: Float!
  costType: CostType!
}

input PaypalConfigurationInput {
  id: ID!
  clientId: String!
  clientSecret: String!
  sandbox: Boolean!
}

input StripeConfigurationInput {
  id: ID!
  publishableKey: String!
  secretKey: String!
}

input TwilioConfigurationInput {
  id: ID!
  twilioAccountSid: String!
  twilioAuthToken: String!
  twilioPhoneNumber: String!
  twilioEnabled: Boolean!
}

input VerificationConfigurationInput {
  id: ID!
  skipEmailVerification: Boolean!
  skipMobileVerification: Boolean!
}

input CurrencyConfigurationInput {
  id: ID!
  currency: String!
  currencySymbol: String!
}

input SectionInput {
  _id: ID
  name: String!
  enabled: Boolean!
  restaurants: [ID]
}

input RiderInput {
  _id: ID
  name: String!
  username: String!
  password: String!
  phone: String!
  zoneId: String!
}

input OfferInput {
  _id: ID
  name: String!
  tag: String
  restaurants: [ID]
}

input OptionInput {
  _id: ID
  title: String!
  description: String!
  price: Decimal!
}

input CreateOptionInput {
  restaurant: String!
  options: [OptionInput!]!
}

input AddonInput {
  _id: ID
  title: String!
  description: String!
  quantityMinimum: Int!
  quantityMaximum: Int!
  restaurant: ID!
  options: [String]
}

input EditAddonInput {
  _id: ID!
  restaurant: String!
  title: String
  description: String
  quantityMinimum: Int
  quantityMaximum: Int
  options: [ID]
}

input CouponInput {
  _id: ID
  title: String!
  discount: Decimal!
  enabled: Boolean!
}

input CuisineInput {
  id: ID
  name: String!
  description: String
  image: Upload # Assuming file uploads
  shopType: ShopType!
}

input BannerInput {
  _id: ID
  title: String!
  description: String
  action: String
  screen: String
  parameters: String
  file: Upload
}

input TippingInput {
  _id: ID
  tipVariations: String! # Assuming tipVariations will be handled as a JSON string on the backend
  enabled: Boolean
}

input TaxationInput {
  _id: ID
  taxationCharges: Decimal!
  enabled: Boolean
}

input VendorInput {
  _id: ID
  email: String!
  password: String
  userType: UserType!
}

input RestaurantProfileInput {
  _id: ID
  orderId: Int
  orderPrefix: String
  name: String!
  slug: String
  image: Upload
  logo: Upload
  address: String
  username: String
  password: String
  location: CoordinatesInput
  deliveryBounds: [[[Float!]]]
  deliveryTime: String
  minimumOrder: Float
  tax: Float
  isAvailable: Boolean
  shopType: ShopType
  openingTimes: [TimingsInput]
}

input CoordinatesInput {
  coordinates: [Float!]
}

input TimingsInput {
  day: String!
  times: [TimesInput!]!
}

input TimesInput {
  startTime: String!
  endTime: String!
}

input ZoneInput {
  _id: ID
  title: String!
  description: String
  location: CoordinatesInput
  isActive: Boolean
}

input RestaurantInput {
  _id: ID
  orderId: Int
  orderPrefix: String
  name: String!
  slug: String
  image: Upload
  logo: Upload
  address: String
  username: String
  password: String
  location: CoordinatesInput
  deliveryTime: String
  minimumOrder: Float
  tax: Float
  shopType: ShopType
  cuisines: [String]
}

input CircleBoundsInput {
  coordinates: [Float!]
  radius: Float!
}

input AddressInput {
  id: Int
  locationId: Int!
  deliveryAddress: String
  details: String
  label: String
  userId: Int!
  orderId: Int
}

input EditAddressInput {
  id: Int!
  locationId: Int
  deliveryAddress: String
  details: String
  label: String
  userId: Int
  orderId: Int
}

input LocationInput {
  id: Int
  latitude: Float!
  longitude: Float!
  address: String
}

input EditLocationInput {
  id: Int!
  latitude: Float
  longitude: Float
  address: String
}

input VendorSearchInput {
  search: String
  pagination: PaginationInput
}

type VendorsResult {
  vendors: [Vendor!]!
  totalCount: Int!
  page: Int!
  rowsPerPage: Int!
}

input BannerSearchInput {
  search: String
  pagination: PaginationInput
}

type BannersResult {
  banners: [Banner!]!
  totalCount: Int!
  page: Int!
  rowsPerPage: Int!
}

type DeleteResult {
  success: Boolean!
  message: String!
}

type FoodMutationResult {
  id: ID
  categories: [Category]
}

type CategoryMutationResult {
  id: ID
  categories: [Category]
}

type VendorLoginResult {
  userId: ID
  token: String
  email: String
  userType: UserType
  restaurants: [Restaurant]
}

type ResetPasswordResult {
  result: Boolean
}

type CreateOptionsResult {
  id: ID
  options: [Option]
}

type AddonsResult {
  id: ID
  addons: [Addon]
}

type OptionsResult {
  id: ID
  options: [Option]
}

type UpdateDeliveryBoundsAndLocationResult {
  success: Boolean
  message: String
  data: Restaurant
}

type UpdateWithdrawRequestResult {
  success: Boolean
  message: String
  data: UpdateWithdrawRequestData
}

type UpdateWithdrawRequestData {
  rider: Rider
  withdrawRequest: WithdrawRequest
}

input WithdrawRequestInput {
  page: Int = 1
  rowsPerPage: Int = 10
  search: String
}

type WithdrawRequestResult {
  requests: [WithdrawRequest!]!
  totalCount: Int!
}

type OrderPlacedSubscriptionPayload {
  userId: Int
  origin: String
  order: Order!
}

type OrderSubscriptionPayload {
  id: Int!
  orderStatus: OrderStatus!
  rider: Rider
}

type WithdrawRequestPlacedSubscriptionPayload {
  riderId: Int!
  withdrawRequest: WithdrawRequest!
}

type MutationResponse {
  success: Boolean!
  message: String!
}

type OrdersByDateRangeResult {
  totalAmountCashOnDelivery: Decimal
  countCashOnDeliveryOrders: Int
}

type DashboardTotalResult {
  totalOrders: Int
  totalSales: Decimal
}

type DashboardSalesResult {
  orders: [DashboardSalesOrder]
  totalSales: Decimal
}

type DashboardSalesOrder {
  day: String
  amount: Decimal
}

type DashboardOrdersResult {
  orders: [DashboardOrdersOrder]
}

type DashboardOrdersOrder {
  day: String
  count: Int
}

type DashboardDataResult {
  totalOrders: Int
  totalUsers: Int
  totalSales: Decimal
  orders: [DashboardDataOrder]
}

type DashboardDataOrder {
  day: String
  count: Int
  amount: Decimal
}

type getActiveOrdersWithPaginationResult{
  orders: [Order]
  orderCount: Int
  page: Int
  rowsPerPage: Int
}
`;
export default typeDefs;