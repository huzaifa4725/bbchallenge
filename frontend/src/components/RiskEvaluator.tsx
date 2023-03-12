import { Button, Form, Input, Spin, Row, Col } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import showNotification, { NotificationType } from './Notification';
import Gauge, { RiskScore } from './RiskGuage';
interface IRiskScore {
  riskScore: number;
}
interface IRiskForm {
  domain: string;
}

const RiskEvaluator: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [riskScore, setRiskScore] = useState<RiskScore>(0);
  const [showGauge, setShowGauge] = useState<boolean>(false);

  const onFinish = async (values: IRiskForm) => {
    setLoading(true);
    setShowGauge(false);
    fetchRiskScore(values.domain);
  };

  const fetchRiskScore = async(domain: string) => {
   try {
    const {data} = await  axios.post<IRiskScore>(
        `${process.env.REACT_APP_DNS_SERVER_URL}dns/riskscore/`,
        {
          domainName: domain,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      if (data.riskScore === -1) {
          showNotification(
            NotificationType.error,
            'Error',
            'Domain configuration not found. Please check domain name'
          );
        } else if (
          data.riskScore >= 0 &&
          data.riskScore <= 3
        ) {
          setRiskScore(data.riskScore as RiskScore);
          setShowGauge(true);
        }
        setLoading(false);
      
    }
    catch(ex:any) {
        let error =  ex?.response?.status === 404
          ? 'Resource Not Found'
          : 'An unexpected error has occurred';

        showNotification(NotificationType.error, 'Error', error);
        setLoading(false);
      };
  };
  return (
    <>
      <Row>
        <Col span={6} offset={6}>
          <h4> Domain Risk Evaluator </h4>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          {!isLoading && (
            <Form
              name="basic"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Domain Name"
                name="domain"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid domain",
                    pattern: new RegExp(
                      "^((?!-)[A-Za-z0-9-]" +
                      "{1,63}(?<!-)\\.)" +
                      "+[A-Za-z]{2,6}"
                    ),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={8}>
          {isLoading && <Spin size="large" tip="Loading..."></Spin>}
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          {showGauge && <Gauge riskScore={riskScore} />}
        </Col>
      </Row>
    </>
  );
};

export default RiskEvaluator;
