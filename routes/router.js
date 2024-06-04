const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

// gpt api key를 발급받고 env 파일에 설정 해주어야 사용가능합니다 
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

async function main(content) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // 가격이 합리적인 3.5 버전 사용 
            messages: [
                { role: 'system', content: '한글을 영어로 번역해' }, // 한국어를 영어로 번역하게 설정 
                { role: 'user', content: content },
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error with OpenAI API request:', error.message);
        return 'Error translating text';
    }
}

router.get('/', (req, res) => {
    res.render('index', { translation: null, userContent: null });
});

router.post('/', async (req, res) => {
    const user_content = req.body.content;

    if (!user_content) {
        return res.status(400).json({ error: 'No content provided' });
    }

    try {
        const translation = await main(user_content);
        res.render('index', { translation, userContent: user_content });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process the request' });
    }
});

router.use((req, res, next) => {
    res.status(404).send('Page not found');
});

module.exports = router;
