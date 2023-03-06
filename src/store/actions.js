import { getCart } from "../service/cart";

export default {
  async updateCart(ctx) {
    const { data: res } = await getCart();
    ctx.commit("addCart", {
      count: res.data.length || 0,
    });
  },
};
