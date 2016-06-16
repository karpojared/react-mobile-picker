import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';

function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}

export default class BirthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        year: '1989',
        month: '08',
        day: '12',
        hour: '12',
        minute: '06',
        second: '56',
      },
      optionGroups: [
        {
          name: 'year',
          text: generateNumberArray(1970, 2015),
          value: generateNumberArray(1970, 2015),
          label: '年',
        },
        {
          name: 'month',
          text: generateNumberArray(1, 12),
          value: generateNumberArray(1, 12),
          label: '月',
        },
        {
          name: 'day',
          text: generateNumberArray(1, 31),
          value: generateNumberArray(1, 31),
          label: '日',
        },
        {
          name: 'hour',
          text: generateNumberArray(0, 23),
          value: generateNumberArray(0, 23),
          label: '时',
        },
        {
          name: 'minute',
          text: generateNumberArray(0, 59),
          value: generateNumberArray(0, 59),
          label: '分',
        },
        {
          name: 'second',
          text: generateNumberArray(0, 59),
          value: generateNumberArray(0, 59),
          label: '秒',
        }
      ]
    };
  }

  handleChange = (name, value) => {
    this.setState(({valueGroups, optionGroups}) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
      if (name === 'year' && valueGroups.month === '02') {
        if (parseInt(value) % 4 === 0) {
          optionGroups.splice(2, 1, {
            name: 'day',
            text: generateNumberArray(1, 29),
            value: generateNumberArray(1, 29),
            label: '日',
          });
          nextState.optionGroups = optionGroups;
        } else {
          optionGroups.splice(2, 1, {
            name: 'day',
            text: generateNumberArray(1, 28),
            value: generateNumberArray(1, 28),
            label: '日',
          });
          nextState.optionGroups = optionGroups;
        }
      } else if (name === 'month') {
        if (value === '02') {
          optionGroups.splice(2, 1, {
            name: 'day',
            text: generateNumberArray(1, 28),
            value: generateNumberArray(1, 28),
            label: '日',
          });
          nextState.optionGroups = optionGroups;
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          optionGroups.splice(2, 1, {
            name: 'day',
            text: generateNumberArray(1, 31),
            value: generateNumberArray(1, 31),
            label: '日',
          });
          nextState.optionGroups = optionGroups;
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          optionGroups.splice(2, 1, {
            name: 'day',
            text: generateNumberArray(1, 30),
            value: generateNumberArray(1, 30),
            label: '日',
          });
          nextState.optionGroups = optionGroups;
        }
      }
      return nextState;
    });
  };

  togglePicker = () => {
    this.setState(({isPickerShow}) => ({
      isPickerShow: !isPickerShow
    }));
  };

  render() {
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;

    return (
      <div className="example-container">
        <div className="weui_cells_title">2. As a modal and bind to input field</div>
        <div className="weui_cells">
          <div className="weui_cell weui_cell_select weui_select_after">
            <div className="weui_cell_hd">Birthdate</div>
            <div className="weui_cell_bd weui_cell_primary">
              <input
                type="text"
                className="weui_select"
                value={valueGroups.year + '-' + valueGroups.month + '-' + valueGroups.day+ ' ' + valueGroups.hour + ':' + valueGroups.minute + ':' + valueGroups.second}
                readOnly
                onClick={this.togglePicker} />
            </div>
          </div>
        </div>
        <div className="picker-modal-container">
          <div className="picker-modal-mask" style={maskStyle} onClick={this.togglePicker}></div>
          <div className={pickerModalClass}>
            <header>
              <div className="title">Choose your birthdate</div>
              <a href="javascript:;" onClick={this.togglePicker}>OK</a>
            </header>
            <Picker
             optionGroups={optionGroups}
             valueGroups={valueGroups}
             onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
