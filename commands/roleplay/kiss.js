const RoleplayCommand = require('../../structures/commands/Roleplay');
const { KISS_ALBUM_ID } = process.env;

module.exports = class KissCommand extends RoleplayCommand {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'roleplay',
			memberName: 'kiss',
			description: 'Kisses a user.',
			clientPermissions: ['ATTACH_FILES'],
			albumID: KISS_ALBUM_ID,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to roleplay with?',
					type: 'user'
				}
			]
		});
	}

	generateText(msg, user) {
		return `_**${msg.author.username}** kisses **${user.username}**._`;
	}
};
