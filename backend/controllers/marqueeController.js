import marqueeModal from "../models/marqueeModal.js"

const updateMarquee = async (req, res) => {
    const { text } = req.body;
    try {
        const marquee = await marqueeModal.findOne();
        if (marquee === null) {
            const marqueetext = {
                text
            }
            const newmarquee = new marqueeModal(marqueetext)
            await newmarquee.save();
            return res.status(200).json({ success: true, message: "sucess", newmarquee });
        }

        marquee.text = text;
        await marquee.save();

        res.json({ success: true, message: "Marquee updated successfully", marquee });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getMarquee = async (req, res) => {
    try {
        const marquee = await marqueeModal.findOne();
        res.json({ success: true, marquee });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export {
    updateMarquee, getMarquee
};