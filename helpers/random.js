// http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript


exports.generate = function(length) {

	var length = length || 10
	var arr = new Array(length)
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        arr[i] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    return arr.join('')
}