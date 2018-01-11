import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import React, { Component } from 'react';

import ProjectionGridReact from 'projection-grid-react';
import Form from './Form';
import IconedCell from './IconedCell';
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
                  content: ({ isHeader }, content) => isHeader ? 'User Name' : (
                    <IconedCell content={content} icon={this.state.icon} />
                  ),
                } : {},
              },
              { key: 'FirstName' },
              { key: 'LastName' },
              {
                key: 'Emails',
                $td: {
                  content: ({ isHeader }, content) => isHeader ? content : content.join(' & ')
                }
              }
            ]}
            primaryKey="UserName"
            projections={[]}
            className="table"
            classes={this.state.classes}
            tfoot={{
              trs: [{
                content: 'fooooooooooooooooooot placeholder',
              }],
            }}
            sorting={{
              cols: ['UserName', 'FirstName', 'LastName'],
              $default: {
                classes: ['sortable-header'],
              },
              $asc: {
                classes: ['sortable-header'],
                content: (td, content) => {
                  return <IconedCell content={content} icon="arrow-up" />
                }
              },
              $desc: {
                classes: ['sortable-header'],
                content: (td, content) => {
                  return <IconedCell content={content} icon="arrow-down" />
                }
              },
              onSort: ({ sortBy, direction }) => {
                const dataAsc = _.sortBy(this.state.data, sortBy);

                this.setState({
                  sortBy,
                  direction,
                  data: direction === 'asc' ? dataAsc : _.reverse(dataAsc),
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}
