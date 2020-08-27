module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.component.js',
        templateFile: 'plop-templates/Component.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.style.js',
        templateFile: 'plop-templates/ComponentStyle.js.hbs'
      }
    ]
  })

  plop.setGenerator('redux-component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.component.js',
        templateFile: 'plop-templates/ReduxComponent.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.style.js',
        templateFile: 'plop-templates/ComponentStyle.js.hbs'
      }
    ]
  })

  plop.setGenerator('reducer', {
    description: 'Create a reducer',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your reducer name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/redux/reducers/{{name}}.js',
        templateFile: 'plop-templates/Reducer.js.hbs'
      }
    ]
  })
}
