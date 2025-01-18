const catagories = require("../categories.json");
const weather = require("../data/weather.json");
const songs = require("../data/songs.json");
const words = require("../data/words.json");
const quotes = require("../data/harry.json");
const getTimeAndDate = require("../utils/getTimeAndDate");

module.exports = function QueryCreateMessage(ctx, next) {
    if (ctx, next) {
        try {

            const createData = ctx.request.body;

            const newMessage = {
                date: getTimeAndDate(),
                userId: createData.userId,
                id: createData.id,
                message: createData.message,
                type: 'different',
                city: createData.city,
                pin: false
            };

            catagories.forEach(category => {
                if (!['@chaos: погода', '@chaos: слово', '@chaos: песня', '@chaos: доллар', '@chaos: магическая цитата'].includes(createData.message)) {
                    if (createData.message.includes('http://') || createData.message.includes('https://')) {
                        if (!category.link) {
                            category.link = [];
                        }

                        if (!category.allMessages) {
                            category.allMessages = [];
                        }

                        newMessage.type = 'link';

                        category.link.unshift(newMessage);
                        category.allMessages.unshift(newMessage);

                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, message: `Success send message and added in link category: ${newMessage.id};)`, status: 'ok' });
                    } else {
                        if (!category.allMessages) {
                            category.allMessages = [];
                        }
                        category.allMessages.unshift(newMessage);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, message: `Success send message and added in allMessages category: ${newMessage.id};)`, status: 'ok' });
                    }
                } else {
                    if (createData.message.includes('@chaos: погода')) {
                        const messageBot = {
                            date: getTimeAndDate(),
                            userId: createData.userId,
                            id: crypto.randomUUID(),
                            message: "Наверное прогноз погоды - " + "Температура " + Math.floor(Math.random() * (40 - (-20) + 1)) + (-20) + ", Погода - " + weather.weather[Math.floor(Math.random() * weather.weather.length)],
                            type: "different",
                            city: "Matrix",
                            pin: false
                        }
                        if (!category.allMessages) {
                            category.allMessages = [];
                        }
                        category.allMessages.unshift(newMessage);
                        category.allMessages.unshift(messageBot);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, messageBot, message: `Success send message, added in allMessages category and the bot's response has been received: user message id - ${newMessage.id}, bot message id - ${messageBot.id};)`, status: 'ok' });
                    } else if (createData.message.includes("@chaos: слово")) {
                        const messageBot = {
                            date: getTimeAndDate(),
                            userId: createData.userId,
                            id: crypto.randomUUID(),
                            message: words.words[Math.floor(Math.random() * words.words.length)],
                            type: "different",
                            city: "Matrix",
                            pin: false
                        }

                        if (!category.allMessages) {
                            category.allMessages = [];
                        }
                        category.allMessages.unshift(newMessage);
                        category.allMessages.unshift(messageBot);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, messageBot, message: `Success send message, added in allMessages category and the bot's response has been received: user message id - ${newMessage.id}, bot message id - ${messageBot.id};)`, status: 'ok' });
                    } else if (createData.message.includes("@chaos: песня")) {
                        const messageBot = {
                            date: getTimeAndDate(),
                            userId: createData.userId,
                            id: crypto.randomUUID(),
                            message: songs.Songs[Math.floor(Math.random() * songs.Songs.length)],
                            type: "different",
                            city: "Matrix",
                            pin: false
                        }

                        if (!category.allMessages) {
                            category.allMessages = [];
                        }
                        category.allMessages.unshift(newMessage);
                        category.allMessages.unshift(messageBot);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, messageBot, message: `Success send message, added in allMessages category and the bot's response has been received: user message id - ${newMessage.id}, bot message id - ${messageBot.id};)`, status: 'ok' });
                    } else if (createData.message.includes("@chaos: доллар")) {
                        const messageBot = {
                            date: getTimeAndDate(),
                            userId: createData.userId,
                            id: crypto.randomUUID(),
                            message: "Наверное курс доллара - " + (Math.floor(Math.random() * (50 - 10 + 1)) + 10) + "руб.",
                            type: "different",
                            city: "Matrix",
                            pin: false
                        }

                        if (!category.allMessages) {
                            category.allMessages = [];
                        }

                        category.allMessages.unshift(newMessage);
                        category.allMessages.unshift(messageBot);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, messageBot, message: `Success send message, added in allMessages category and the bot's response has been received: user message id - ${newMessage.id}, bot message id - ${messageBot.id};)`, status: 'ok' });
                    } else if (createData.message.includes("@chaos: магическая цитата")) {
                        const messageBot = {
                            date: getTimeAndDate(),
                            userId: createData.userId,
                            id: crypto.randomUUID(),
                            message: 'Цитата из Гарри Поттера: ' + quotes.Quotes[Math.floor(Math.random() * quotes.Quotes.length)],
                            type: "different",
                            city: "Matrix",
                            pin: false
                        }

                        if (!category.allMessages) {
                            category.allMessages = [];
                        }
                        category.allMessages.unshift(newMessage);
                        category.allMessages.unshift(messageBot);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ messageUser: newMessage, messageBot, message: `Success send message, added in allMessages category and the bot's response has been received: user message id - ${newMessage.id}, bot message id - ${messageBot.id};)`, status: 'ok' });
                    }
                }
            })
        } catch (error) {
            console.error(`Error sending message: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error sending message: ${error.message}`, status: 'error' });
        }
    }
}