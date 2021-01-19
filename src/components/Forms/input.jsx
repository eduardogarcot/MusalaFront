import React, { Component } from "react";

class Input extends Component {

    getStyleForDate=(type)=>{
        if (type==="date")
            return {width:"50%"};
    };
    render() {
        const { name, label, error, ...rest } = this.props;
        return (
          <div className="form-group">
            <label htmlFor={name}> {label} </label>
            <input
              id={name}
              name={name}
              {...rest}
              className="form-control"
              style={this.getStyleForDate(this.props.type)}
            />
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        );
      }
}

export default Input;
