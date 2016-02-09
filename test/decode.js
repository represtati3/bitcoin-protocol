const test = require('tap').test
const bp = require('../')

test('decode stream', t => {
  t.test('simple decode', t => {
    const stream = bp.createDecodeStream()

    t.test('version', t => {
      stream.once('data', message => {
        t.ok(message, 'got data')
        t.equal(message.magic, 3652501241, 'correct magic')
        t.equal(message.command, 'version', 'correct command')
        t.equal(message.length, 86, 'correct length')
        t.ok(message.checksum.compare(new Buffer('d33fa729', 'hex')) === 0, 'correct checksum')
        t.equal(message.payload.version, 31900, 'correct version')
        t.ok(message.payload.services.compare(new Buffer('0100000000000000', 'hex')) === 0, 'correct services')
        t.equal(message.payload.timestamp, 1292899814, 'correct timestamp')
        t.ok(message.payload.receiverAddress.services.compare(new Buffer('0100000000000000', 'hex')) === 0, 'correct receiver address services')
        t.equal(message.payload.receiverAddress.address, '10.0.0.1', 'correct receiver address IP')
        t.equal(message.payload.receiverAddress.port, 8333, 'correct receiver address port')
        t.ok(message.payload.senderAddress.services.compare(new Buffer('0100000000000000', 'hex')) === 0, 'correct sender address services')
        t.equal(message.payload.senderAddress.address, '10.0.0.2', 'correct sender address IP')
        t.equal(message.payload.senderAddress.port, 8333, 'correct sender address port')
        t.ok(message.payload.nonce.compare(new Buffer('dd9d202c3ab45713', 'hex')) === 0, 'correct nonce')
        t.equal(message.payload.userAgent, '', 'correct userAgent')
        t.equal(message.payload.startHeight, 98645, 'correct startHeight')
        t.equal(message.payload.relay, false, 'correct relay')
        t.end()
      })
      stream.write(new Buffer('f9beb4d976657273696f6e000000000056000000d33fa7299c7c00000100000000000000e615104d00000000010000000000000000000000000000000000ffff0a000001208d010000000000000000000000000000000000ffff0a000002208ddd9d202c3ab45713005581010000', 'hex'))
    })

    t.test('verack', t => {
      stream.once('data', message => {
        t.ok(message, 'got data')
        t.equal(message.magic, 3652501241, 'correct magic')
        t.equal(message.command, 'verack', 'correct command')
        t.equal(message.length, 0, 'correct length')
        t.end()
      })
      stream.write(new Buffer('f9beb4d976657261636b000000000000000000005df6e0e2', 'hex'))
    })

    t.test('addr', t => {
      stream.once('data', message => {
        t.ok(message, 'got data')
        t.equal(message.magic, 3652501241, 'correct magic')
        t.equal(message.command, 'addr', 'correct command')
        t.equal(message.length, 31, 'correct length')
        t.ok(Array.isArray(message.payload), 'payload is an array')
        t.equal(message.payload.length, 1, 'payload is correct length')
        t.equal(message.payload[0].time, 1292899810, 'correct time')
        t.ok(message.payload[0].services.compare(new Buffer('0100000000000000', 'hex')) === 0, 'correct services')
        t.equal(message.payload[0].address, '10.0.0.1', 'correct IP')
        t.equal(message.payload[0].port, 8333, 'correct port')
        t.end()
      })
      stream.write(new Buffer('f9beb4d96164647200000000000000001f000000ed52399b01e215104d010000000000000000000000000000000000ffff0a000001208d', 'hex'))
    })

    t.test('tx', t => {
      stream.once('data', message => {
        t.ok(message, 'got data')
        t.equal(message.magic, 3652501241, 'correct magic')
        t.equal(message.command, 'tx', 'correct command')
        t.equal(message.length, 258, 'correct length')
        t.equal(message.payload.version, 1, 'correct version')
        t.ok(Array.isArray(message.payload.ins), 'ins is an array')
        t.equal(message.payload.ins.length, 1, 'correct ins length')
        t.ok(message.payload.ins[0].hash.compare(new Buffer('6dbddb085b1d8af75184f0bc01fad58d1266e9b63b50881990e4b40d6aee3629', 'hex')) === 0, 'correct input hash')
        t.equal(message.payload.ins[0].index, 0, 'correct input index')
        t.ok(message.payload.ins[0].script.compare(new Buffer('483045022100f3581e1972ae8ac7c7367a7a253bc1135223adb9a468bb3a59233f45bc578380022059af01ca17d00e41837a1d58e97aa31bae584edec28d35bd96923690913bae9a0141049c02bfc97ef236ce6d8fe5d94013c721e915982acd2b12b65d9b7d59e20a842005f8fc4e02532e873d37b96f09d6d4511ada8f14042f46614a4c70c0f14beff5', 'hex')) === 0, 'correct input index')
        t.equal(message.payload.ins[0].sequence, 4294967295, 'correct input sequence')
        t.ok(Array.isArray(message.payload.outs), 'outs is an array')
        t.equal(message.payload.outs.length, 2, 'correct outs length')
        t.equal(message.payload.outs[0].valueBuffer.toString('hex'), '404b4c0000000000', 'correct outs value')
        t.equal(message.payload.outs[0].script.toString('hex'), '76a9141aa0cd1cbea6e7458a7abad512a9d9ea1afb225e88ac', 'correct scriptPubKey')
        t.equal(message.payload.outs[1].valueBuffer.toString('hex'), '80fae9c700000000', 'correct outs value')
        t.equal(message.payload.outs[1].script.toString('hex'), '76a9140eab5bea436a0484cfab12485efda0b78b4ecc5288ac', 'correct scriptPubKey')
        t.equal(message.payload.locktime, 0, 'correct locktime')
        t.end()
      })
      stream.write(new Buffer('f9beb4d974780000000000000000000002010000e293cdbe01000000016dbddb085b1d8af75184f0bc01fad58d1266e9b63b50881990e4b40d6aee3629000000008b483045022100f3581e1972ae8ac7c7367a7a253bc1135223adb9a468bb3a59233f45bc578380022059af01ca17d00e41837a1d58e97aa31bae584edec28d35bd96923690913bae9a0141049c02bfc97ef236ce6d8fe5d94013c721e915982acd2b12b65d9b7d59e20a842005f8fc4e02532e873d37b96f09d6d4511ada8f14042f46614a4c70c0f14beff5ffffffff02404b4c00000000001976a9141aa0cd1cbea6e7458a7abad512a9d9ea1afb225e88ac80fae9c7000000001976a9140eab5bea436a0484cfab12485efda0b78b4ecc5288ac00000000', 'hex'))
    })

    t.end()
  })

  t.test('decode errors', t => {
    t.test('invalid magic', t => {
      const stream = bp.createDecodeStream({ magic: 3652501241 })
      stream.once('error', err => {
        t.ok(err, 'got error')
        t.equal(err.message, 'Magic value in message (ffffffff) did not match expected (d9b4bef9)', 'correct error message')
        t.end()
      })
      stream.write(new Buffer('FFFFFFFF76657261636B000000000000000000005DF6E0E2', 'hex'))
    })

    t.test('invalid string padding', t => {
      const stream = bp.createDecodeStream()
      stream.once('error', err => {
        t.ok(err, 'got error')
        t.equal(err.message, 'Found a non-null byte after the first null byte in a null-padded string', 'correct error message')
        t.end()
      })
      stream.write(new Buffer('F9BEB4D976657261636B00FF00000000000000005DF6E0E2', 'hex'))
    })

    t.test('invalid command', t => {
      const stream = bp.createDecodeStream()
      stream.once('error', err => {
        t.ok(err, 'got error')
        t.equal(err.message, 'Unrecognized command: "abcd"', 'correct error message')
        t.end()
      })
      stream.write(new Buffer('F9BEB4D9616263640000000000000000000000005DF6E0E2', 'hex'))
    })

    t.test('invalid checksum', t => {
      const stream = bp.createDecodeStream()
      stream.once('error', err => {
        t.ok(err, 'got error')
        t.equal(err.message, 'Invalid message checksum. In header: "ffffffff", calculated: "137ad663"', 'correct error message')
        t.end()
      })
      stream.write(new Buffer('f9beb4d970696e67000000000000000008000000ffffffff0123456789abcdef', 'hex'))
    })

    t.end()
  })

  t.test('buffering', t => {
    const stream = bp.createDecodeStream()
    const data = new Buffer('f9beb4d970696e67000000000000000008000000137ad663', 'hex')
    stream.once('data', message => {
      t.ok(message, 'got data')
      t.equal(message.magic, 3652501241, 'correct magic')
      t.equal(message.command, 'ping', 'correct command')
      t.equal(message.length, 8, 'correct length')
      t.equal(message.payload.nonce.toString('hex'), '0123456789abcdef', 'correct nonce')
      t.end()
    })
    for (var i = 0; i < data.length; i++) {
      stream.write(data.slice(i, i + 1))
    }
    t.end()
  })

  t.end()
})
