import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@states/store";
import { v4 as uuid } from "uuid";

interface CartItem {
  isVeg: boolean;
  id: string;
  name: string;
  price: number;
  quantity: number;
  cartPrice?: number;
  isCustomizable?: boolean;
  customizations?: any[];
}

interface RestaurantDetails {
  id: string;
  name: string;
  discount: string;
  discountAmount: string;
  time: string;
  rating: number;
  imageUrl: string;
}

interface RestaurantCart {
  restaurant: RestaurantDetails;
  items: CartItem[];
}

interface CartState {
  carts: RestaurantCart[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
      }>
    ) => {
      const { restaurant, item } = action.payload;
      // Find if the restaurant already exists in the cart
      const existingRestaurantCart = state.carts.find(
        (cart) => cart?.restaurant?.id === restaurant?.id
      );
      if (existingRestaurantCart) {
        // Check if the item already exists in the restaurant's cart
        const existingItem = existingRestaurantCart?.items?.find(
          (cartItem) => cartItem?.id === item?.id
        );
        if (existingItem) {
          // If item exists, increase its quantity
          existingItem.quantity += 1;
          existingItem.cartPrice = (item.cartPrice || 0) + existingItem?.price;
        } else {
          // If item does not exist, add it to the items array
          existingRestaurantCart.items.push({ ...item, quantity: 1, cartPrice: item?.price });
        }
      } else {
        // If restaurant does not exist, add new restaurant cart
        state.carts.push({
          restaurant,
          items: [{ ...item, quantity: 1, cartPrice: item?.price }],
        });
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
      }>
    ) => {
      const { restaurant_id, itemId } = action.payload;
      const restaurantCart = state?.carts?.find(
        (cart) => cart?.restaurant?.id === restaurant_id
      );
      if (!restaurantCart) return;
      const itemIndex = restaurantCart.items?.findIndex(
        (item) => item?.id === itemId);

      if (itemIndex !== -1) {
        const item = restaurantCart?.items[itemIndex]
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.cartPrice = (item.cartPrice || 0) - item?.price
        } else {
          restaurantCart.items.splice(itemIndex, 1)
        }
      }
      if (restaurantCart.items.length === 0) {
        state.carts = state.carts.filter(
          cart => cart.restaurant.id !== restaurant_id,
        )
      }
    },

    clearAllCarts: (state) => {
      state.carts = [];
    },

    clearRestaurantCart: (
      state,
      action: PayloadAction<{ restaurant_id: string }>
    ) => {
      const { restaurant_id } = action.payload;
      state.carts = state.carts.filter(
        (cart) => cart?.restaurant?.id !== restaurant_id
      );
    },

    addCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant: RestaurantDetails;
        item: CartItem;
        customization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        };
      }>
    ) => {
      const { restaurant, item, customization } = action.payload;
      // Find or create restaurant cart
      let existingRestaurantCart = state.carts.find(
        (cart) => cart.restaurant.id === restaurant.id
      );

      if (existingRestaurantCart) {
        const existingItem = existingRestaurantCart?.items?.find(
          (cartItem) => cartItem?.id === item?.id) as any;

        if (existingItem) {
          const existingCustomizationIndex =
            existingItem?.customizations?.findIndex(
              (cust: any) =>
                JSON.stringify(cust.customizationOptions) ===
                JSON.stringify(customization.customizationOptions)
            );

          if (
            existingCustomizationIndex !== undefined &&
            existingCustomizationIndex !== -1
          ) {
            const existingCustomization =
              existingItem?.customizations[existingCustomizationIndex];
            existingCustomization.quantity += customization?.quantity;
            existingCustomization.cartPrice += customization?.price;
          }
          else {
           
            const newCustomizationId = uuid();
            existingItem?.customizations?.push({
              id: newCustomizationId,
              ...customization,
              quantity: customization?.quantity,
              cartPrice: customization?.price,
              price: customization?.price / customization?.quantity,
            });
          }
          existingItem.quantity += customization?.quantity;
          existingItem.cartPrice =
            (existingItem?.cartPrice || 0) + customization?.price;
        } else {
          const newCustomizationId = `c1`;
          existingRestaurantCart.items.push({
            ...item,
            quantity: customization.quantity,
            cartPrice: customization.price,
            customizations: [{
              id: newCustomizationId,
              ...customization,
              quantity: customization.quantity,
              cartPrice: customization.price,
              price: customization.price / customization.quantity
            }],

          });
        }

      } else {
        const newCustomizationId = `c1`;
        state.carts.push({
          restaurant,
          items: [{
            ...item,
            quantity: customization.quantity,
            cartPrice: customization?.price,
            customizations: [{
              id: newCustomizationId,
              ...customization,
              quantity: customization?.quantity,
              cartPrice: customization.price,
              price: customization.price / customization.quantity
            }],
          }]
        });
      }
    },

    updateCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        itemId: string;
        customizationId: string;
        newCustomization: {
          quantity: number;
          price: number;
          customizationOptions: any[];
        }
      }>
    ) => {
      const { restaurant_id, itemId, customizationId, newCustomization } =
        action.payload;

      const restaurantCart = state.carts.find(
        cart => cart.restaurant.id === restaurant_id,
      );
      if (!restaurantCart) return;

      const item = restaurantCart.items.find(
        cartItem => cartItem.id === itemId,
      );
      if (!item || !item.customizations) return;

      const matchingCustomizationIndex = item?.customizations?.findIndex(
        (cust: any) =>
          cust?.id === customizationId &&
          JSON.stringify(cust.customizationOptions) ===
          JSON.stringify(newCustomization.customizationOptions),
      );

      const targetCustomizationIndex = item?.customizations?.findIndex(
        cust => cust.id === customizationId,
      );

      if (targetCustomizationIndex === -1) return;

      const targetCustomization =
        item?.customizations[targetCustomizationIndex];

      if (matchingCustomizationIndex !== -1) {
        const matchingCustomization =
          item.customizations[matchingCustomizationIndex];

        matchingCustomization.quantity += newCustomization?.quantity;
        matchingCustomization.cartPrice += newCustomization?.price;

        item?.customizations?.splice(targetCustomizationIndex, 1);

      } else {
        targetCustomization.quantity = newCustomization.quantity;
        targetCustomization.cartPrice = newCustomization.price;
        targetCustomization.price =
          newCustomization.price / newCustomization.quantity;
        targetCustomization.customizationOptions = [
          newCustomization.customizationOptions,
        ];
      }

      item.quantity = item?.customizations?.reduce(
        (sum, cust) => sum + cust.quantity,
        0,
      );
      item.cartPrice = item?.customizations?.reduce(
        (sum, cust) => sum + cust.cartPrice,
        0,
      );




    },
    removeCustomizableItem: (
      state,
      action: PayloadAction<{
        restaurant_id: string;
        customizationId: string;
        itemId: string;
      }>
    ) => {
      const { restaurant_id, customizationId, itemId } = action.payload;
      const restaurantCart = state?.carts?.find(
        (cart) => cart.restaurant.id === restaurant_id
      );
      if (!restaurantCart) return;
      const item = restaurantCart?.items?.find(
        (cartItem) => cartItem?.id === itemId);
      if (!item) return;

      const customizationIndex = item?.customizations?.findIndex(
        cust => cust?.id === customizationId
      ) as number;
      if (customizationIndex !== -1 && item?.customizations) {
        const customization = item.customizations[customizationIndex];
        if (customization?.quantity > 1) {
          customization.quantity -= 1;
          customization.cartPrice -= customization?.price;
        } else {
          item?.customizations?.splice(customizationIndex, 1);
        }
        item.quantity -= 1;
        item.cartPrice = (item?.cartPrice || 0) - customization?.price;
      }

      if (item?.quantity === 0 || item?.customizations?.length === 0) {
        restaurantCart.items = restaurantCart?.items?.filter(
          cartItem => cartItem.id !== itemId,
        );
      }

      if (restaurantCart?.items?.length === 0) {
        state.carts = state.carts?.filter(
          cart => cart?.restaurant?.id !== restaurant_id,
        );
      }

    }
  }
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearAllCarts,
  clearRestaurantCart,
  addCustomizableItem,
  updateCustomizableItem,
  removeCustomizableItem
} = cartSlice.actions;

