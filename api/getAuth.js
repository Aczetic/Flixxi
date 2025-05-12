export default handler = async (req, res) => {
  res.send(process.env.AUTHORIZATION);
};
