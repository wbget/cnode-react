// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/new', component: './new' },
        { path: '/about', component: './about' },
        { path: '/setting', component: './setting' },
        {
          path: '/',
          component: './home/_layout',
          routes: [
            { path: '/detail', component: './home/detail' },
            { path: '/', exact: true, component: './home' },
          ],
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'cnode-react',
        dll: false,
        pwa: {
          manifestOptions: {
            srcPath: 'src/manifest.json',
          },
          workboxPluginMode: 'GenerateSW',
          workboxOptions: {
            importWorkboxFrom: 'local',
            swDest: 'sw.js',
          },
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
