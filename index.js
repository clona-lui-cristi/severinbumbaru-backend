const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mysql = require("mysql");
const dbconnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "bumbaru",
    host: "localhost",
    connectionLimit: 5,
});


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  dbconnection.query("SELECT * FROM formular", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/formular", (req, res) => {
    const domeniu = req.body.domeniu;
    const specializare = req.body.specializare;
    const prenume_init_t = req.body.prenume_init_t;
    const nume = req.body.nume;
    const sex = req.body.sex;
    const cnp = req.body.cnp;
    const data_n = req.body.data_n;
    const domiciliu = req.body.domiciliu;
    const cetatenie = req.body.cetatenie;
    const telefon = req.body.telefon;
    const email = req.body.email;
    const liceu = req.body.liceu;
    const an_absolvire = req.body.an_absolvire;
    const media = req.body.media;
    const nr_matricol = req.body.nr_matricol;

    dbconnection.query(
      "INSERT INTO formular (domeniu_licenta, specializare, prenume_init_t, nume, sex, cnp, data_n, domiciliu, cetatenie, telefon, email, liceu, an_absolvire, media, nr_matricol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        domeniu,
        specializare,
        prenume_init_t,
        nume,
        sex,
        cnp,
        data_n,
        domiciliu,
        cetatenie,
        telefon,
        email,
        liceu,
        an_absolvire,
        media,
        nr_matricol,
      ], (err, results) => {
          if(err){
              console.log(err);
              res.status(500).send("Error");
          } else {
              dbconnection.query("SELECT * FROM formular", (err,results) => {
                  if(err){
                      console.log(err);
                      res.status(500).send("Error");
                  } else {
                      res.status(200).send(results)
                  }
              })
          }
      }
    );

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});