"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
function graphqlLoader(source) {
    return "\n    module.exports = function(component) {\n      console.log(" + JSON.stringify(graphql_tag_1.default(source)) + ");\n    }\n  ";
}
exports.default = graphqlLoader;
