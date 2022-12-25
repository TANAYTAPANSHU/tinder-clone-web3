import { client } from '../../lib/sanity'

const saveLike = async (req, res) => {
  try {
    await client
      .patch("0xb4800cdfa6365f2af3e392fc4b7262cd872d8446")
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: `${req.body.likedUser} - ${req.body.currentUser}`,
          _ref: "0xb4800cdfa6365f2af3e392fc4b7262cd872d8445",
          _type: 'reference',
        },
      ])
      .commit()

    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error })
  }
}

export default saveLike