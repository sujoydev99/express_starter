const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// import schema/ db conn
const Admin = require("../../db_init/models/Admin");
const pdb = require("../../db_init/dbConn").pdb;

// import token generator
const generateToken = require("../../middlewares/token").generateToken;

// @route   post api/v1/auth
// @desc    generate jwt for authentication
// @access  private
router.post("/", async (req, res, next) => {
  try {
    var admin_user = await Admin.findOne({ username: req.body.username });
    if (!admin_user) {
      throw {
        statusCode: 404,
        customMessage: "Account does not exist",
      };
    }
    if (!bcrypt.compareSync(req.body.password, admin_user.password)) {
      throw {
        statusCode: 401,
        customMessage: "Invalid credentials",
      };
    }
    const token = generateToken({
      username: admin_user.username,
    });
    res.status(200).json({
      status: 200,
      message: "Logged in succcessfully",
      token: `Bearer ${token}`,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const query = "select * admins where email=${email}";
    pdb
      .any(query, { email: req.body.email })
      .then((result) => {
        if (result.length === 0) {
          throw {
            statusCode: 404,
            customMessage: "No user email found",
          };
        } else if (!bcrypt.compareSync(req.body.password, result[0].password)) {
          throw {
            statusCode: 404,
            customMessage: "Invalid email id and password",
          };
        } else {
          let data = result[0];
          delete data.password;
          data["role"] = "seeker";
          const token = generateToken({
            ...data,
          });
          res.status(200).json({
            status: 200,
            message: "Logged in succcessfully",
            token: `Bearer ${token}`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/*url params 

router.get("/:id", (req,res,next)=>{
  let id = req.params.id
})

*/
