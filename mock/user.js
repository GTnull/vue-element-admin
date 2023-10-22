
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  leader: {
    token: 'leader-token'
  },
  reviewer: {
    token: 'reviewer-token'
  },
  reporter: {
    token: 'reporter-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'leader-token': {
    roles: ['leader'],
    introduction: 'I am an leader',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal leader'
  },
  'reviewer-token': {
    roles: ['reviewer'],
    introduction: 'I am an reviewer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Reviewer'
  },
  'reporter-token': {
    roles: ['reporter'],
    introduction: 'I am an reporter',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal reporter'
  }
}

module.exports = [
  // 登录接口
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Account and password are incorrect.'
      //   }
      // }
      console.log('/vue-element-admin/user/login begin')
      console.log(token)
      console.log('/vue-element-admin/user/login end')
      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
