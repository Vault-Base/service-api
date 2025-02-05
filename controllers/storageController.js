import storageModel from "../model/storageModel.js";
import { v4 as uuidv4 } from 'uuid';
const createKey = async()=>{
    let reference;
  let isUnique = false;

  while (!isUnique) {
    reference = uuidv4().replace(/-/g, '').substring(0, 12); // Generates a 12-character reference
    const existingDoc = await storageModel.findOne({ reference });

    if (!existingDoc) {
      isUnique = true;
    }
  }

  return reference;
}

export const sendImage = async (req,res)=>{
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { uid } = req.body;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${uid}/${req.file.filename}`;
    
    const key = await createKey();
    await storageModel.create({uid:uid,imagelink:fileUrl,key:key});
    res.status(201).json({ 
        message: 'File uploaded successfully', 
        key ,
        fileUrl
    });
}
export const getImage = async (req, res) => {
  const { uid, key } = req.query;
  console.log("ok");

  if (!key) {
      return res.status(400).json({ error: 'No reference found' });
  }

  try {
      const response = await storageModel.findOne({ key: key });

      if (!response) {
          return res.status(404).json({ message: "Key not found" });
      }

      const fileUrl = response.imagelink;
      res.status(200).json({ 
          message: 'File retrieved successfully', 
          fileUrl 
      });
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
  }
};





