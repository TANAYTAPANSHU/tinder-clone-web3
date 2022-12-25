import conn from '../../../lib/db'

export default async (req, res) => {
    try {
        const query = 'INSERT INTO  test_users(username) VALUES ($1)'
        const values = [req.body.content]
      const result = await conn.query(
          query,
          values
      );
  } catch ( error ) {
      console.log( error );
  }
  
  
  };