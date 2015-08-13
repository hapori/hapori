var io = null

exports.set = function (_io) {
	io = _io
}

exports.get = function() {
  return io
}