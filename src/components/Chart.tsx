import React from 'react';
import {connect} from 'react-redux';
import store  from '../store/mainStore';
import {Line} from 'react-chartjs-2';
import './Chart.css';
import { Row, Col} from 'react-bootstrap';
import { min } from 'date-fns/esm';

let data = {
  //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      //data: [65, 59, 80, 81, 56, 55, 40]
      data: []
    }
  ]
};

interface IProps {
  chartdata: any;
  minChart: any;
  maxChart: any;
  sumChart: any;
}

interface IState {
}

class Chart extends React.Component<IProps,any> {
    constructor(props: any) {
      super(props);
    }
  
    componentDidMount() {
      fetch("http://localhost:3001/walking/?_sort=date&_order=desc&_limit=7")
        .then(res => res.json())
        .then(
          (result) => {
            let labels:any[] = data.labels;
            let chartdata:any[] = data.datasets[0].data;
            
            for(var i = 0;i<result.length;i++) { 
              
              let day = formatDate(new Date(result[i].date));
              let dayData = result[i].distance;

              labels.push(day);
              chartdata.push(dayData);
              
            }
            
            let misS = Math.min(...chartdata);
            
            store.dispatch({ type: "UPLOAD_CRART_DATA", payload: data});
            store.dispatch({ type: "CHANGE_MIN", payload: misS});

            let maxS = Math.max(...chartdata);
            store.dispatch({ type: "CHANGE_MAX", payload: maxS}); 

            let sumS = chartdata.reduce(function(sum, current) {
              return sum + current;
            }, 0);
            store.dispatch({ type: "CHANGE_SUM", payload: sumS}); 
          },
          
          (error) => {
            console.log('ibc error!');
          }
        ) 
    }
  
    render() {  
        
        return (
          <>
            <div className="ibc-shadow white-bg chart-block">
              <h1 className="ibc-chart-header">Суммарная активность</h1>
              <Line data={this.props.chartdata} />
              <div className="ibc-zoom-btn">тут будет зум для графика</div>
            </div>
            <div>
              <Row className="ibc-chart-footer">
                <Col className="ibc-chart-footer-col" xs lg="4">
                  Минимум: {this.props.minChart}
                </Col>
                <Col className="ibc-chart-footer-col" xs lg="4">
                  Максимум: {this.props.maxChart}
                </Col>
                <Col className="ibc-chart-footer-col" xs lg="4">
                  Суммарно за 7 дней: {this.props.sumChart}
                </Col>
              </Row>
            </div>
          </>
        );
    }
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
const mapStateToProps = (store: any) => {
    return {
      chartdata: store.chartdata,
      minChart: store.min,
      maxChart: store.max,
      sumChart: store.sum
    }
  }

export default connect(mapStateToProps)(Chart);