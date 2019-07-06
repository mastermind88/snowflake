// Generated by CoffeeScript 2.4.1
var FILES, FILES_SPEC, INITS, OUTFILE, STATIC, compileCoffee, copyStaticFiles, exec, execSync, fs, spawn;

fs = require('fs');

({exec, spawn, execSync} = require('child_process'));

// All coffeescript files required.
FILES = ['broker.coffee', 'config.coffee', 'proxypair.coffee', 'snowflake.coffee', 'ui.coffee', 'util.coffee', 'websocket.coffee', 'shims.coffee'];

INITS = ['init-badge.coffee', 'init-node.coffee', 'init-webext.coffee'];

FILES_SPEC = ['spec/broker.spec.coffee', 'spec/init.spec.coffee', 'spec/proxypair.spec.coffee', 'spec/snowflake.spec.coffee', 'spec/ui.spec.coffee', 'spec/util.spec.coffee', 'spec/websocket.spec.coffee'];

OUTFILE = 'snowflake.js';

STATIC = 'static';

copyStaticFiles = function() {
  return exec('cp ' + STATIC + '/* build/');
};

compileCoffee = function(outDir, init) {
  var files;
  files = FILES.concat('init-' + init + '.coffee');
  return exec('cat ' + files.join(' ') + ' | coffee -cs > ' + outDir + '/' + OUTFILE, function(err, stdout, stderr) {
    if (err) {
      throw err;
    }
  });
};

task('test', 'snowflake unit tests', function() {
  var jasmineFiles, outFile, proc;
  exec('mkdir -p test');
  exec('jasmine init >&-');
  // Simply concat all the files because we're not using node exports.
  jasmineFiles = FILES.concat('init-badge.coffee', FILES_SPEC);
  outFile = 'test/bundle.spec.coffee';
  exec('echo "TESTING = true" > ' + outFile);
  exec('cat ' + jasmineFiles.join(' ') + ' | cat >> ' + outFile);
  execSync('coffee -cb ' + outFile);
  proc = spawn('jasmine', ['test/bundle.spec.js'], {
    stdio: 'inherit'
  });
  return proc.on("exit", function(code) {
    return process.exit(code);
  });
});

task('build', 'build the snowflake proxy', function() {
  exec('mkdir -p build');
  copyStaticFiles();
  compileCoffee('build', 'badge');
  return console.log('Snowflake prepared.');
});

task('webext', 'build the webextension', function() {
  exec('mkdir -p webext');
  compileCoffee('webext', 'webext');
  return console.log('Webextension prepared.');
});

task('node', 'build the node binary', function() {
  exec('mkdir -p build');
  compileCoffee('build', 'node');
  return console.log('Node prepared.');
});

task('lint', 'ensure idiomatic coffeescript', function() {
  var filesAll, proc;
  filesAll = FILES.concat(INITS, FILES_SPEC);
  proc = spawn('coffeelint', filesAll, {
    file: 'coffeelint.json',
    stdio: 'inherit'
  });
  return proc.on("exit", function(code) {
    return process.exit(code);
  });
});

task('clean', 'remove all built files', function() {
  return exec('rm -r build');
});
