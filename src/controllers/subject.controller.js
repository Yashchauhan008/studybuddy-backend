const Subject = require('../models/subject.model');

const newSubject = async (req,res)=>{
    const { name, description, imgUrl } = req.body;

    try {
        const existingSubject = await Subject.findOne({name});

        if(existingSubject){
            return res.status(400).json({ error: 'subject already exists' });
        }

        const subject = new Subject({name,description,imgUrl})
        await subject.save()

        res.status(201).json({ message: 'subject registered successfully' });
    } catch (error) {
        res.status(500).json({error:"internalserver error"})
    }
}

module.exports = {newSubject}