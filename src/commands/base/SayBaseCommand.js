/* eslint-disable max-statements */
const { SlashCommand } = require('@greencoast/discord.js-extended');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('@greencoast/logger');
const { getCantConnectToChannelReason } = require('../../utils/channel');
const { cleanMessage } = require('../../utils/mentions');
const fs = require('fs');
const bestemmie = JSON.parse(fs.readFileSync('bestemmie.json'));

class SayBaseCommand extends SlashCommand {
  constructor(client, options) {
    super(client, {
      name: options.name,
      description: options.description,
      emoji: options.emoji,
      group: options.group,
      guildOnly: true,
      dataBuilder: new SlashCommandBuilder()
        .addStringOption((input) => {
          return input
            .setName('message')
            .setDescription('The message to say in your voice channel.')
            .setRequired(true);
        })
    });
  }

  getProviderName() {
    throw new Error('getProviderName() not implemented!');
  }

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const localizer = this.client.localizer.getLocalizer(interaction.guild);
    const ttsPlayer = this.client.getTTSPlayer(interaction.guild);
    const connection = ttsPlayer.voice.getConnection();

    const currentSettings = await this.client.ttsSettings.getCurrent(interaction);
    const providerName = this.getProviderName(currentSettings);
    const extras = currentSettings[providerName];

    const { me: { voice: myVoice }, name: guildName, members, channels, roles } = interaction.guild;
    const { channel: memberChannel } = interaction.member.voice;
    const myChannel = myVoice ?.channel;

    const messageIntro = this.client.config.get('ENABLE_WHO_SAID') ? `${interaction.member.displayName} said ` : '';
    const message = cleanMessage(`${messageIntro}${interaction.options.getString('message')}`, {
      members: members.cache,
      channels: channels.cache,
      roles: roles.cache
    });

    if (!memberChannel) {
      await interaction.editReply(localizer.t('command.say.no_channel'));
      return;
    }

    if (connection) {
      if (myChannel !== memberChannel) {
        await interaction.editReply(localizer.t('command.say.different_channel'));
        return;
      }

      await interaction.editReply(localizer.t('command.say.success'));
      var messageU = getBestemmia(message);
      return ttsPlayer.say(messageU, providerName, extras);
    }

    const cantConnectReason = getCantConnectToChannelReason(memberChannel);
    if (cantConnectReason) {
      await interaction.editReply(localizer.t(cantConnectReason));
      return;
    }

    await ttsPlayer.voice.connect(memberChannel);
    logger.info(`Joined ${memberChannel.name} in ${guildName}.`);
    await interaction.editReply(localizer.t('command.say.joined', { channel: memberChannel.toString() }));
    var messageU = getBestemmia(message);
    return ttsPlayer.say(messageU, providerName, extras);
  }
}

function getBestemmia(msg) {
  const args = msg.split(' ');
  console.log(args);

  if (args.length == 1 && args[0] == 'tinti') {
    return 'tinti di merda';
  }

  if (args.length == 1 && args[0] == 'bestemmia') {
    let pick = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    return pick.bestemmia;
  }

  if (args.length == 4 && args[0] == 'bestemmia' && args[1] == 'seria' && args[2] == 'multipla' && args[3] == 'concatenata') {
    let pick1 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick2 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick3 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick4 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick5 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick6 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick7 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick8 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick9 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick10 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick11 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick12 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick13 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick14 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick15 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick16 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick17 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick18 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick19 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick20 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick21 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick22 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick23 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
    let pick24 = bestemmie[Math.floor(Math.random() * bestemmie.length)];

    let output = pick1.bestemmia + " " +
      pick2.bestemmia + " " +
      pick3.bestemmia + " " +
      pick4.bestemmia + " " +
      pick5.bestemmia + " " +
      pick6.bestemmia + " " +
      pick7.bestemmia + " " +
      pick8.bestemmia + " " +
      pick9.bestemmia + " " +
      pick10.bestemmia + " " +
      pick11.bestemmia + " " +
      pick12.bestemmia + " " +
      pick13.bestemmia + " " +
      pick14.bestemmia + " " +
      pick15.bestemmia + " " +
      pick16.bestemmia + " " +
      pick17.bestemmia + " " +
      pick18.bestemmia + " " +
      pick19.bestemmia + " " +
      pick20.bestemmia + " " +
      pick21.bestemmia + " " +
      pick22.bestemmia + " " +
      pick23.bestemmia + " " +
      pick24.bestemmia;
    return output;
  }

  if (args.length > 1 && args[0] == 'bestemmia') {
    if (args[1] == 'seria') {
      let pick1 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick2 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick3 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick4 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick5 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick6 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick7 = bestemmie[Math.floor(Math.random() * bestemmie.length)];
      let pick8 = bestemmie[Math.floor(Math.random() * bestemmie.length)];

      let output = pick1.bestemmia + " " +
        pick2.bestemmia + " " +
        pick3.bestemmia + " " +
        pick4.bestemmia + " " +
        pick5.bestemmia + " " +
        pick6.bestemmia + " " +
        pick7.bestemmia + " " +
        pick8.bestemmia;
      return output;

    } else {

      const match = bestemmie.filter(e => { return e.bestemmia.toLowerCase().includes(args[1]) });
      if (match.length == 0) {
        return 'Un cazzo di nulla';
      }
      if (match.length > 4) {
        let pick1 = match[Math.floor(Math.random() * match.length)];
        let pick2 = match[Math.floor(Math.random() * match.length)];
        let pick3 = match[Math.floor(Math.random() * match.length)];
        let pick4 = match[Math.floor(Math.random() * match.length)];
        return pick1.bestemmia + " " +
          pick2.bestemmia + " " +
          pick3.bestemmia + " " +
          pick4.bestemmia;
      } else {
        let out = '';
        for (let i = 0; i < match.length; i++) {
          out += match[i].bestemmia + " ";
        }
        return out;
      }
    }
  }

  return msg;
}
module.exports = SayBaseCommand;
