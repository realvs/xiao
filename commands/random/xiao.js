const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { IMGUR_KEY, XIAO_ALBUM_ID } = process.env;

module.exports = class XiaoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'xiao',
			aliases: ['xiao-pai', 'iao'],
			group: 'random',
			memberName: 'xiao',
			description: 'Responds with a random image of Xiao Pai.',
			clientPermissions: ['ATTACH_FILES']
		});

		this.cache = null;
	}

	async run(msg) {
		try {
			const xiao = await this.random();
			if (!xiao) return msg.reply('This album has no images...');
			return msg.say({ files: [xiao] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async random() {
		if (this.cache) return this.cache[Math.floor(Math.random() * this.cache.length)].link;
		const { body } = await request
			.get(`https://api.imgur.com/3/album/${XIAO_ALBUM_ID}`)
			.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
		if (!body.data.images.length) return null;
		this.cache = body.data.images;
		setTimeout(() => { this.cache = null; }, 3.6e+6);
		return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
	}
};
