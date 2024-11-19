const { contextBridge, ipcRenderer } = require("electron");



const API = {
  send: (channel, message) => ipcRenderer.send(channel, message),
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  selectedServer: {},


  getServers: () => ipcRenderer.invoke('getServers'),
  setupConnection: (server) => ipcRenderer.invoke('setupConnection', server),
  disconnect: () => ipcRenderer.invoke('disconnect'),

  // send data from main to renderer
  newSwitchAdded: (data) => ipcRenderer.send('newSwitchAdded', data),
  test: (data) => ipcRenderer.invoke('test', data),
};

contextBridge.exposeInMainWorld("api", API);

/* 
{
  img: '1',
  entityType: '1',
  ip: '192.168.1.1',
  entityId: '12345678',
  type: 'entity',
  url: 'https://fictionalservers.co/',
  playerToken: 'abcdef123456',
  port: '12345',
  entityName: 'Switch',
  name: '[EU] FictionalServers.co- 2x Solo/Duo/Trio/Quad | FULL WIPED',
  logo: '',
  id: 'abcd1234-efgh-5678-ijkl-9mnopqrstuvw',
  desc: 'Welcome to Fictional Servers, the heart of modded rust\\n\\n\\t - 2x Gather Rate\\n\\t - Max Team: 4\\n\\t - Custom Loot Tables\\n\\t - Tier 1 BPs unlocked\\n\\t - Minicopters spawn on the roads\\n\\t - Recyclers at Dome, Oilrigs, Cargo, Ranches & Fishing Villages\\n\\t - Long Days & Short Nights\\n\\t - Automated Teaming Detection\\n\\t - Custom AntiCheat',
  playerId: '12345678901234567'
}

{
  img: '1',
  port: '12345',
  ip: '192.168.1.1',
  name: '[EU] FictionalServers.co- 2x Solo/Duo/Trio/Quad | FULL WIPED',
  logo: '',
  id: 'abcd1234-efgh-5678-ijkl-9mnopqrstuvw',
  type: 'server',
  url: 'https://fictionalservers.co/',
  desc: 'Welcome to Fictional Servers, the heart of modded rust\\n\\n\\t - 2x Gather Rate\\n\\t - Max Team: 4\\n\\t - Custom Loot Tables\\n\\t - Tier 1 BPs unlocked\\n\\t - Minicopters spawn on the roads\\n\\t - Recyclers at Dome, Oilrigs, Cargo, Ranches & Fishing Villages\\n\\t - Long Days & Short Nights\\n\\t - Automated Teaming Detection\\n\\t - Custom AntiCheat',
  playerId: '12345678901234567',
  playerToken: 'abcdef123456'
}
*/
