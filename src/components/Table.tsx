import React from 'react';
import {connect} from 'react-redux';
import store  from '../store/mainStore';
import './Table.css';
import Modal from './Modal';
import axios from 'axios';

interface IProps {
  rows: any;
  isModalOpen: boolean;
  toogleSortClick?(value: string): void;
 
}

interface IState {
}


class Table extends React.Component <IProps,any> {
    
    constructor(props: any) {
      super(props);
    }
  
    componentDidMount() {
        fetch("http://localhost:3001/walking")
        .then(res => res.json())
        .then(
          (result) => {
            store.dispatch({ type: "UPLOAD_DATA", payload: result})
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log('ibc error!');
          }
        )      
    }

    toggleModal(){
        store.dispatch({ type: "TOGGLE_MODAL", payload: !this.props.isModalOpen});
    };
    
    toogleSortClick(col: string, e:any) {
      let order;
      if(e.target.classList.contains('transform')){
        e.target.classList.remove('transform');
        order = "asc";
      }else {
        e.target.classList.add('transform');
        order = "desc";
      }
      
      fetch(`http://localhost:3001/walking?_sort=${col}&_order=${order}`)
        .then(res => res.json())
        .then(
          (result) => {
            store.dispatch({ type: "SORT_DATA", payload: result})
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log('ibc error!');
          }
        )
     
    }

   render() { 
        return (
          <div className="ibc-shadow white-bg ">
            <div className="ibc-container-table">
              <table className= "table table-striped">
                  <thead>
                      <tr className="ibc-table-header">
                          <th className="ibc-header-date" onClick={(e) => {this.toogleSortClick("date",e)}} scope="col">Дата</th>
                          <th className="ibc-header-distance" onClick={(e) => {this.toogleSortClick("distance",e)}} scope="col">Дистанция</th>
                      </tr>
                  </thead>
                  <tbody >
                      {this.props.rows.map((item: any) => (
                          <tr key={item.id}>
                              <td className="ibc-col-date" scope="row">
                                <div>{item.day}</div>
                                <div className="ibc-col-distance">{item.dateformat}</div>
                              </td>
                              <td className="ibc-col-distance">{item.distance}</td>
                          </tr>
                      ))}
                    
                  </tbody>
              </table>
            </div>
            <button className="ibc-add-row-btn" onClick={(e) => {this.toggleModal()}} >Добавить запись</button>
            
            {this.props.isModalOpen &&
                <Modal>
                    <h1>Modal</h1>
                </Modal>
            }
          </div>
        );
    }
}

const mapStateToProps = (store: any) => {
    return {
      rows: store.data,
      isModalOpen:  store.isModalOpen 
    }
  }

export default connect(mapStateToProps)(Table);