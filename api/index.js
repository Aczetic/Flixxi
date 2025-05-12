export default handler = async (req, res) => {
  return res.send(process.env.AUTHORIZATION);
};
