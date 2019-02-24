'use strict';

const fs = require('fs');
const path = require('path');

exports.load = function (dirname, is_object_file = m => m instanceof Array) {
    return fs.readdirSync(dirname)
        .filter(file => file.slice(-3) === '.js')
        .reduce(function (files, file) {
            var objects = require(path.resolve(dirname, file)); // 绝对路径使用 path.resolve
            if (is_object_file(objects)) objects.forEach(o => files.push(o));
            return files;
        }, []);
};
