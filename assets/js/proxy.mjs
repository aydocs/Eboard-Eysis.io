import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/mail', async (req, res) => {
    // Extracting query parameters from the request
    const { mailAdresleri, mesaj } = req.query;

    try {
        const response = await fetch('https://digipo.web.tr/api/mail/?tema=mail&data={"mailAdresleri":"' + mailAdresleri + '","mesaj":"' + mesaj + '"}&fromMail=mail@bgs.io&fromName=EysisBoard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        if (!response.ok) {
            throw new Error('API hatası');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Hata oluştu.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy sunucusu ${PORT} portunda çalışıyor...`);
});
