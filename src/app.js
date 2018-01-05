import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Octicon from 'react-octicon';

import ProjectionGridReact from 'projection-grid-react';
import Form from './Form';
import IconedCell from './iconed-cell';
import data from './data.json';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      icon: '',
      data: data.value,
      sortBy: null
    };

    this.changeClasses = this.changeClasses.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
  }

  changeClasses(classes) {
    console.log(classes)
    this.setState({
      classes,
    });
  }

  changeIcon(icon) {
    this.setState({
      icon
    });
  }

  render() {
    return (
      <div className="demo">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Projection Grid for ReactJs</h3>
          </div>
          <div className="panel-body">
            <Form 
              classes={this.state.classes} 
              icon={this.state.icon}
              onClassesChange={this.changeClasses}
              onIconChange={this.changeIcon}
            />
          </div>
          <ProjectionGridReact
            data={this.state.data}
            caption={{ content: 'Projection Grid React' }}
            cols={[
              {
                key: 'UserName',
                $td: this.state.icon ? {
                  content: (td, content) => (
                    <IconedCell content={content} icon={this.state.icon} />
                  ),
                } : {},
                sorting: this.sortBy === 'UserName',
              },
              { key: 'FirstName' },
              { key: 'LastName' },
              { 
                key: 'Emails',
                $td: {
                  // differentiate header & content?
                  content: (td, content) => typeof content === 'string' ? content : content.join(' & ')
                }
              }
            ]}
            primaryKey="UserName"
            projections={[]}
            className="table"
            classes={this.state.classes}
            tfoot={{
              trs: [{
                content: 'foot placeholder',
              }],
            }}
          />
        </div>
      </div>
    );
  }
}
