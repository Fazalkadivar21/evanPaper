// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  apiSidebar: [
    'api/address',
    'api/cart',
    'api/orders',
    'api/payments',
    'api/products',
    'api/reviews',
    'api/support',
    'api/tags',
    'api/offers',
    'api/admin',
    'api/users',
    'api/categories-admin',
  ],
};

export default sidebars;
