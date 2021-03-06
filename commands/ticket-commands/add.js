const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message
} = require("discord.js");
const Data = require("../../models/ticket-user");

module.exports = {
    name: 'add',
    aliases: [],
    usage: '',
    description: 'Add User to the Ticket',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    ownerOnly: false,
    toggleOff: false,

    run: async (client, message, args, ee, prefix) => {
        try {

            if (message.member.roles.cache.has(config.ticket_extra.ticket_supporter_role)) {

                Data.findOne({
                    channelID: message.channel.id
                }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return message.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`No Data Found For This Ticket!`)
                            .setColor(ee.wrongcolor)
                        ]
                    })

                    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                    if (!user) return message.reply({
                        embeds: [new MessageEmbed()
                            .setDescription(`Please Mention the Member You Want to add to the ticket!`)
                            .setColor(ee.wrongcolor)
                        ]
                    })

                    message.channel.permissionOverwrites.edit(user, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                    });

                    const Embed = new MessageEmbed()
                        .setDescription(`Added ${user} to the Ticket!`)
                        .setColor(ee.color)

                    message.reply({
                        embeds: [Embed]
                    })

                })
            } else {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.allEmojis.x} **You do not have required roles to use \`${prefix}add\` command!**`)
                        .setColor(ee.wrongcolor)
                    ]
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

