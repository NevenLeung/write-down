import markdownFeatureSrc from '../assets/markdown-test-file';

let data = [
  {
    id: 0,
    title: 'Full Feature Example',
    author: 'Neven',
    excerpt: 'This is the full feature example. You can see all markdown feature supported and experience all features in Write-Down with this example. Have fun!!',
    cover: {
      url: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMzU5fQ',
      authorName: 'jonathan riley',
      authorLink: 'https://unsplash.com/@jonathan_christian_photography'
    },
    createdAt: '2019-01-07',
    updatedAt: '2019-01-07',
    tags: ['example', "all feature", 'have fun'],
    markdown: markdownFeatureSrc,
    htmlOutput: ''
  },
  {
    id: 1,
    title: 'Title No.1',
    author: 'Author',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit massa enim nec dui. At tellus at urna condimentum mattis pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Purus viverra accumsan in nisl nisi.',
    cover:{
      url: 'https://images.unsplash.com/photo-1503363876019-10eaf537e61d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMzU5fQ&s=a69ae344deb3588f0caebc5cbd2bcac7',
      authorName: 'Jeremy Bishop',
      authorLink: 'https://unsplash.com/@jeremybishop'
    },
    createdAt: '2018-11-15',
    updatedAt: '2018-11-16',
    tags: ['story', 'daily', "gathering"],
    markdown: '# Title No.1',
    htmlOutput: ''
  },
  {
    id: 2,
    title: 'This is a very long long long long long long long long long title No.2',
    author: 'Author',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit massa enim nec dui. At tellus at urna condimentum mattis pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Purus viverra accumsan in nisl nisi.',
    cover:{
      url: 'https://images.unsplash.com/photo-1464655646192-3cb2ace7a67e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQxMzU5fQ&s=e5c92940908160ed6b1fce199d70df14',
      authorName: 'Scott Webb',
      authorLink: 'https://unsplash.com/@scottwebb'
    },
    createdAt: '2018-10-15',
    updatedAt: '2018-10-16',
    tags: ['121212121212', '23232323232323', '343434343434343', '4545454545454554', '5656565656565656'],
    markdown: '# Title No.2'
  },
  {
    id: 3,
    title: 'Title No.3',
    author: 'Author',
    excerpt: 'Here is an example of a post without a cover image. You don\'t always have to have a cover image. In fact, leaving them out from time to time and disrupt the predictive flow and make the overall design more interesting. Something to think about.',
    cover:{
      url: '',
      authorName: '',
      authorLink: ''
    },
    createdAt: '2018-09-15',
    updatedAt: '2018-09-16',
    tags: ['story', 'daily', "food"],
    markdown: '# Title No.3'
  },
  {
    id: 4,
    title: 'Title No.4',
    author: 'Author',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit massa enim nec dui. At tellus at urna condimentum mattis pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Purus viverra accumsan in nisl nisi.',
    cover:{
      url: 'https://images.unsplash.com/photo-1542173212-6fbb91e107f1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e0f80857a9986c67b43b0ce666adf327&auto=format&fit=crop&w=1080&q=80',
      authorName: 'Rye Jessen',
      authorLink: 'https://unsplash.com/@ryejessen'
    },
    createdAt: '2018-08-15',
    updatedAt: '2018-08-16',
    tags: ['story', 'daily', "sport", "movie"],
    markdown: '# Title No.4'
  }

];

export default data;