import express from "express";
import { sessionCheck } from "../controller/users/session.js";
import User from "../model/User.js";

const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
  try {
    console.log({ req: req.body })
    // const selectors = new Sector({name:'mehedi'})
    // const response = await selectors.save()

    res.status(200).json({ response: "" });
  }
  catch (err) {
    res.status(500).json({ err });
  }
});

userRoute.post('/',sessionCheck, async (req, res, next) => {
  try {
    // console.log(req.body)
    req.session.authenticated = true;
    req.session.save();
    console.log(req.session)
    
    const { name, selector_id, agree_of_terms, _id } = req.body;

    if (name && selector_id && agree_of_terms) {

      if (_id) {
        const response = await User.findByIdAndUpdate(_id, {
          name,
          selector_id,
          agree_of_terms,
        }, { returnOriginal: false })
        return res.status(200).json({ response: response });
      };

      const selectors = new User({
        name,
        agree_of_terms,
        selector_id
      })
      const response = await selectors.save()

      res.status(200).json({ response });
    }
    else res.status(404).json({ err: 'Please fill all required fields' });

  }
  catch (err) {
    res.status(500).json({ err });
  }
});


export default userRoute;