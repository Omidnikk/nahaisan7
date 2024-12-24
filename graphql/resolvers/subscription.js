const pubsub = {
    publish: (key, value) => {
       pubsub[key] = value
    } ,
    subscribe: async (key, func) => {
        while (true){
            if(pubsub[key]){
                func(pubsub[key]);
                pubsub[key] = undefined;
            }
             await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

const subscriptionResolvers = {
  subscribePlaceOrder: {
      subscribe: async(_, {restaurant}) => {
        return pubsub.subscribe("subscribePlaceOrder", (payload) => {
              if(payload && payload.order.restaurantId === restaurant){
                 return payload;
              }
        });
       },
    },
   subscriptionOrder: {
        subscribe: async (_, { id }) => {
         return pubsub.subscribe("subscriptionOrder", (payload) => {
           if(payload && payload.id === id){
                return payload;
            }
         });
        },
   }
};
export default subscriptionResolvers;