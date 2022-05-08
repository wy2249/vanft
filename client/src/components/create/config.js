const config = [
  {
    label: 'Image, Vidoe, Audio, or 3D Model',
    type: 'media',
    required: true,
    key: 'media',
  },
  {
    label: 'Name',
    type: 'text',
    required: true,
    key: 'name',
  },
  {
    label: 'IPFS Link',
    type: 'text',
    required: true,
    key: 'link',
  },
  {
    label: 'Description',
    type: 'textarea',
    required: true,
    key: 'desc',
  },
];

export default config;
