const express = require('express')
const multer = require('multer')
const path = require('path');
const fs = require('fs');



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        const uploadDir = path.join(__dirname, '../upload');
        if(!fs.existsSync(uploadDir))
        {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null,uploadDir)
    },
    filename:(req,file,cb)=>
    {
        cb(null, Date.now() + path.extname(file.originalname));

    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|svg/;

      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Invalid file type, only JPEG, JPG, PNG ,svg are allowed.'));
      }
    }
  });

  module.exports={upload}
