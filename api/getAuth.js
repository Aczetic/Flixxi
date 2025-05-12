export default async function (req, res) {
  res.status(200).json({ auth: process.env.AUTHORIZATION });
}
