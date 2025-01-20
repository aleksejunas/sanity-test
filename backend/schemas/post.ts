// schemas/post.ts
export default {
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
      type: 'array',
      title: 'Body',
      of: [{type: 'block'}],
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
    },
    {
      name: 'puplishedAt',
      type: 'datetime',
      title: 'Published At',
    },
  ],
}
