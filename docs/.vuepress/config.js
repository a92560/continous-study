module.exports = {
  base: '/continous-study/',
  title: 'continous-study',
  description: 'record study process',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/a92560/continous-study',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端知识点', link: '/blog/interviewee.md' }
    ],
    sidebar: [
      ['/', '首页'],
      ['/blog/interviewee.md', '前端知识点']
    ]
  },
  base: 'https://github.com/a92560/continous-study/'
}