const multer = require("multer");
const path = require("path");
const fs = require("fs");

/*
----------------------------------
CREATE UPLOADS FOLDER IF MISSING
----------------------------------
*/

const uploadPath = path.join(
  __dirname,
  "../uploads"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

/*
----------------------------------
MULTER STORAGE
----------------------------------
*/

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname.replace(
          /\s+/g,
          "_"
        )
    );

  },

});

/*
----------------------------------
FILE FILTER
----------------------------------
*/

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "application/pdf",

    "image/jpeg",

    "image/jpg",

    "image/png",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, JPG, PNG and DOCX files are allowed"
      ),
      false
    );

  }
};

/*
----------------------------------
UPLOAD CONFIG
----------------------------------
*/

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },

});

module.exports = upload;