// Selector to get the entire cart state from the Redux store
export const selectCart = (state: RootState) => state.cart;

// Selector factory to get the cart for a specific restaurant
// Uses createSelector for memoization and performance optimization
export const selectRestaurantCart = (restaurantId: string) =>
  // createSelector creates a memoized selector
  // This means the selector will only recompute when its input changes,
  // avoiding unnecessary recalculations and improving performance
  createSelector(
    // Input selector: finds the cart for the given restaurantId
    (state: RootState) =>
      state.cart.carts.find(cart =>
        cart.restaurant.id === restaurantId
      ),
    // Output selector: returns a copy of the items array if the cart exists, otherwise an empty array
    restaurantCart => (restaurantCart ? [...restaurantCart.items] : [])
  );

// Selector factory to get a specific item from a restaurant's cart
// Also uses createSelector for memoization
export const selectRestaurantCartItem =
  (restaurantId: string, itemId: string) =>
    createSelector(
      // Input selector: finds the items array for the given restaurantId
      (state: RootState) =>
        state.cart.carts
          .find(cart => cart.restaurant.id === restaurantId)?.items,
      // Output selector: finds the item with the given itemId, or returns null if not found
      items => items?.find(item => item?.id === itemId) || null
    );

/*
Why use createSelector?
- createSelector (from the 'reselect' library) creates memoized selectors.
- Memoization means the selector will only recompute its result if its input changes.
- This improves performance, especially in large React/Redux apps, by preventing unnecessary recalculations and re-renders.
- It also helps keep selectors pure and efficient.
*/

export default cartSlice.reducer;
