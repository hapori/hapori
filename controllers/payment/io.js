var io = null

exports.set = function (_io) {
   console.log('setting io: ', _io)
  io = _io
}

exports.get = function() {
   console.log('getting io: ', io)
  return io
}