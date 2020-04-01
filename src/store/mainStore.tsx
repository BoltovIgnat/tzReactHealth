import { createStore } from 'redux';
import axios from 'axios';

const initialState = { 
  "data": [
    {
      "id": 1,
      "date": "2019-07-24T09:24:06.364Z",
      "distance": 12500
    },
    {
      "id": 2,
      "date": "2019-07-24T09:25:44.252Z",
      "distance": 7500
    }
  ],
  "chartdata": {
    labels: [],
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  },
  "isModalOpen": false,
  "startDate": new Date(),
  "distance": 0,
  "min": 0,
  "max": 0,
  "sum": 0,
};

function getWeekDay(date:any) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}

function formatDate(date:any) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy:any = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

function mainreducer(state = initialState, action: any){
      switch(action.type) {
      case 'UPLOAD_DATA':
        let date = action.payload.map(function(item:any) {
          let tempdate = new Date(item.date);
          item.day = getWeekDay(tempdate);
          item.dateformat = formatDate(tempdate);
          return item;
        });
        return {
          "data": date,
          "chartdata": state.chartdata,
          "isModalOpen": false,
          "startDate": state.startDate,
          "distance": 0,
          "min": state.min,
          "max": state.max,
          "sum": state.sum 
        };
      case 'UPLOAD_CRART_DATA':
          return {
            "data":  state.data,
            "chartdata": action.payload,
            "isModalOpen":  state.isModalOpen,
            "startDate": state.startDate,
            "distance": state.distance,
            "min": state.min,
            "max": state.max,
            "sum": state.sum
          };
      case 'TOGGLE_MODAL':
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": action.payload,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": state.sum 
        };
      case 'PICK_DATE':
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": action.payload,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": state.sum
        };
      case 'CHANGE_DISTANCE':
          return {
            "data": state.data,
            "chartdata": state.chartdata,
            "isModalOpen": state.isModalOpen,
            "startDate": state.startDate,
            "distance": action.payload,
            "min": state.min,
            "max": state.max,
            "sum": state.sum
          };
      case 'CHANGE_MIN':
          return {
            "data": state.data,
            "chartdata": state.chartdata,
            "isModalOpen": state.isModalOpen,
            "startDate": state.startDate,
            "distance": state.distance,
            "min": action.payload,
            "max": state.max,
            "sum": state.sum
          };
      case 'CHANGE_MAX':
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": action.payload,
          "sum": state.sum
        };
      case 'CHANGE_SUM':
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": action.payload
        };
      case 'ADD_ROW':
        let tempdate = new Date(action.payload.date);
        action.payload.day = getWeekDay(tempdate);
        action.payload.dateformat = formatDate(tempdate);
        action.payload.distance = Number(action.payload.distance);
        state.data.push(action.payload);
        
    
        axios.post(`http://localhost:3001/walking`, {
          distance: action.payload.distance,
          id: action.payload.id,
          date: action.payload.date
        }).then(res => {
            
          })
        
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": state.sum
        };
      case 'SORT_DATA':
        let sortdate = action.payload.map(function(item:any) {
          let tempdate = new Date(item.date);
          item.day = getWeekDay(tempdate);
          item.dateformat = formatDate(tempdate);
          return item;
        });
        return {
          "data": sortdate,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": state.sum
        };
      default:
        return {
          "data": state.data,
          "chartdata": state.chartdata,
          "isModalOpen": state.isModalOpen,
          "startDate": state.startDate,
          "distance": state.distance,
          "min": state.min,
          "max": state.max,
          "sum": state.sum
        };
    }

   
}

const store = createStore(mainreducer);

export default store;