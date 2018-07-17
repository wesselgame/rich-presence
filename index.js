const RPC = require('discord-rpc');
const { green } = require('colors');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');

const conf = safeLoad(readFileSync('application.yml', 'utf8'));
const client = new RPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

RPC.register(conf.appId);

const setActivity = () => {
  if (!client) return;
  
  console.log('>> Setting activity');
  client.setActivity({
    startTimestamp,
    details: conf['status'].detail || null,
    state: conf['status'].state || null,
    partyId: conf['status']['party'].id || null,
    partyMax: conf['status']['party'].max || null,
    partySize: conf['status']['party'].size || null,
    joinSecret: conf['status'].joinSecret || null,
    matchSecret: conf['status'].matchSecret || null,
    spectateSecret: conf['status'].spectateSecret || null,
    smallImageKey: conf['status']['images']['small'].key || null,
    largeImageKey: conf['status']['images']['large'].key || null,
    smallImageText: conf['status']['images']['small'].text || null,
    largeImageText: conf['status']['images']['large'].text || null,
    instance: false
  });
  console.log(`>> ${green('Activity set')}`);
};

client.on('ready', () => {
  console.log(`>> ${green('Client connected')}`);
  setActivity();
});

client.login(conf.appId).catch(console.error);
