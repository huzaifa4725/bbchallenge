import { Row, Col } from 'antd';
import GaugeChart from 'react-gauge-chart';

export interface IPGuage {
  riskScore: RiskScore;
}
export type RiskScore = 0 | 1 | 2 | 3;

const riskLabel = {
  0: 'Low',
  1: 'Low Medium',
  2: 'Medium',
  3: 'High',
};
const Gauge = (prop: IPGuage) => {
  return (
    <>
      <GaugeChart
        id="gauge-chart1"
        textColor={'black'}
        marginInPercent={0.05}
        arcWidth={0.3}
        percent={prop.riskScore / 3}
      />
      <Row>
        <Col span={16} offset={8}>
          <h4>Domain Risk : {riskLabel[prop.riskScore]}</h4>
        </Col>
      </Row>
    </>
  );
};

export default Gauge;
