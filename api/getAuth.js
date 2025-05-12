export default async function (req, res) {
  res.send(process.env.AUTHORIZATION);
}
