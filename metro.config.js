const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = path.resolve('/Volumes/ThomasUSB/progressPulse-frontend');
const config = getDefaultConfig(projectRoot);

config.watchFolders = [projectRoot];

module.exports = config;