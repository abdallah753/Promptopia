import dbConnect from "@lib/dbConnect";
import User from "@models/user";
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from "bcryptjs";



async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect();
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ massege: 'This User Already Exist' });
    }
    const hashedPassword = await hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      result: newUser,
    });
  } else {
    res.status(405).json({ Error: 'Method Not Allowed' });
  }
}

export default handler;






/*, (error : unknown , data: TypeOfUser) => {
        if (error && error instanceof mongoose.Error.ValidationError) {
            //mongo db will return array
            // but we only want to show one error at a time

            for (let field in error.errors) {
                const msg = error.errors[field].message
                return res.status(409).json({ error: msg })
            }
        }

        const user = {
            _id : data._id,
            name: data.name,
            email: data.email
            
        }
        return res.status(201).json({
            success: true,
            user
        })
    } */