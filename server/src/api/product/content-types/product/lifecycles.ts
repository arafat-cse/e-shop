export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    ensureGallery(event.params.data);
  },

  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    ensureGallery(event.params.data);
  },
};

function ensureGallery(data: Record<string, unknown>) {
  if (!Array.isArray(data.gallery) || data.gallery.length === 0) {
    data.gallery = data.image ? [data.image, data.image] : [];
  }
}
