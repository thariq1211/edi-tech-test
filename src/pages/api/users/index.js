import conn from '../../../lib/db'

export default async (req, res) => {
    if (res.method === 'POST') {
        try {
            const query = 'INSERT INTO tbl_user (namalengkap, username, password) VALUES($1,$2,$3)'
            const body = [req.body.content]
            const result = await conn.query(query, body)
            if (result) return res.status(200).json({ result: 'success' })
        } catch (error) {
            return res.status(500)
        }
    } if (res.method === 'DELETE') {
        try {
            const id = req.body.id
            const query = `DELETE FROM tbl_user where userid=${id}`
            const result = await conn.query(query, body)
            if (result) return res.status(200).json({ result: 'delete success' })
        } catch (error) {
            return res.status(500)
        }
    } else {
        try {
            const query = 'SELECT * FROM tbl_user'
            const result = await conn.query(query);
            if (result) return res.status(200).json({ data: result })
        } catch ( error ) {
            return res.status(500);
        }
    }
  };