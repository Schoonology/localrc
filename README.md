# localrc

The non-configurable project-local configuration loader for lazy people.

# Usage

The only two options are the name of your app and your default configuration.

```
  var localrc = require('localrc')(appname, {
    //defaults go here.
    port: 2468
  })
```

# Standards

Given your application name, localrc will look in all the obvious project-local places for configuration.

 * For each config folder sibling to your `node_modules` folders:
     * `config/${arch}(.json)`
     * `config/${platform}(.json)`
     * `config/${hostname}(.json)`
     * `config/${username}(.json)`
     * `config/${APPNAME}_ENV(.json)`
     * `config/defaults(.json)`
 * And `config.json` as a sibling file to `node_modules`.

All configuration sources that where found will be flattened into one object,
so that sources earlier in this list override later ones.

# Formats

Configurations files must be in json format.

# Chaining

An example for the unimaginative:

```
  var rc = require('rc')(appname, require('localrc')(appname, {
    foo: 'bar'
  }))
```
