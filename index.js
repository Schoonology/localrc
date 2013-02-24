var os = require('os'),
    path = require('path'),
    cc = require('config-chain')

function localrc(name, defaults) {
  if(typeof name !== 'string')
    throw new Error('nameless configuration fail')

  var files = [path.join(process.cwd(), 'config')]
    .concat(
      require.main.paths.map(function (dir) {
        return dir.split(path.sep).slice(0, -1).concat(['config']).join(path.sep)
      })
    )
    .reduce(function (arr, dir) {
      return arr.concat([
        path.join(dir, process.arch + '.json'),
        path.join(dir, process.arch),
        path.join(dir, process.platform + '.json'),
        path.join(dir, process.platform),
        path.join(dir, os.hostname() + '.json'),
        path.join(dir, os.hostname()),
        path.join(dir, process.env.USER + '.json'),
        path.join(dir, process.env.USER),
        path.join(dir, process.env[name.toUpperCase() + '_ENV'] + '.json'),
        path.join(dir, process.env[name.toUpperCase() + '_ENV']),
        path.join(dir, 'defaults.json'),
        path.join(dir, 'defaults'),
        path.join(dir, '..', 'config.json')
      ])
    }, [])
    .concat([defaults])

  return cc.apply(null, files).snapshot
}

module.exports = localrc
