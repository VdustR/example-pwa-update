const { program } = require('commander');
program.arguments('<cmd>').action(function(cmd) {
  cmdValue = cmd;
});

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
  console.error('no env key!');
  process.exit(1);
}

console.log(`${cmdValue}=${new Date().toISOString()}`);
