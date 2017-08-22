/*
helper function properties
*/

// FS module to read files from the system the site is on
const fs = require('fs');

// moment.js used for date display
exports.moment = require('moment');

// dump for reading objects in our pug files to the display
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// adding svg
exports.icon = (name) => fs.readFileSync(`./public/images/icons${name}.svg`);

// now for the site name
exports.siteName = `Katy's Club: A Book Club Management App`;

//lastly the menu
exports.menu = [
  { slug: '/home' title: 'Book Club Home' }
  { slug: '/booklist' title: 'Book Titles' }
  { slug: '/meeting' title: 'Book Club Meeting' }
];
