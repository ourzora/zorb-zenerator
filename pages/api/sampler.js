import * as Vibrant from 'node-vibrant'

export default async (req, res) => {
  const { image } = req.query;
  const palette = await Vibrant.from(image).getPalette()
  res.json({ palette })
}
