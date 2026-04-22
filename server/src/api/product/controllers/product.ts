export default {
  async find(ctx: { query: Record<string, unknown>; body?: unknown }) {
    ctx.body = await strapi.service("api::product.product").find(ctx.query);
  },

  async findOne(ctx: { params: { id: string }; body?: unknown }) {
    ctx.body = await strapi.service("api::product.product").findOne(ctx.params.id);
  },

  async categories(ctx: { body?: unknown }) {
    ctx.body = await strapi.service("api::product.product").categories();
  },
};
