import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Pagination } from 'antd';
import { newsData } from "./constants";

import { Container, Row, Col } from "react-bootstrap";


const NewsSection = () => {
    const { newsCol, image, newsCard, pagination, active, newsSection } = styles;
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };

    return (
        <Container className={newsSection}>
            <Row>
                {newsData.map((item) => (
                    <Col sm={4} xs={12} key={item.id} className={newsCol}>
                        <div className={newsCard}>
                            <img src={item.image} alt={item.title} className={image} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Col>
                ))}
            </Row>
            <Pagination className={pagination} current={current} onChange={onChange} total={50} />
        </Container>
    );
};

export default NewsSection;
