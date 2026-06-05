const config = {
  backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  imgBBApiKey: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
  itemsPerPage: parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE),
};

export default config;
