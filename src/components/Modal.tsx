import React from 'react';
import {connect} from 'react-redux';
import store  from '../store/mainStore';
import './Modal.css';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

interface IProps {
    rows:any;
    isModalOpen: any;
    startDate: any;
    distance: any;
}

class Modal extends React.Component<IProps,any> {
    toggleModal(){
        store.dispatch({ type: "TOGGLE_MODAL", payload: !this.props.isModalOpen});
    };

    changeValue(e:any){
        let distance = e.target.value.replace(/[^0-9\.]/g, '');
        store.dispatch({ type: "CHANGE_DISTANCE", payload: distance});
    };

    addRow(){
        let newRow = {
          "id": this.props.rows.length+1,
          "date": this.props.startDate.toISOString(),
          "distance": this.props.distance
        };
        store.dispatch({ type: "ADD_ROW", payload: newRow});
        store.dispatch({ type: "TOGGLE_MODAL", payload: !this.props.isModalOpen});
    };

    render() {
        return (
            <div className="modal">
                <button className="modal__close-button" onClick={(e) => {this.toggleModal()}} >Закрыть</button>
                
                <div className="form-group">
                    <label htmlFor="date">Дата</label>
                    <br></br>
                    <DatePicker
                        locale="ru"
                        showPopperArrow={false}
                        selected={this.props.startDate}
                        onChange={(date: any) => store.dispatch({ type: "PICK_DATE", payload: date})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="distance">Дистанция</label>
                    <input type="text" id="distance" className="form-control form-control-md" value={this.props.distance} onChange={(e) => {this.changeValue(e)}}/>
                </div>
                <button className="ibc-add-row-btn" onClick={(e) => {this.addRow()}} >Добавить запись</button>
            </div>
        );
    }
}


const mapStateToProps = (store: any) => {
    return {
      rows: store.data,
      isModalOpen: store.isModalOpen, 
      startDate: store.startDate,
      distance: store.distance
    }
  }

export default connect(mapStateToProps)(Modal);