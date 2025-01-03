"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'text',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
        },
    ],
};
