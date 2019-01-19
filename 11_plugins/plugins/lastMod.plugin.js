module.exports = function (schema, options) {
    // adding property name "lastMod"
    schema.add({ lastMod: Date });

    schema.pre('save', function () {
        this.lastMod = new Date();  // update every time you call "doc.save()"
        next(); // next middleware
    });

    // options ?
    if (options && options.index) {
        schema.path('lastMod').index(options.index);
    }
}