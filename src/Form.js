import _ from 'lodash';
import React, { Component } from 'react';

function toggleClass(classes, className) {
  if (_.includes(classes, className)) {
    return _.without(classes, className);
  } else {
    return classes.concat(className);
  }
}

const classes = {
  bordered: 'table-bordered',
  striped: 'table-striped',
  hover: 'table-hover'
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.toggleBorderd = this.toggleBorderd.bind(this);
    this.toggleStriped = this.toggleStriped.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.selectTdIcon = this.selectTdIcon.bind(this);
  }

  hasClass(className) {
    return this.props.classes.includes(className);
  }

  toggleClass(className) {
    this.props.onClassesChange(toggleClass(this.props.classes, className));
  }

  toggleBorderd() {
    this.toggleClass(classes.bordered);
  }

  toggleStriped() {
    this.toggleClass(classes.striped);
  }

  toggleHover() {
    this.toggleClass(classes.hover);
  }
  
  selectTdIcon(e) {
    this.props.onIconChange(e.target.value);
  }

  render() {
    return (
      <form className="form-inline">
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.hasClass(classes.bordered)}
              onChange={this.toggleBorderd}
            />
            <span>Is bordered?</span>
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.hasClass(classes.striped)}
              onChange={this.toggleStriped}
            />
            <span>Is striped?</span>
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.hasClass(classes.hover)}
              onChange={this.toggleHover}
            />
            <span>Is hover?</span>
          </label>
        </div>
        <div className="form-group">
          <label>Cell Icon:</label>
          <select className="form-control" value={this.props.icon} onChange={this.selectTdIcon} >
            <option value="">None</option>
            <option value="ok">OK</option>
            <option value="pencil">Pencil</option>
            <option value="heart">Heart</option>
            <option value="heart-empty">Empty Heart</option>
          </select>
        </div>
      </form>
    );
  }
}
