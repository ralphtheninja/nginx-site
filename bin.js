#!/usr/bin/env node

import minimist from 'minimist'
import standard from './templates/standard.js'
import createTemplate from './create-template.js'

const templates = {
  standard
}

const usage = () => `
nginx-site [options]

  -t TEMPLATE, --template=TEMPLATE  --  template type, default 'standard'
  -d DOMAIN, --domain=DOMAIN        --  at least one is required, can combine multiple
  -r ROOT, --root=ROOT              --  root folder of the files to serve
  -p PORT, --port=PORT              --  port number to listen to, optional, default 80
  -e, --examples                    --  show some examples
  -h, --help                        --  print this help and exit
`

let argv = minimist(process.argv.slice(2), {
  alias: {
    domains: 'd',
    root: 'r',
    port: 'p',
    template: 't',
    examples: 'e',
    help: 'h'
  },
  default: {
    port: 80,
    template: 'standard'
  }
})

if (argv.help) {
  console.log(usage())
  process.exit(0)
}

if (argv.examples) {
  console.log('TODO list some')
  process.exit(0)
}

if (!templates[argv.template]) {
  console.error(`could not find template '${argv.template}'`)
  process.exit(1)
}

if (!argv.domains) {
  console.error('missing at least one domain, use -d')
  process.exit(1)
}

// Convert multiple domains to space separated string
if (Array.isArray(argv.domains)) {
  argv = Object.assign({}, argv, {
    domains: argv.domains.join(' ')
  })
}

// Pick the template function from the string
argv = Object.assign({}, argv, {
  template: templates[argv.template]
})

console.log(createTemplate(argv))

// TODO move to tests
/*

if (!module.parent) {
  // TODO should exit 1 in the cli tool, no domain(s)
  console.log(module.exports({}))
  console.log(module.exports({
    port: 99
  }))

  console.log(module.exports({
    port: 100,
    domains: 'example.com'
  }))

  console.log(module.exports({
    port: 101,
    domains: 'example.com www.example.com'
  }))

  console.log(module.exports({
    port: 102,
    domains: 'www.example.com example.com'
  }))

  console.log(module.exports({
    port: 103,
    root: '/path/to/my/root',
    domains: 'www.example.com example.com'
  }))

  console.log(module.exports({
    port: 104,
    domains: 'example.com',
    index: 'somethingelse.html'
  }))

  console.log(module.exports({
    domains: 'static.linkping.org'
  }))
}
*/
