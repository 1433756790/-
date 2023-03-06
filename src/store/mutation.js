export default {
  addCart(state, payload) {
    state.cartCount = payload.count;
  },
  updateCartItemIds(state, data) {
    state.cartItemIds = data;
  },
};
