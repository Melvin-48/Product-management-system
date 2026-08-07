export default async (req, res) => {
  const { reqHandler } = await import('../dist/Product-management-system/server/server.mjs');
  return reqHandler(req, res);
};