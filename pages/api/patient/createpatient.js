import axios from "axios";
import bcrypt from "bcrypt";

export default async function handler(req, res, next) {
  const { method } = req;
  const salt = await bcrypt.genSalt(10);

  switch (method) {
    case "GET":
      break;

    case "POST":
      const url = req.body.url;
      const data = req.body;
      // const hashedPass = await bcrypt.hash(data.password, 2);
      // const samePass = await bcrypt.compare(data.password, hashedPass);
      // console.log(samePass);

      // // data.passhash = hashedPass;

      // console.log(data.password);

      try {
        const result = await axios({
          method: "post",
          headers: {
            "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
          },
          url: url,
          data: JSON.stringify({
            username: data.username,
            passhash: data.password,
            name: data.name,
            vorname: data.vorname,
            geburtsdatum: data.geburtsdatum,
            geschlecht: data.geschlecht,
            adresse: data.adresse,
            telefonnummer: parseInt(data.telefonnummer),
            email: data.email,
            dsgvo: data.dsgvo,
            letzteaenderung: data.letzteaenderung,
            krankenkasse: data.krankenkasse,
            loeschanfrage: data.loeschanfrage,
          }),
        });
        res.status(result.status).json(result.data);
      } catch (error) {
        console.log(error);
        res.status(error.status).json(error.response.data);
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
