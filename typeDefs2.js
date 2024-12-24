import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = `
type User {
    id: Int!
    email: String!
    name: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
    products: [Product!]!
    orders: [Order!]!
}
    type AuthPayload {
    token: String!
    user: User!
  }

type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
    category: Category!
    vendor: User!
    createdAt: String!
    updatedAt: String!
}

type Category {
    id: Int!
    name: String!
    products: [Product!]!
}

type Order {
    id: Int!
    customer: User!
    createdAt: String!
    updatedAt: String!
}

enum Role {
    CUSTOMER
    VENDOR
}

type OrderDetails {
    id: Int
    deliveryAddress: String
    deliveryCharges: Float
    orderAmount: Float
    paidAmount: Float
    paymentMethod: String
    orderId: String
    user: UserType
    items: [OrderItem]
    reason: String
    status: String
    paymentStatus: String
    orderStatus: String
    createdAt: String
    review: ReviewType
    rider: RiderType
}

type UserType{
    id: Int
    name: String
    email: String
    phone: String
}

type OrderItem {
    id: Int
    food: FoodItem
    variation: Variation
    addons: [AddonType]
    specialInstructions: String
    quantity: Int
}

type FoodItem{
    id: Int
    title: String
    description: String
    image: String
}

type Variation{
    id:Int
    title: String
    price: Float
    discounted: Boolean
}

type AddonType{
    id: Int
    title: String
    description: String
    quantityMinimum: Int
    quantityMaximum: Int
    options: [OptionType]
}

type OptionType{
    id: Int
    title: String
    price: Float
}

type RiderType {
    id: Int
    name: String
}


type ReviewType {
  id: Int
  rating: Float
  description: String
}

type Review {
  id: Int
  order: ReviewOrder
  restaurant: ReviewRestaurant
  rating: Float
  description: String
  createdAt: String
}
type ReviewOrder {
    id: Int
    orderId: String
    items: [ReviewOrderItem]
    user: ReviewUser
}

type ReviewOrderItem{
    title: String
}

type ReviewUser{
    id: Int
    name: String
    email: String
}

type ReviewRestaurant{
    id: Int
    name: String
    image: String
}

type OrderDateRangeResult {
    totalAmountCashOnDelivery: Float
    countCashOnDeliveryOrders: Int
}

type RestaurantOrder {
    id: Int
    orderId: String
    restaurant: Restaurant
    deliveryAddress: DeliveryAddress
    items: [RestaurantOrderItem]
    user: UserType
    paymentMethod: String
    paidAmount: Float
    orderAmount: Float
    orderStatus: String
    status: String
    paymentStatus: String
    reason: String
    isActive: Boolean
    createdAt: String
    deliveryCharges: Float
    tipping: Float
    taxationAmount: Float
    rider: RiderType
}

type Restaurant {
    id: Int
    name: String
    image: String
    address: String
    location: Location
}

type Location {
    coordinates: [Float]
}

type DeliveryAddress {
    id: Int
    location: Location
    deliveryAddress: String
    details: String
    label: String
}

type RestaurantOrderItem {
    id: Int
    title: String
    description: String
    image: String
    quantity: Int
    variation: Variation
    addons: [AddonType]
    specialInstructions: String
    isActive: Boolean
    createdAt: String
    updatedAt: String
}

type DashboardTotalResult {
    totalOrders: Int
    totalSales: Float
}

type DashboardSalesResult {
    orders: [SalesOrder]
}

type SalesOrder {
  day: String
  amount: Float
}

type DashboardOrdersResult{
  orders: [OrdersOrder]
}

type OrdersOrder{
    day: String
    count: Int
}

type DashboardDataResult {
    totalOrders: Int
    totalUsers: Int
    totalSales: Float
    orders: [DashboardOrder]
}

type DashboardOrder {
  day: String
  count: Int
  amount: Float
}

type Configuration {
    id: Int
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

type ActiveOrder {
    id: Int
    zone: ZoneType
    orderId: String
    restaurant: Restaurant
    deliveryAddress: DeliveryAddress
    items: [RestaurantOrderItem]
    user: UserType
    paymentMethod: String
    paidAmount: Float
    orderAmount: Float
    orderStatus: String
    isPickedUp: Boolean
    status: String
    paymentStatus: String
    reason: String
    isActive: Boolean
    createdAt: String
    deliveryCharges: Float
    rider: RiderType
}

type ZoneType {
    id: Int
}

type ActiveOrdersWithPaginationResult {
    orders: [ActiveOrder!]
    orderCount: Int
    page: Int
    rowsPerPage: Int
}


type Rider {
    id: Int
    name: String
    username: String
    password: String
    phone: String
    available: Boolean
    zone: Zone
}
type Zone {
    id: Int
    title: String
    description: String
    location: Location
    isActive: Boolean
}

type Vendor{
    id: Int
    email: String
    userType: String
    restaurants: [VendorRestaurant]
}

type VendorRestaurant{
    id: Int
    orderId: String
    orderPrefix: String
    slug: String
    name: String
    image: String
    address: String
    location: Location
    zone: ZoneType
    shopType: String
}

type Taxation {
    id: Int
    taxationCharges: Float
    enabled: Boolean
}

type CouponResult {
    coupons: [Coupon]
    totalCount: Int
}

type Coupon {
    id: Int
    title: String
    discount: Float
    enabled: Boolean
}

type Cuisine {
    id: Int
    name: String
    description: String
    image: String
    shopType: String
}

type Banner{
    id: Int
    title: String
    description: String
    action: String
    screen: String
    file: String
    parameters: String
}

type Tipping {
    id: Int
    tipVariations: [Float]
    enabled: Boolean
}

type Addon {
    id: Int
    title: String
    description: String
    options: [Option]
    quantityMinimum: Int
    quantityMaximum: Int
}
type Option{
    id: Int
    title: String
    description: String
    price: Float
}

type OwnerRestaurants{
    id: Int
    email: String
    userType: String
    restaurants: [OwnerRestaurant]
}

type OwnerRestaurant{
    id: Int
    orderId: String
    orderPrefix: String
    name: String
    slug: String
    image: String
    address: String
    username: String
    password: String
    location: Location
    shopType: String
}

type RestaurantListItem{
  id: Int
  name: String
  address: String
}

type RestaurantType{
    id: Int
    name: String
    image: String
    orderPrefix: String
    slug: String
    address: String
    deliveryTime: Float
    minimumOrder: Float
    isActive: Boolean
    commissionRate: Float
    tax: Float
    owner: Owner
    shopType: String
}
type Owner{
    id: Int
    email: String
}

type RestaurantProfile {
    id: Int
    orderId: String
    orderPrefix: String
    slug: String
    name: String
    image: String
    logo: String
    address: String
    location: Location
    deliveryBounds: DeliveryBounds
    username: String
    password: String
    deliveryTime: Float
    minimumOrder: Float
    tax: Float
    isAvailable: Boolean
    stripeDetailsSubmitted: Boolean
    openingTimes: [OpeningTime]
    owner: Owner
    shopType: String
    cuisines: [String]
}

type DeliveryBounds{
    coordinates: [[[Float]]]
}
type OpeningTime {
    day: String
    times: [TimeRange]
}
type TimeRange {
    startTime: String
    endTime: String
}

type RestaurantDetails{
    id: Int
    orderId: String
    orderPrefix: String
    slug: String
    name: String
    image: String
    address: String
    location: Location
     deliveryTime: Float
    minimumOrder: Float
    tax: Float
    categories: [RestaurantCategory]
    options: [Option]
    addons: [Addon]
    shopType: String
}

type RestaurantCategory {
    id: Int
    title: String
    foods: [RestaurantFood]
}

type RestaurantFood{
    id: Int
    title: String
    description: String
    variations: [RestaurantFoodVariation]
    image: String
    isActive: Boolean
}
type RestaurantFoodVariation{
    id: Int
    title: String
    price: Float
    discounted: Boolean
    addons: [String]
}

type Offer{
  id: Int
  name: String
  tag: String
  restaurants: [OfferRestaurant]
}

type OfferRestaurant{
  id: Int
  name: String
}

type Section {
    id: Int
    name: String
    enabled: Boolean
    restaurants: [SectionRestaurant]
}

type SectionRestaurant{
  id: Int
  name: String
}

type UsersResult{
    users: [UserType]
    totalCount: Int
}

type RidersResult{
    riders: [Rider]
    totalCount: Int
}

type WithdrawRequestsResult{
    requests: [WithdrawRequest]
    totalCount: Int
}
type WithdrawRequest{
   id: Int
    requestId: String
    requestAmount: Float
    requestTime: String
    rider: RiderWithdraw
    status: String
}
type RiderWithdraw{
  id: Int
  name: String
  currentWalletAmount: Float
}

input FoodInput {
    id: Int
     title: String!
    description: String
    restaurant: String!
    category: String!
    variations: [VariationInput!]
    image: String
    isActive: Boolean
}

input CategoryInput{
 id: Int
  title: String
  restaurant: String
}
input VariationInput{
    id: Int
    title: String
    price: Float
    discounted: Boolean
    addons: [String]
}

input EmailConfigurationInput{
  email: String
    emailName: String
    password: String
    enableEmail: Boolean
}

input FormEmailConfigurationInput{
  formEmail: String!
}

input SendGridConfigurationInput{
 sendGridApiKey: String
    sendGridEnabled: Boolean
    sendGridEmail: String
    sendGridEmailName: String
    sendGridPassword: String
}

input FirebaseConfigurationInput{
  firebaseKey: String
    authDomain: String
    projectId: String
    storageBucket: String
    msgSenderId: String
    appId: String
    measurementId: String
     vapidKey: String
}

input SentryConfigurationInput {
    dashboardSentryUrl: String
    webSentryUrl: String
    apiSentryUrl: String
    customerAppSentryUrl: String
    restaurantAppSentryUrl: String
    riderAppSentryUrl: String
}
input GoogleApiKeyConfigurationInput {
    googleApiKey: String
}
input CloudinaryConfigurationInput {
    cloudinaryUploadUrl: String
    cloudinaryApiKey: String
}
input AmplitudeApiKeyConfigurationInput {
     webAmplitudeApiKey: String
      appAmplitudeApiKey: String
}
input GoogleClientIDConfigurationInput {
    webClientID: String
    androidClientID: String
    iOSClientID: String
     expoClientID: String
}

input WebConfigurationInput{
     googleMapLibraries: String
     googleColor: String
}
input AppConfigurationsInput {
    termsAndConditions: String
    privacyPolicy: String
    testOtp: String
}
input DeliveryCostConfigurationInput {
    deliveryRate: Float
    costType: String
}

input PaypalConfigurationInput {
  clientId: String
  clientSecret: String
   sandbox: Boolean
}
input StripeConfigurationInput {
    publishableKey: String
    secretKey: String
}
input TwilioConfigurationInput{
   twilioAccountSid: String
    twilioAuthToken: String
    twilioPhoneNumber: String
  twilioEnabled: Boolean
}

input VerificationConfigurationInput {
    skipEmailVerification: Boolean
    skipMobileVerification: Boolean
}
input CurrencyConfigurationInput {
    currency: String
    currencySymbol: String
}

input SectionInput {
    id: Int
    name: String
    enabled: Boolean
    restaurants:[String]
}
input RiderInput {
   id: Int
    name: String!
    username: String!
     password: String!
     phone: String!
    zone:String!
}
input CreateOptionInput {
  title: String!
   description: String!
    price: Float!
     restaurant: String!
}

input AddonInput {
    title: String!
    options: [String!]
    description: String!
    quantityMinimum: Int!
   quantityMaximum: Int!
   restaurant: String!
}
input editAddonInput{
    id: Int
    title: String
    options: [String]
    description: String
    quantityMinimum: Int
   quantityMaximum: Int
}
input editOptionInput{
    id: Int
  title: String
   description: String
    price: Float
}
input CouponInput{
   id: Int
    title: String!
    discount: Float!
    enabled: Boolean!
}

input CuisineInput {
    id: Int
  name: String!
    description: String
   image: String
  shopType: String
}
input BannerInput {
    id: Int
    title: String!
    description: String
    action: String
    file: String
    screen: String
    parameters: String
}

input TippingInput {
  id: Int
    tipVariations: [Float!]
     enabled: Boolean
}
input TaxationInput {
    id: Int
        taxationCharges: Float!
        enabled: Boolean
}
input VendorInput {
    id: Int
    email: String!
}
input TimingsInput{
    day: String
    times: [TimeInput]
}
input TimeInput{
    startTime:String!
    endTime:String!
}
input RestaurantInput {
    orderId: String
    orderPrefix: String
    name: String!
    image: String!
    logo:String
    slug:String
    address: String!
    username:String!
    password:String!
    location:CoordinatesInput!
    minimumOrder:Float
    tax:Float
    shopType:String
    cuisines:[String]
}
input CoordinatesInput{
    coordinates:[Float!]!
}
input RestaurantProfileInput{
    id:Int
    orderId:String
    orderPrefix:String
    name:String
    image:String
    logo:String
    slug:String
    address:String
     username:String
    password:String
     location:CoordinatesInput
     isAvailable: Boolean
     minimumOrder:Float
     tax:Float
    openingTimes:[TimingsInput]
    shopType:String
    cuisines:[String]
}
input ZoneInput {
    id: Int
    title: String!
    description: String
    location:CoordinatesInput
     isActive: Boolean
}
input CircleBoundsInput{
  radius: Float!
  coordinates: [Float!]!
}


type Query {
   
    user(id: Int!): User
    products: [Product!]!
    product(id: Int!): Product
    categories: [Category!]!
    category(id: Int!): Category
    orders: [Order!]!
    order(id: Int!): Order
    allOrders(page:Int): [OrderDetails!]!
    reviews(restaurant:String!): [Review!]!
    getOrdersByDateRange(startingDate: String!, endingDate: String!, restaurant: String!): OrderDateRangeResult
    ordersByRestId(restaurant:String!,page:Int,rows:Int,search:String): [RestaurantOrder!]!
    getDashboardTotal(starting_date: String, ending_date: String,restaurant:String!): DashboardTotalResult
     getDashboardSales(starting_date: String, ending_date: String,restaurant:String!): DashboardSalesResult
     getDashboardOrders(starting_date: String, ending_date: String,restaurant:String!): DashboardOrdersResult
      getDashboardData(starting_date: String, ending_date: String): DashboardDataResult
    configuration: Configuration
    orderCount(restaurant:String!): Int
    getActiveOrders(restaurantId:ID): [ActiveOrder!]!
    getActiveOrdersWithPagination( page: Int, rowsPerPage: Int, search: String, restaurantId: ID): ActiveOrdersWithPaginationResult
    ridersByZone(id:String!): [Rider!]!
    zones: [Zone!]!
    vendors: [Vendor!]!
    getVendor(id:String!): Vendor
    taxes: [Taxation!]!
    coupons(page: Int, rowsPerPage: Int, search: String): CouponResult
    cuisines: [Cuisine!]!
    banners: [Banner!]!
    bannerActions: [String!]!
    tips: [Tipping!]!
    addons: [Addon!]!
    options: [Option!]!
    getPaymentStatuses: [String!]!
    restaurantByOwner(id:String): OwnerRestaurants
    restaurantList: [RestaurantListItem!]!
    restaurants: [RestaurantType!]!
    restaurant(id:String): RestaurantProfile
    restaurantDetail(id:String): RestaurantDetails
    offers: [Offer!]!
     sections: [Section!]!
     pageCount(restaurant:String!): Int
    users(page: Int, rowsPerPage: Int, search: String): UsersResult
    riders(page: Int, rowsPerPage: Int, search: String): RidersResult
     availableRiders: [Rider!]!
    withdrawRequests(page: Int, rowsPerPage: Int, search: String): WithdrawRequestsResult
}
scalar Upload
type Mutation {
    createUser(email: String!, name: String!, role: Role!): User!
    updateUser(id:Int!, email: String, name: String, role: Role): User
    deleteUser(id:Int!): User
    createProduct(name: String!, description: String, price: Float!, categoryId: Int!, vendorId: Int!): Product!
    updateProduct(id: Int!, name: String, description: String, price: Float, categoryId: Int, vendorId: Int): Product
    deleteProduct(id: Int!): Product
    updateCategory(id: Int!, name: String!): Category
    uploadFile(file: Upload!): String!
    createOrder(customerId: Int!): Order!
     createFood(foodInput:FoodInput!): RestaurantCategory
    editFood(foodInput:FoodInput!): RestaurantCategory
    deleteFood(id:String!,restaurant:String!,categoryId:String!): RestaurantCategory
    createCategory(category:CategoryInput): RestaurantCategory
    editCategory(category:CategoryInput): RestaurantCategory
    deleteCategory(id:String!,restaurant:String!): RestaurantCategory
    saveEmailConfiguration(configurationInput:EmailConfigurationInput!):Configuration
     saveFormEmailConfiguration(configurationInput:FormEmailConfigurationInput!):Configuration
     saveSendGridConfiguration(configurationInput: SendGridConfigurationInput!):Configuration
      saveFirebaseConfiguration(configurationInput:FirebaseConfigurationInput!):Configuration
    saveSentryConfiguration(configurationInput: SentryConfigurationInput!):Configuration
        saveGoogleApiKeyConfiguration(configurationInput: GoogleApiKeyConfigurationInput!):Configuration
    saveCloudinaryConfiguration(configurationInput: CloudinaryConfigurationInput!):Configuration
    saveAmplitudeApiKeyConfiguration(configurationInput: AmplitudeApiKeyConfigurationInput!):Configuration
    saveGoogleClientIDConfiguration(configurationInput: GoogleClientIDConfigurationInput!):Configuration
        saveWebConfiguration(configurationInput: WebConfigurationInput!): Configuration
    saveAppConfigurations(configurationInput: AppConfigurationsInput!): Configuration
     saveDeliveryRateConfiguration(configurationInput: DeliveryCostConfigurationInput!): Configuration
     savePaypalConfiguration(configurationInput:PaypalConfigurationInput!): Configuration
     saveStripeConfiguration(configurationInput:StripeConfigurationInput!):Configuration
    saveTwilioConfiguration(configurationInput:TwilioConfigurationInput!):Configuration
    saveVerificationsToggle(configurationInput:VerificationConfigurationInput!):Configuration
       saveCurrencyConfiguration(configurationInput:CurrencyConfigurationInput!): Configuration
   ownerLogin(email:String!,password:String!): OwnerRestaurants
     createSection(section:SectionInput!):Section
    editSection(section:SectionInput!):Section
      deleteSection(id:String!): Section
     deleteVendor(id:String!):Vendor
      updateOrderStatus(id:String!,status:String!,reason:String): RestaurantOrder
      updateStatus(id:String!,orderStatus:String!): RestaurantOrder
      uploadToken(id:String!,pushToken:String!):User
    resetPassword(password:String!,token:String!):ResetPasswordResult
     createRider(riderInput:RiderInput!): Rider
    editRider(riderInput:RiderInput!): Rider
   deleteRider(id:String!):Rider
    toggleAvailablity(id:String):Rider
    assignRider(id:String!,riderId:String!):RestaurantOrder
      updatePaymentStatus(id:String!,status:String!): RestaurantOrder
       createOffer(offer:OfferInput!): Offer
        editOffer(offer:OfferInput!): Offer
       deleteOffer(id:String!): Offer
     createOptions(optionInput:CreateOptionInput): RestaurantDetails
      createAddons(addonInput:AddonInput): RestaurantDetails
    editAddon(addonInput:editAddonInput):RestaurantDetails
        deleteAddon(id:String!,restaurant:String!):RestaurantDetails
     deleteOption(id:String!,restaurant:String!):RestaurantDetails
        editOption(optionInput:editOptionInput):RestaurantDetails
       createCoupon(couponInput:CouponInput!):Coupon
          editCoupon(couponInput:CouponInput!):Coupon
      deleteCoupon(id:String!):Coupon
     createCuisine(cuisineInput:CuisineInput!): Cuisine
         editCuisine(cuisineInput:CuisineInput!): Cuisine
     deleteCuisine(id:String!): Cuisine
     createBanner(bannerInput:BannerInput!): Banner
    editBanner(bannerInput:BannerInput!): Banner
    deleteBanner(id:String!): Banner
    createTipping(tippingInput:TippingInput!): Tipping
        editTipping(tippingInput:TippingInput!): Tipping
    createTaxation(taxationInput:TaxationInput!): Taxation
        editTaxation(taxationInput:TaxationInput!): Taxation
     createVendor(vendorInput:VendorInput):Vendor
         editVendor(vendorInput:VendorInput):Vendor
       editRestaurant(restaurant:RestaurantProfileInput!):RestaurantProfile
        createZone(zone:ZoneInput!): Zone
      editZone(zone:ZoneInput!): Zone
    deleteZone(id:String!): Zone
      vendorResetPassword(oldPassword: String!, newPassword: String!):String
     deleteRestaurant(id:String!): RestaurantProfile
      updateTimings(id:String!,openingTimes:[TimingsInput]): RestaurantProfile
     sendNotificationUser(notificationTitle:String, notificationBody: String!): String
       updateCommission(id:String!,commissionRate:Float!):RestaurantType
       createRestaurant(restaurant:RestaurantInput!,owner:ID!): RestaurantProfile
       updateDeliveryBoundsAndLocation( id: ID!
        boundType: String!
        bounds: [[[Float!]]]
        circleBounds: CircleBoundsInput
        location: CoordinatesInput!
        address: String
        postCode: String
        city: String): DeliveryBoundsResult
          updateWithdrawReqStatus(id:ID!,status:String!): UpdateWithdrawRequestResult
          login(email:String!, password: String!, userType:Role!): AuthPayload
}
type DeliveryBoundsResult{
    success: Boolean!
    message: String
    data:UpdatedDeliveryBounds
}
type UpdatedDeliveryBounds{
        id: Int
       deliveryBounds: DeliveryBounds
        location: Location
}
type ResetPasswordResult{
    result:String
}
type UpdateWithdrawRequestResult{
    success:Boolean!
    message:String
   data: UpdatedWithdrawRequest
}
type UpdatedWithdrawRequest{
   rider: RiderWithdraw
    withdrawRequest:WithdrawRequest
}

type Subscription {
    subscribePlaceOrder(restaurant:String!): SubscribePlaceOrderResult
    subscriptionOrder(id:String!): SubscriptionOrderResult
}
type SubscribePlaceOrderResult{
    userId:String
    origin:String
     order: RestaurantOrder
}
type SubscriptionOrderResult{
    id:String
    orderStatus: String
     rider: RiderType
}
 input OfferInput {
          id: Int
          name: String!
           tag: String
            restaurants:[String!]
        }
        input RiderInput {
             id: Int
             name: String!
              username: String!
              password: String!
              phone: String!
              zone:String!
        }
         input BannerInput {
            id: Int
            title: String!
            description: String
            action: String
            file: String
           screen: String
           parameters: String
       }
        input FoodInput {
              id: Int
                title: String!
               description: String
               restaurant: String!
               category: String!
               variations: [VariationInput!]
               image: String
               isActive: Boolean
        }
        input CategoryInput{
           id: Int
            title: String
            restaurant: String
        }
       input TimeInput{
           startTime:String!
            endTime:String!
        }
       input ZoneInput {
           id: Int
             title: String!
            description: String
          location:CoordinatesInput
             isActive: Boolean
       }
     input CoordinatesInput{
        coordinates:[Float!]!
     }
`;
export default typeDefs;